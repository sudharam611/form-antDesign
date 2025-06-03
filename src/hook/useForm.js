import { useEffect, useRef, useState } from "react";

const useForm = (initialValues = {}) => {
  const [formValues, setFormValues] = useState(() => ({ ...initialValues }));
  const [errors, setErrors] = useState({});
  const defaultsRef = useRef({});
  useEffect(() => {
    setFormValues({ ...initialValues });
  }, []);

  const setDefaultValues = (values) => {
    defaultsRef.current = values;
  };
  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // const validate = (fields) => {
  //   let isValid = true;
  //   let newErrors = {};
  //   fields.forEach(({ name, rules, validateFirst }) => {
  //     const value = formValues[name];
  //     for (let rule of rules) {
  //       if (rule.required && !value) {
  //         isValid = false;
  //         const message =
  //           rule.errorMessage ||
  //           validateMessages?.required?.replace("${label}", label || name) ||
  //           `${label || name} is required`;
  //         //newErrors[name] = { message: rule.errorMessage, warningOnly: false };
  //         newErrors[name] = { message, warningOnly: false };
  //         if (validateFirst) break;
  //       } else if (rule.validator && !rule.validator(value)) {
  //         if (!rule.warningOnly) isValid = false;
  //         const message =
  //           rule.errorMessage ||
  //           validateMessages?.validator?.replace("${label}", label || name) ||
  //           `${label || name} is invalid`;
  //         newErrors[name] = {
  //           message,
  //           warningOnly: rule.warningOnly || false,
  //         };
  //         if (validateFirst) break;
  //       }
  //     }
  //   });
  //   // console.log(newErrors);
  //   setErrors(newErrors);
  //   return { isValid, errors: newErrors };
  // };

  // Submit handler
  // const handleSubmit = (fields, callback) => {
  //   return (e) => {
  //     e.preventDefault();
  //     const isValid = validate(fields);
  //     if (isValid) {
  //       // setErrors({});
  //       callback(formValues);
  //       //resetForm();
  //     }
  //   };
  // };

  const resetForm = () => {
    const cleared = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    setFormValues(cleared);
    setErrors({});
  };

  const fillForm = () => {
    console.log("filling");
    // setFormValues(defaultValues);
    // console.log(formValues);
    setFormValues({ ...defaultsRef.current });
    setErrors({});
  };

  return {
    formValues,
    errors,
    setErrors,
    handleChange,
    // handleSubmit,
    resetForm,
    fillForm,
    setFormValues,
    //validate,
    setDefaultValues,
  };
};

export default useForm;
