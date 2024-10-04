import * as yup from 'yup';

const ResetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'password.errors.invalid'
      )
      .required('password.errors.required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], 'confirmPassword.errors.notMatch')
      .required('confirmPassword.errors.required'),
  })
  .required()

export default ResetPasswordSchema;
