
import { Button, Card, Form, Modal, Table, Popconfirm, Drawer } from "antd";
import { toast } from "sonner";
import { useGetRequestsQuery, useDeleteRequestMutation } from "@/api/services/requestsApi";
import { IconButton, Iconify } from "@/components/icon";
import { useState } from "react";

interface Request {
  request_id: number;
  user_id: number;
  form_id: number;
  form_data: Record<string, any>;
  csr: string | null;
  request_type: string;
  download_format: string;
  file_path: string | null;
  status: string;
  submission_date: string;
  approval_date: string | null;
}



export default function RequestsPage() {
  const { data: requests, error, isLoading } = useGetRequestsQuery();
  const [deleteRequest, { isLoading: isDeleting }] = useDeleteRequestMutation();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading requests</p>;
  const columns:any = (onView: (record: Request) => void, onDelete: (requestId: number) => void) => [
    { title: "Request ID", dataIndex: "request_id", width: 100 },
    { title: "User ID", dataIndex: "user_id", width: 100 },
    { title: "Request Type", dataIndex: "request_type", width: 150 },
    { title: "Download Format", dataIndex: "download_format", width: 150 },
    { title: "Status", dataIndex: "status", width: 120 },
    { 
      title: "Submission Date", 
      dataIndex: "submission_date", 
      width: 200, 
      render: (date: string) => new Date(date).toLocaleString() 
    },
    {
      title: "Action",
      key: "operation",
      align: "center",
      width: 200,
      render: (_: any, record: Request) => (
        <div className="flex w-full justify-center text-gray gap-2">
          <IconButton onClick={() => onView(record)}>
            <Iconify icon="mdi:eye" size={18} className="text-primary" />
          </IconButton>
          {/* <Popconfirm
            title="Delete the request?"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => onDelete(record.request_id)}
          >
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm> */}
        </div>
      ),
    },
  ];
  
  const onView = (record: Request) => {
    setSelectedRequest(record);
    setDrawerVisible(true);
  };
  const onDelete = async (requestId: number) => {
    const toastId = toast.loading("Deleting request...");
    try {
      await deleteRequest(requestId).unwrap();
      toast.success("Request deleted successfully!", { id: toastId });
    } catch {
      toast.error("Failed to delete request. Please try again.", { id: toastId });
    }
  };

  return (
    <Card title="Requests List">
      <Table 
        rowKey="request_id" 
        size="small" 
        columns={columns(onView, onDelete)} 
        dataSource={requests} 
        loading={isLoading || isDeleting}
      />
            <Drawer
        title="Request Details"
        width={400}
        visible={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        {selectedRequest && (
          <div>
            <p><strong>Request ID:</strong> {selectedRequest.request_id}</p>
            <p><strong>User ID:</strong> {selectedRequest.user_id}</p>
            <p><strong>Request Type:</strong> {selectedRequest.request_type}</p>
            <p><strong>Download Format:</strong> {selectedRequest.download_format}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <p><strong>Submission Date:</strong> {new Date(selectedRequest.submission_date).toLocaleString()}</p>
            <p><strong>Approval Date:</strong> {selectedRequest.approval_date ? new Date(selectedRequest.approval_date).toLocaleString() : "N/A"}</p>
            <p><strong>Form Data:</strong></p>
            <div>
             
              <div className="bg-gray-100 p-3 rounded-md mt-1">
                {Object.entries(selectedRequest.form_data).map(([key, value]) => (
                  <p key={key}><strong>{key}:</strong> {String(value)}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </Card>
  );
}
