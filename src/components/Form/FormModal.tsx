import { useState } from "react";
import { Modal, Form, Select, Input, Checkbox, Button, List } from "antd";
// import { IconButton } from "@mui/material";
// import { Iconify } from "@iconify/react";
import { Iconify } from "../icon";
import { toast } from "sonner";

interface Organization {
  org_id: number;
  org_name: string;
}

interface Field {
  field_name: string;
  field_type: string;
  is_required: boolean;
}

interface FormData {
  name: string;
  org_id: number;
  fields: Field[];
}

const availableDataTypes = ["String", "Number", "Boolean", "Date","file"];

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
  const [fieldInput, setFieldInput] = useState<Field>({ field_name: "", field_type: "", is_required: false });

  const handleAddField = () => {
    if (fieldInput.field_name && fieldInput.field_type) {
      setFields([...fields, fieldInput]);
      setFieldInput({ field_name: "", field_type: "", is_required: false });
    }
  };

  const handleDeleteField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };
  let toastId
  const handleSubmit = async () => {
    toastId = toast.loading("Creating form...");
    try {
      const values = await form.validateFields();
      const newForm: FormData = { ...values, fields };
      await createForm(newForm);
      setModalVisible(false);
      toast.success("Form Created successfully!", { id: toastId });
      form.resetFields();
    } catch (error) {
      toast.error("Failed to Creat form. Please try again.", { id: toastId });
    }
  };

  return (
    <Modal
      forceRender
      title={formValue?.org_id ? "Edit From" : "New Form"}
      open={modalVisible}
      onOk={handleSubmit}
      onCancel={() => setModalVisible(false)}
    >
      <Form initialValues={formValue} form={form} layout="vertical">
        <Form.Item label="Organization" name="org_id" rules={[{ required: true }]}>
          <Select
            loading={isOrgLoading}
            placeholder="Select an organization"
            options={organizations?.map((org) => ({ label: org.org_name, value: org.org_id }))}
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Icon" name="icon" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <h4 className="mb-2">Form Fields</h4>
        <Form.Item>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <Form.Item label="Name">
                <Input
                  value={fieldInput.field_name}
                  onChange={(e) => setFieldInput({ ...fieldInput, field_name: e.target.value })}
                />
              </Form.Item>
            </div>
            <div className="col-span-1">
              <Form.Item label="Data Type">
                <Select
                  value={fieldInput.field_type}
                  onChange={(value) => setFieldInput({ ...fieldInput, field_type: value })}
                  options={availableDataTypes.map((type) => ({ label: type, value: type }))}
                />
              </Form.Item>
            </div>
            <div className="col-span-1 flex justify-center mt-2 items-center">
              <Form.Item>
                <Checkbox
                  checked={fieldInput.is_required}
                  onChange={(e) => setFieldInput({ ...fieldInput, is_required: e.target.checked })}
                >
                  Required
                </Checkbox>
              </Form.Item>
            </div>
            <div className="col-span-1 flex items-center">
              <Button type="primary" onClick={handleAddField}>Add Field</Button>
            </div>
          </div>
        </Form.Item>

        <div className="px-10">
          <List
            dataSource={fields}
            renderItem={(item, index) => (
              <List.Item className="flex justify-between items-center">
                <div className="pr-5">{index + 1}</div>
                <div className="w-full">{item.field_name}</div>
                <div className="w-full"> {item.field_type} ({item.is_required ? "Required" : "Optional"})</div>
                <div onClick={() => handleDeleteField(index)} className="text-error cursor-pointer">
                  <Iconify icon="mingcute:delete-2-fill" size={18} className="text-red-500" />
                </div>
              </List.Item>
            )}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default FormModal;
