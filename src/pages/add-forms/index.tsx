import { useState } from "react";
import { Button, Card, Modal } from "antd";
import { useCreateFormMutation, useDeleteFormMutation, useGetFormsQuery } from "@/api/services/forms";
import { toast } from "sonner";
import { useGetOrganizationsQuery } from "@/api/services/organization";
import FormList from "@/components/Form/FormList";
import FormModal from "@/components/Form/FormModal";
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
export default function PermissionPage() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<Partial<FormData>>({ name: "", org_id: 0, fields: [] });
  const { data: forms, error, isLoading } = useGetFormsQuery();
  const { data: organizations, isLoading: isOrgLoading } = useGetOrganizationsQuery();
  const [deleteForm] = useDeleteFormMutation();
  const [createForm] = useCreateFormMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading forms</p>;

  const onCreate = () => {
    setFormValue({ name: "", org_id: 0, fields: [] });
    setModalVisible(true);
  };
  let toastId
  const onDelete = async (formId: number) => {
     toastId = toast.loading("Deleting form...");
    try {
      await deleteForm(formId).unwrap();
      toast.success("Form deleted successfully!", { id: toastId });
    } catch {
      toast.error("Failed to delete form. Please try again.", { id: toastId });
    }
  };

  return (
    <Card title="Form List" extra={<Button type="primary" onClick={onCreate}>New</Button>}>
      <FormList forms={forms} onDelete={onDelete} />
      <FormModal
        modalVisible={modalVisible}
        formValue={formValue}

        setModalVisible={setModalVisible}
        createForm={createForm}
        organizations={organizations}
        isOrgLoading={isOrgLoading}
      />
    </Card>
  );
}
