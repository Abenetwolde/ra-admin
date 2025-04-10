// src/pages/RequestsPage.tsx
import { Button, Card, Drawer, Table } from 'antd';
import { toast } from 'sonner';
import { useGetRequestsQuery } from '@/api/services/requestsApi';
import { useApproveRequestMutation, useRejectRequestMutation } from '@/api/services/ejbcaApi';
import { IconButton, Iconify } from '@/components/icon';
import { useState } from 'react';

interface Request {
  request_id: number;
  user_id: number;
  form_id: number;
  form_data: Record<string, any>;
  csr: string | null;
  request_type: string;
  download_format: string;
  file_path: string | null;
  status: string; // e.g., 'pending', 'approved', 'rejected'
  submission_date: string;
  approval_date: string | null;
}

export default function RequestsPage() {
  const { data: requests, error, isLoading } = useGetRequestsQuery();
  const [approveRequest, { isLoading: isApproving }] = useApproveRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] = useRejectRequestMutation();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading requests</p>;

  const columns: any = (onView: (record: Request) => void) => [
    { title: 'Request ID', dataIndex: 'request_id', width: 100 },
    { title: 'User ID', dataIndex: 'user_id', width: 100 },
    { title: 'Request Type', dataIndex: 'request_type', width: 150 },
    { title: 'Download Format', dataIndex: 'download_format', width: 150 },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 120,
      render: (status: string) => (
        <span
          className={
            status === 'approved'
              ? 'text-green-500'
              : status === 'rejected'
              ? 'text-red-500'
              : 'text-yellow-500'
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      title: 'Submission Date',
      dataIndex: 'submission_date',
      width: 200,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 200,
      render: (_: any, record: Request) => (
        <div className="flex w-full justify-center text-gray gap-2">
          <IconButton onClick={() => onView(record)}>
            <Iconify icon="mdi:eye" size={18} className="text-primary" />
          </IconButton>
        </div>
      ),
    },
  ];

  const onView = (record: Request) => {
    setSelectedRequest(record);
    setDrawerVisible(true);
  };

  const handleApprove = async (requestId: number) => {
    const toastId = toast.loading('Approving request...');
    try {
      await approveRequest({ requestId }).unwrap();
      toast.success('Request approved successfully!', { id: toastId });
      setDrawerVisible(false); // Close drawer on success
    } catch (error) {
      toast.error('Failed to approve request. Please try again.', { id: toastId });
    }
  };

  const handleReject = async (requestId: number) => {
    const toastId = toast.loading('Rejecting request...');
    try {
      await rejectRequest({ requestId }).unwrap();
      toast.success('Request rejected successfully!', { id: toastId });
      setDrawerVisible(false); // Close drawer on success
    } catch (error) {
      toast.error('Failed to reject request. Please try again.', { id: toastId });
    }
  };

  return (
    <Card title="Requests List">
      <Table
        rowKey="request_id"
        size="small"
        columns={columns(onView)}
        dataSource={requests}
        loading={isLoading}
      />
      <Drawer
        title="Request Details"
        width={500}
        open={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}
        extra={
          <Button
            type="text"
            icon={<Iconify icon="mdi:close" />}
            onClick={() => setDrawerVisible(false)}
          />
        }
      >
        {selectedRequest && (
          <div className="space-y-4">
            {/* Main Details Card */}
            <Card title="Basic Information" size="small" className="shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Request ID', value: selectedRequest.request_id, icon: 'mdi:identifier' },
                  { label: 'User ID', value: selectedRequest.user_id, icon: 'mdi:account' },
                  { label: 'Request Type', value: selectedRequest.request_type, icon: 'mdi:format-list-bulleted-type' },
                  { label: 'Download Format', value: selectedRequest.download_format, icon: 'mdi:download' },
                  {
                    label: 'Status',
                    value: selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1),
                    icon: 'mdi:status',
                  },
                  {
                    label: 'Submission Date',
                    value: new Date(selectedRequest.submission_date).toLocaleString(),
                    icon: 'mdi:calendar-clock',
                  },
                  {
                    label: 'Approval Date',
                    value: selectedRequest.approval_date
                      ? new Date(selectedRequest.approval_date).toLocaleString()
                      : 'Pending',
                    icon: 'mdi:calendar-check',
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2">
                    <Iconify icon={item.icon} className="mt-1 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">{item.label}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Form Data Card */}
            <Card title="Form Data" size="small" className="shadow-sm">
              <div className="space-y-3">
                {Object.entries(selectedRequest.form_data).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <Iconify icon="mdi:form-textbox" className="mt-1 text-gray-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 capitalize">
                        {key.replace(/_/g, ' ')}
                      </p>
                      <p className="font-semibold break-words">{String(value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* File Attachment Section */}
            {selectedRequest.csr && (
              <Card title="Attachments" size="small" className="shadow-sm">
                <div className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50 transition-colors">
                  <Iconify icon="mdi:file-document" size={24} className="text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Certificate Signing Request</p>
                    <p className="text-sm text-gray-500">CSR File</p>
                  </div>
                  <Button
                    type="text"
                    icon={<Iconify icon="mdi:download" />}
                    onClick={() => {
                      toast.success('Downloading file...');
                    }}
                  />
                </div>
              </Card>
            )}

            {/* Actions Footer */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="primary"
                icon={<Iconify icon="mdi:check" />}
                onClick={() => handleApprove(selectedRequest.request_id)}
                // disabled={selectedRequest.status !== 'pending' || isApproving || isRejecting}
                loading={isApproving}
              >
                Approve
              </Button>
              <Button
                danger
                icon={<Iconify icon="mdi:close" />}
                onClick={() => handleReject(selectedRequest.request_id)}
                disabled={selectedRequest.status !== 'pending' || isApproving || isRejecting}
                loading={isRejecting}
              >
                Reject
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </Card>
  );
}