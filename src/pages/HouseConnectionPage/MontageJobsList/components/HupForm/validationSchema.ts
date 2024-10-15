import * as yup from 'yup';

const HopFormValidationSchema = yup.object().shape({
  openedHupPhoto: yup.mixed(),
  closedHupPhoto: yup.mixed(),
  hupType: yup.string(),
  hupLocation: yup.string(),
  hupPreInstalled: yup.boolean(),
  hupInstalled: yup.boolean(),
});

export default HopFormValidationSchema;