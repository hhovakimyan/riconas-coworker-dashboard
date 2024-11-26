import * as yup from 'yup';

const FormValidationSchema = yup.object().shape({
  hupType: yup.string(),
  hupLocation: yup.string(),
  hupPreInstalled: yup.boolean(),
  hupInstalled: yup.boolean(),
});

export default FormValidationSchema;
