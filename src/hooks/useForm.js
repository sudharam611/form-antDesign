import { useRef, useState } from "react";

const useForm = (initialValues = {}) => {
  const [formValues, setFormValues] = useState(() => ({ ...initialValues }));
  const [errors, setErrors] = useState({});
  const defaultsRef = useRef({});
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

  const resetForm = () => {
    const cleared = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    setFormValues(cleared);
    setErrors({});
  };

  const fillForm = () => {
    setFormValues({ ...defaultsRef.current });
    setErrors({});
  };

  return {
    formValues,
    errors,
    setErrors,
    handleChange,
    resetForm,
    fillForm,
    setFormValues,
    setDefaultValues,
  };
};

export default useForm;
