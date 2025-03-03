import { Input, Select, Checkbox, Button, List } from "antd";
import { FieldInput } from "#/Form";

interface FormFieldsProps {
  fields: FieldInput[];
  setFields: (fields: FieldInput[]) => void;
  fieldInput: FieldInput;
  setFieldInput: (fieldInput: FieldInput) => void;
}

const FormFields = ({ fields, setFields, fieldInput, setFieldInput }: FormFieldsProps) => {
  const handleAddField = () => {
    if (fieldInput.field_name && fieldInput.field_type) {
      setFields([...fields, { ...fieldInput, field_id: fields.length + 1 }]);
      setFieldInput({ field_name: "", field_type: "", is_required: false });
    }
  };

  const handleDeleteField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <Input
            value={fieldInput.field_name}
            onChange={(e) => setFieldInput({ ...fieldInput, field_name: e.target.value })}
            placeholder="Field Name"
          />
        </div>
        <div className="col-span-1">
          <Select
            value={fieldInput.field_type}
            onChange={(value) => setFieldInput({ ...fieldInput, field_type: value })}
            options={["String", "Number", "Boolean", "Date"].map((type) => ({ label: type, value: type }))}
          />
        </div>
        <div className="col-span-1">
          <Checkbox
            checked={fieldInput.is_required}
            onChange={(e) => setFieldInput({ ...fieldInput, is_required: e.target.checked })}
          >
            Required
          </Checkbox>
        </div>
        <div className="col-span-1">
          <Button type="primary" onClick={handleAddField}>
            Add Field
          </Button>
        </div>
      </div>
      <List
        dataSource={fields}
        renderItem={(item, index) => (
          <List.Item className="flex justify-between items-center">
            <div>{item.field_name}</div>
            <div>{item.field_type}</div>
            <div>{item.is_required ? "Required" : "Optional"}</div>
            <Button type="text" onClick={() => handleDeleteField(index)}>Delete</Button>
          </List.Item>
        )}
      />
    </>
  );
};

export default FormFields;
