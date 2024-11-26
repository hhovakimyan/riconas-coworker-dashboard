import * as yup from 'yup';

const FormValidationSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('email.errors.invalid')
      .required('email.errors.required'),
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'password.errors.invalid',
      )
      .required('password.errors.required'),
  })
  .required();

export default FormValidationSchema;
