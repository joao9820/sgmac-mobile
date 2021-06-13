import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

interface MessageErrors {
  errors?: Array<string>;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
      if(error.path)
        validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

export function getValidationMessageErrors(err: ValidationError) {

  const validationErrors: Array<string> = [];

  let i = 0;

  err.inner.forEach((error) => {
      
      validationErrors[i] = error.message;
        
      i++;
      
  });

  return validationErrors;
}
