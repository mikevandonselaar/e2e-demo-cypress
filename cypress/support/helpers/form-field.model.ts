import { FormFieldType } from './form-field-type.model';

export interface FormField {
  key: string;
  value: any;
  editable?: boolean;
  validateValue?: boolean;
  type?: FormFieldType;
  requestToAwait?: string;
}
