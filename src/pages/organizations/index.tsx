import { useEffect, useState } from "react";
import { Button, Card, Form, Input, Modal, Table, Popconfirm } from "antd";
import { toast } from "sonner";
import {
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
} from "@/api/services/organization";
import { IconButton, Iconify } from "@/components/icon";

interface OrganizationForm {
  org_id?: number;
  org_name: string;
  domain: string;
  created_at?: string;
}

const columns = (onEdit: (org: OrganizationForm) => void, onDelete: (orgId: number) => void) => [
  { title: "Organization Name", dataIndex: "org_name", width: 200 },
  { title: "Domain", dataIndex: "domain", width: 200 },
  { title: "Created At", dataIndex: "created_at", width: 200, render: (date: string) => new Date(date).toLocaleString() },
  {
    title: "Action",
    key: "operation",
    align: "center",
    width: 150,
    render: (_: any, record: OrganizationForm) => (
      <div className="flex w-full justify-center text-gray">
     <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
        <Popconfirm
          title="Delete the Organization?"
          okText="Yes"
          cancelText="No"
          placement="left"
          onConfirm={() => onDelete(record.org_id!)}
        >
            <IconButton>
                    <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
                  </IconButton>
        </Popconfirm>
      </div>
    ),
  },
];

export default function OrganizationPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<Partial<OrganizationForm>>({ org_name: "", domain: "" });
  const { data: organizations, error, isLoading } = useGetOrganizationsQuery();
  const [createOrganization, { isLoading: isCreatingOrg }] = useCreateOrganizationMutation();
  const [updateOrganization, { isLoading: isUpdatingOrg }] = useUpdateOrganizationMutation();
  const [deleteOrganization, { isLoading: isDeletingOrgOrg }] = useDeleteOrganizationMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading organizations</p>;

  const onCreate = async () => {
    setFormValue({ org_name: "", domain: "" });
    setModalVisible(true);
  };

  const onEdit = (organization: OrganizationForm) => {
    setFormValue(organization);
    setModalVisible(true);
  };

  const onDelete = async (orgId: number) => {
    const toastId = toast.loading("Deleting organization...");
    try {
      await deleteOrganization(orgId).unwrap();
      toast.success("Organization deleted successfully!", { id: toastId });
    } catch {
      toast.error("Failed to delete organization. Please try again.", { id: toastId });
    }
  };

  return (
    <Card title="Organization List" extra={<Button type="primary" onClick={onCreate}>New</Button>}>
      <Table rowKey="org_id" size="small" columns={columns(onEdit, onDelete)} dataSource={organizations} />
      <OrganizationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        formValue={formValue}
        createOrganization={createOrganization}
        updateOrganization={updateOrganization}
        isCreatingOrg={isCreatingOrg}
        isUpdatingOrg={isUpdatingOrg}
      />
    </Card>
  );
}

const OrganizationModal = ({
  modalVisible,
  setModalVisible,
  formValue,
  createOrganization,
  updateOrganization,
  isCreatingOrg,
  isUpdatingOrg,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  formValue: Partial<OrganizationForm>;
  createOrganization: (data: OrganizationForm) => Promise<any>;
  updateOrganization: (data: OrganizationForm) => Promise<any>;
  isCreatingOrg: boolean;
  isUpdatingOrg: boolean;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formValue);
  }, [formValue, form]);
  let toastId
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
       toastId = toast.loading(formValue.org_id ? "Updating organization..." : "Creating organization...");
      if (formValue.org_id) {
        await updateOrganization({ id: formValue.org_id, ...values,}).unwrap();
        toast.success("Organization updated successfully!", { id: toastId });
      } else {
        await createOrganization(values).unwrap();
        toast.success("Organization created successfully!", { id: toastId });
      }
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      toast.error("Failed to save organization. Please try again.");
      console.error("Form validation failed", error);
    }
  };

  return (
    <Modal
      forceRender
      title={formValue?.org_id ? "Edit Organization" : "New Organization"}
      open={modalVisible}
      onOk={handleSubmit}
      onCancel={() => setModalVisible(false)}
      okText={formValue?.org_id ? ` Edit` : "Create"}
      okButtonProps={{ loading: isCreatingOrg || isUpdatingOrg }} // Show loading on the submit button
    >
      <Form initialValues={formValue} form={form} layout="vertical">
        <Form.Item label="Organization Name" name="org_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Domain" name="domain" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};