import * as yup from 'yup';

const FormValidationSchema = yup
  .object({
    email: yup
      .string()
      .email('email.errors.invalid')
      .required('email.errors.required'),
  })
  .required();

export default FormValidationSchema;
