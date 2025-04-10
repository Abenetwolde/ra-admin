import { useState } from "react";
import { Table, Button, Modal } from "antd";
import { useGetRAOfficersQuery } from "@/api/services/raOfficerApi";
import CreateRAOfficerForm from "@/components/RAOfficerForm";


const CreateRAUsersPage = () => {
  const { data: raOfficers, isLoading, error } = useGetRAOfficersQuery();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Organization ID",
      dataIndex: "org_id",
      key: "org_id",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Middle Name",
      dataIndex: "middle_name",
      key: "middle_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Telephone",
      dataIndex: "telephone",
      key: "telephone",
    },
  ];

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">RA Officers</h1>
        <Button
          type="primary"
          onClick={handleOpenModal}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Create RA Officer
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={raOfficers}
        loading={isLoading}
        rowKey="id"
        // scroll={{ x: 1500 }} // Enable horizontal scrolling for many columns
        className="bg-white shadow-md rounded-lg"
      />

      <Modal
        title="Create RA Officer"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
      >
        <CreateRAOfficerForm onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default CreateRAUsersPage;