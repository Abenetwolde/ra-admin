export interface FormField {
  field_id: number;
  form_id: number;
  field_name: string;
  field_type: string;
  is_required: boolean;
}

export interface FormData {
  form_id: number;
  name: string;
  org_id: number;
  created_at: string;
  fields: FormField[];
}

export interface Organization {
  org_id: number;
  org_name: string;
}

export interface FieldInput {
  field_name: string;
  field_type: string;
  is_required: boolean;
}
