import { useCallback } from "react";

const useHandleInputBlur = ({
  name,
  validateTrigger,
  validateField,
  setErrors,
  formFieldsRef,
  formValuesRef,
}) =>
  useCallback(() => {
    if (validateTrigger === "onBlur") {
      const { error } = validateField(
        name,
        formValuesRef.current[name],
        formValuesRef.current
      );
      setErrors((prev) => ({ ...prev, [name]: error || "" }));

      const dependentFields = formFieldsRef.current.filter((field) =>
        field.dependencies?.includes(name)
      );

      dependentFields.forEach((depField) => {
        const { error: depError } = validateField(
          depField.name,
          formValuesRef.current[depField.name],
          formValuesRef.current
        );
        setErrors((prev) => ({
          ...prev,
          [depField.name]: depError || "",
        }));
      });
    }
  }, [
    validateTrigger,
    validateField,
    name,
    setErrors,
    formFieldsRef,
    formValuesRef,
  ]);

export default useHandleInputBlur;
