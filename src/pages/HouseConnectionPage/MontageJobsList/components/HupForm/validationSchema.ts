import * as yup from 'yup';

const HopFormValidationSchema = yup.object().shape({
  hupType: yup.string(),
  hupLocation: yup.string(),
  hupPreInstalled: yup.boolean(),
  hupInstalled: yup.boolean(),
});

export default HopFormValidationSchema;