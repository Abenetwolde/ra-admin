import { Form, Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCreateRAOfficerMutation } from "@/api/services/raOfficerApi";
import { toast } from "sonner";
import { useGetOrganizationsQuery } from "@/api/services/organization";

interface CreateRAOfficerFormProps {
  onCancel: () => void;
}

const CreateRAOfficerForm = ({ onCancel }: CreateRAOfficerFormProps) => {
  const [form] = Form.useForm();
  const [createRAOfficer, { isLoading }] = useCreateRAOfficerMutation();
  const [file, setFile] = useState<File | null>(null);
  const { data: organizations, isLoading: isOrgLoading } = useGetOrganizationsQuery();
  const onFinish = async (values: any) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        formData.append(key, values[key]);
      }
    });
    if (file) {
      formData.append("cert", file);
    }
    const toastId = toast.loading("Creating RA Officer...");
    try {
      await createRAOfficer(formData).unwrap();
      toast.success("RA Officer created successfully!", { id: toastId });
      // form.resetFields();
      // setFile(null);
      onCancel(); // Close the modal on success
    } catch (error: any) {
      let errorMessage = "Failed to create RA Officer. Please try again.";
      if (error?.data?.error) {
        errorMessage = error.data.error;
      } else if (error?.error) {
        errorMessage = error.error;
      } else if (error?.status) {
        errorMessage = `Error ${error.status}: Something went wrong`;
      }
      toast.error(errorMessage, { id: toastId });
      console.error("Error:", error);
    }
  };

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj || info.file;
    setFile(file);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Create RA User</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} className="grid grid-cols-2 gap-4">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter the username" }]}
        >
          <Input placeholder="Enter username" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
        >
          <Input placeholder="Enter email" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input.Password placeholder="Enter password" className="rounded-md" />
        </Form.Item>

        <Form.Item
  label="Role"
  name="role"
  initialValue="Org Officer"
  rules={[{ required: true, message: "Please select a role" }]}
>
  <Select
    placeholder="Select role"
    className="rounded-md"

  >
    <Select.Option value="Org Officer">Org Officer</Select.Option>
    <Select.Option value="Org Auditor">Org Auditor</Select.Option>
  </Select>
</Form.Item>

        <Form.Item
          label="Organization"
          name="org_id"
          rules={[{ required: true, message: "Please select an organization" }]}
        >
          <Select
            placeholder="Select an organization"
            loading={isOrgLoading}
            className="rounded-md"
            dropdownClassName="rounded-md"
            options={organizations?.map((org) => ({ label: org.org_name, value: org.org_id }))}
          />
         
         
        </Form.Item>

        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "Please enter the first name" }]}
        >
          <Input placeholder="Enter first name" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Middle Name"
          name="middle_name"
          rules={[{ required: true, message: "Please enter the middle name" }]}
        >
          <Input placeholder="Enter middle name" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: "Please enter the last name" }]}
        >
          <Input placeholder="Enter last name" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <Input placeholder="Enter address" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please enter the country" }]}
        >
          <Input placeholder="Enter country" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true, message: "Please enter the state" }]}
        >
          <Input placeholder="Enter state" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Telephone"
          name="telephone"
          rules={[{ required: true, message: "Please enter the telephone number" }]}
        >
          <Input placeholder="Enter telephone number" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Certificate File"
          name="cert"
          rules={[{ required: true, message: "Please upload the certificate file" }]}
        >
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={1}
            accept=".p12"
          >
            <Button icon={<UploadOutlined />}>Upload Certificate (.p12)</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Certificate Password"
          name="cert_pass"
          rules={[{ required: true, message: "Please enter the certificate password" }]}
        >
          <Input.Password placeholder="Enter certificate password" className="rounded-md" />
        </Form.Item>

        <Form.Item className="col-span-2">
          <div className="flex justify-end space-x-4">
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Create RA Officer
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateRAOfficerForm;