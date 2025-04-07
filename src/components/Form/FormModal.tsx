import { useEffect, useState } from "react";
import { Modal, Form, Select, Input, Checkbox, Button, List } from "antd";
import { Iconify } from "../icon";
import { toast } from "sonner";
import { useGetCertificateProfilesQuery, useLazyGetProfileDetailsQuery } from "@/api/services/ejbcaApi";

interface Organization {
  org_id: number;
  org_name: string;
}

interface Field {
  field_name: string;
  field_type: string;
  is_required: boolean;
}

interface ProfileDetails {
  end_entity_profile_name: string;
  available_cas: string[];
  available_certificate_profiles: string[];
  subject_distinguished_name_fields: string[];
  subject_alternative_name_fields: string[];
}

interface FormData {
  org_id: number;
  name: string;
  description: string;
  icon: string;
  end_entity_profile_name: string;
  certificate_authority_name: string;
  certificate_profile_name: string;
  fields: Field[];
}

const availableDataTypes = ["text", "number", "boolean", "date", "file"];

const FormModal = ({
  modalVisible,
  setModalVisible,
  formValue,
  organizations,
  isOrgLoading,
  createForm,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  formValue: Partial<FormData>;
  organizations: Organization[];
  isOrgLoading: boolean;
  createForm: (data: FormData) => Promise<any>;
}) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState<Field[]>(formValue?.fields || []);
  const [fieldInput, setFieldInput] = useState<Field>({ 
    field_name: "", 
    field_type: "text",
    is_required: false
  });

  const [profileDetails, setProfileDetails] = useState<ProfileDetails | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | undefined>();
  const { data: certificateProfiles = [], isLoading: isCertificateProfilesLoading } = useGetCertificateProfilesQuery();
  const [fetchProfileDetails] = useLazyGetProfileDetailsQuery();

  // Fetch profile details when end entity profile changes
  useEffect(() => {
    const endEntityProfile = form.getFieldValue('end_entity_profile_name');
    console.log("End Entity Profile:", endEntityProfile);
    if (endEntityProfile) {
      setLoadingProfile(true);
      fetchProfileDetails(endEntityProfile)
        .unwrap()
        .then((data) => {
          setProfileDetails(data);
          // Set default values if available
          if (data.available_cas.length > 0) {
            form.setFieldsValue({
              certificate_authority_name: data.available_cas[0]
            });
          }
          if (data.available_certificate_profiles.length > 0) {
            form.setFieldsValue({
              certificate_profile_name: data.available_certificate_profiles[0]
            });
          }
        })
        .finally(() => setLoadingProfile(false));
    } else {
      setProfileDetails(null);
    }
  }, [form.getFieldValue('end_entity_profile_name')]);

  const handleAddField = () => {
    if (fieldInput.field_name && fieldInput.field_type) {
      setFields([...fields, fieldInput]);
      setFieldInput({ 
        field_name: "", 
        field_type: "text",
        is_required: false
      });
    }
  };

  const handleDeleteField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };
  
  const handleSubmit = async () => {
    const toastId = toast.loading("Creating form...");
    try {
      const values = await form.validateFields();
      const newForm: FormData = { 
        ...values,
        fields 
      };
      await createForm(newForm);
      setModalVisible(false);
      toast.success("Form created successfully!", { id: toastId });
      form.resetFields();
      setFields([]);
    } catch (error) {
      toast.error("Failed to create form. Please try again.", { id: toastId });
    }
  };

  return (
    <Modal
      width={1000}
      forceRender
      title={formValue?.org_id ? "Edit Form" : "New Form"}
      open={modalVisible}
      onOk={handleSubmit}
      onCancel={() => setModalVisible(false)}
    >
      <div className="flex gap-10">
        {/* Left Side - Basic Form Fields */}
        <div className="w-1/2">
          <Form form={form} layout="vertical">
            <Form.Item 
              label="Organization" 
              name="org_id" 
              rules={[{ required: true, message: 'Please select an organization' }]}
            >
              <Select
                loading={isOrgLoading}
                placeholder="Select an organization"
                options={organizations?.map((org) => ({ 
                  label: org.org_name, 
                  value: org.org_id 
                }))}
              />
            </Form.Item>
            
            <Form.Item 
              label="Form Name" 
              name="name" 
              rules={[{ required: true, message: 'Please enter form name' }]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item 
              label="Description" 
              name="description" 
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input.TextArea />
            </Form.Item>
            
            <Form.Item 
              label="Icon" 
              name="icon" 
              rules={[{ required: true, message: 'Please enter icon code' }]}
            >
              <Input placeholder="e.g., iconamoon:invoice" />
            </Form.Item>
            
            <Form.Item 
              label="End Entity Profile Name" 
              name="end_entity_profile_name" 
              rules={[{ required: true, message: 'Please select profile' }]}
            >
              <Select
                loading={isCertificateProfilesLoading}
                placeholder="Select profile"
                options={certificateProfiles?.map((profile) => ({ 
                  label: profile, 
                  value: profile 
                }))}
                onChange={(value) => {
                  console.log("Profile selected:", value);
                  setSelectedProfile(value);
                }}
              />
            </Form.Item>
            <Form.Item 
              label="Certificate Authority Name" 
              name="certificate_authority_name" 
              rules={[{ required: true, message: 'Please select CA' }]}
            >
              <Select
                loading={loadingProfile}
                placeholder="Select CA"
                options={profileDetails?.available_cas?.map((ca) => ({ 
                  label: ca, 
                  value: ca 
                })) || []}
              />
            </Form.Item>
            
            <Form.Item 
              label="Certificate Profile Name" 
              name="certificate_profile_name" 
              rules={[{ required: true, message: 'Please select certificate profile' }]}
            >
              <Select
                loading={loadingProfile}
                placeholder="Select certificate profile"
                options={profileDetails?.available_certificate_profiles?.map((profile) => ({ 
                  label: profile, 
                  value: profile 
                })) || []}
              />
            </Form.Item>
          </Form>
        </div>

        {/* Right Side - Fields Management */}
        <div className="w-1/2">
          <div className="flex flex-col h-full">
            <div className="">
              <h4 className="mb-2 font-bold">Add New Field</h4>
              <div className="grid grid-cols-1 gap-2">
                <Form.Item label="Field Name">
                  <Input
                    value={fieldInput?.field_name}
                    onChange={(e) => setFieldInput({ 
                      ...fieldInput, 
                      field_name: e.target.value 
                    })}
                    placeholder="e.g., TIN No"
                  />
                </Form.Item>
                
                <Form.Item label="Data Type">
                  <Select
                    value={fieldInput.field_type}
                    onChange={(value) => setFieldInput({ 
                      ...fieldInput, 
                      field_type: value 
                    })}
                    options={availableDataTypes.map((type) => ({ 
                      label: type.charAt(0).toUpperCase() + type.slice(1), 
                      value: type 
                    }))}
                  />
                </Form.Item>
                
                <Form.Item>
                  <Checkbox
                    checked={fieldInput.is_required}
                    onChange={(e) => setFieldInput({ 
                      ...fieldInput, 
                      is_required: e.target.checked 
                    })}
                  >
                    Required
                  </Checkbox>
                </Form.Item>
                
                <Button 
                  type="primary" 
                  onClick={handleAddField} 
                  disabled={!fieldInput.field_name}
                  className="w-full"
                >
                  Add Field
                </Button>
              </div>
            </div>
         
            <h4 className="mt-3 font-bold">Form Fields</h4>
            <div className="px-4">
              {fields.length === 0 ? (
                <div className="text-gray-400 text-center py-4">No fields added yet</div>
              ) : (
                <List
                  dataSource={fields}
                  renderItem={(item, index) => (
                    <List.Item className="flex justify-between items-center">
                      <div className="pr-5">{index + 1}</div>
                      <div className="w-full font-medium">{item.field_name}</div>
                      <div className="w-full capitalize">{item.field_type}</div>
                      <div className="w-full">
                        {item.is_required ? (
                          <span className="text-red-500">Required</span>
                        ) : (
                          <span className="text-gray-500">Optional</span>
                        )}
                      </div>
                      <div 
                        onClick={() => handleDeleteField(index)} 
                        className="text-error cursor-pointer"
                      >
                        <Iconify icon="mingcute:delete-2-fill" size={18} className="text-red-500" />
                      </div>
                    </List.Item>
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FormModal;