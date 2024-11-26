import * as yup from 'yup';

const OntFormValidationSchema = yup.object().shape({
  ontType: yup.string(),
  odfCode: yup.string(),
  odfPos: yup.string(),
  signature: yup.string(),
  ontPreInstalled: yup.boolean(),
  ontInstalled: yup.boolean(),
});

export default OntFormValidationSchema;
