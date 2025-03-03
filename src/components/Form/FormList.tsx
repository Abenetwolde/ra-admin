import { useState } from "react";
import { Table, Popconfirm, Tag } from "antd";
import { IconButton, Iconify } from "@/components/icon";
import { ColumnsType } from "antd/es/table";
import { FormData, FormField } from "#/Form";

interface FormListProps {
  forms: FormData[];
  onDelete: (formId: number) => void;
}

const FormList = ({ forms, onDelete }: FormListProps) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  const columns: ColumnsType<FormData> = [
    { title: "Name", dataIndex: "name", width: 200 },
    { title: "Organization ID", dataIndex: "org_id", width: 100 },
    { title: "Form ID", dataIndex: "form_id", width: 100 },
    { title: "Description", dataIndex: "description", width: 100, render: (text: string) => text?.length > 20 ? `${text.slice(0, 20)}...` : text },
    { title: "Icon", dataIndex: "icon", width: 100, render: (text: string) => text?.length > 20 ? `${text.slice(0, 20)}...` : text },
    {
      title: "Created At",
      dataIndex: "created_at",
      width: 150,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "operation",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex w-full justify-center text-gray">
          <IconButton onClick={() => {}}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm
            title="Delete the Permission"
            okText="Yes"
            cancelText="No"
            placement="left"
            onConfirm={() => onDelete(record.form_id)}
          >
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table<FormData>
      rowKey="form_id"
      size="small"
      columns={columns}
      dataSource={forms}
      expandable={{
        expandedRowKeys,
        onExpand: (expanded, record) => {
          setExpandedRowKeys((prev) =>
            expanded ? [...prev, record.form_id] : prev.filter((key) => key !== record.form_id)
          );
        },
        expandedRowRender: (record) =>
   
            <Table<FormField>
              size="small"
              pagination={false}
              columns={[
                { title: "Field Name", dataIndex: "field_name", key: "field_name" },
                { title: "Field Type", dataIndex: "field_type", key: "field_type" },
                {
                  title: "Required",
                  dataIndex: "is_required",
                  key: "is_required",
                  render: (required: boolean) => (
                    <Tag color={required ? "green" : "red"}>{required ? "Yes" : "No"}</Tag>
                  ),
                },
              ]}
              dataSource={record?.FormFields}
              rowKey="field_id"
            />
      }}
    />
  );
};

export default FormList;
