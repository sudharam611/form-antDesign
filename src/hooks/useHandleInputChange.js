import { useCallback } from "react";

const useHandleInputChange = ({
  name,
  handleChange,
  validateTrigger,
  debouncedValidateRef,
  formFieldsRef,
  formValuesRef,
  validateField,
  setErrors,
}) =>
  useCallback(
    (value) => {
      handleChange(name, value);
      const updatedFormValues = { ...formValuesRef.current, [name]: value };

      if (validateTrigger === "onChange") {
        debouncedValidateRef.current(name, value);
        setErrors((prev) => ({ ...prev, [name]: "" }));

        const dependentFields = formFieldsRef.current.filter((field) =>
          field.dependencies?.includes(name)
        );

        dependentFields.forEach((depField) => {
          const { error } = validateField(
            depField.name,
            updatedFormValues[depField.name],
            updatedFormValues
          );
          setErrors((prev) => ({
            ...prev,
            [depField.name]: error || "",
          }));
        });
      }
    },
    [
      handleChange,
      name,
      validateTrigger,
      debouncedValidateRef,
      formFieldsRef,
      formValuesRef,
      validateField,
      setErrors,
    ]
  );

export default useHandleInputChange;
