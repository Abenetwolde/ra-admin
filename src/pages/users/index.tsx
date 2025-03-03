import { Button, Card, Table, Popconfirm } from "antd";
import { toast } from "sonner";
import { useGetUsersQuery, useDeleteUserMutation } from "@/api/services/userApi";
import { IconButton, Iconify } from "@/components/icon";

interface User {
  user_id: number;
  org_id: number | null;
  username: string;
  email: string;
  role: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  address: string;
  country: string;
  state: string;
  telephone: string;
  created_at: string;
}

const columns :any= (onDelete: (userId: number) => void) => [
  { title: "User ID", dataIndex: "user_id", width: 100 },
  { title: "Username", dataIndex: "username", width: 150 },
  { title: "Email", dataIndex: "email", width: 200 },
  { title: "Role", dataIndex: "role", width: 150 },
  { title: "Full Name", dataIndex: "first_name", width: 200, render: (_: any, record: User) => `${record.first_name} ${record.middle_name} ${record.last_name}` },
  { title: "Country", dataIndex: "country", width: 150 },
  { title: "State", dataIndex: "state", width: 150 },
  { title: "Telephone", dataIndex: "telephone", width: 150 },
  { title: "Created At", dataIndex: "created_at", width: 200, render: (date: string) => new Date(date).toLocaleString() },
  {
    title: "Action",
    key: "operation",
    align: "center",
    width: 150,
    render: (_: any, record: User) => (
      <div className="flex w-full justify-center text-gray">
        <Popconfirm
          title="Delete the user?"
          okText="Yes"
          cancelText="No"
          placement="left"
          onConfirm={() => onDelete(record.user_id)}
        >
          <IconButton>
            <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
          </IconButton>
        </Popconfirm>
      </div>
    ),
  },
];

export default function UsersPage() {
  const { data: users, error, isLoading } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  const onDelete = async (userId: number) => {
    const toastId = toast.loading("Deleting user...");
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully!", { id: toastId });
    } catch {
      toast.error("Failed to delete user. Please try again.", { id: toastId });
    }
  };

  return (
    <Card title="Users List">
      <Table 
        rowKey="user_id" 
        size="small" 
        columns={columns(onDelete)} 
        dataSource={users} 
        loading={isLoading || isDeleting}
      />
    </Card>
  );
}
