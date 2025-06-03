import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useForm from "./../../hook/useForm";
import styles from "./Form.module.css";
const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

const Form = ({
  children,
  initialValues = {},
  onFinish,
  onFinishFailed,
  disabled: disabledProp = false,
  layout = "horizontal",
  variant = "outlined",
  size = "default",
  requiredMark = "default",
  defaultValues = {},
  labelWrap,
  scrollToFirstError = false,
  validateMessages,
  colon = true,
  labelCol = { span: 6 },
  wrapperCol = { span: 16 },
  labelAlign = "right",
}) => {
  //console.log(labelAlign);
  //console.log("in Form", validateTrigger);
  //   console.log(defaultValues);
  //   console.log(disabled);
  //console.log(validateMessages);

  const formFieldsRef = useRef([]);
  const form = useForm(initialValues);
  const [isDisabled, setIsDisabled] = useState(disabledProp);

  const registerField = (field) => {
    const existingIndex = formFieldsRef.current.findIndex(
      (f) => f.name === field.name
    );

    const fieldData = {
      ...field,
      dependencies: field.dependencies || [], // ✅ Store dependencies as empty array if not provided
      rules: field.rules || [],
      validateFirst: field.validateFirst || false,
    };

    if (existingIndex !== -1) {
      formFieldsRef.current[existingIndex] = fieldData;
    } else {
      formFieldsRef.current.push(fieldData);
    }
  };

  const validateField = (name, value, formValues) => {
    const field = formFieldsRef.current.find((f) => f.name === name);
    if (!field) return { isValid: true, error: null };

    let isValid = true;
    let newError = null;

    for (let rule of field.rules) {
      if (typeof rule === "function") {
        rule = rule({ getFormValues: () => formValues });
        if (!rule) continue;
      }
      let requiredCheck = false;
      if (typeof rule.required === "function") {
        requiredCheck = rule.required(value, formValues);
      } else {
        requiredCheck = rule.required;
      }

      if (
        requiredCheck &&
        (value === undefined || value === null || value === "")
      ) {
        isValid = false;
        const message =
          rule.errorMessage ||
          validateMessages?.required?.replace(
            "${label}",
            field.label || name
          ) ||
          `${field.label || name} is required`;
        newError = { message, warningOnly: false };
        if (field.validateFirst) break;
      } else if (rule.validator && !rule.validator(value, formValues)) {
        if (!rule.warningOnly) isValid = false;
        const message =
          rule.errorMessage ||
          validateMessages?.validator?.replace(
            "${label}",
            field.label || name
          ) ||
          `${field.label || name} is invalid`;
        newError = {
          message,
          warningOnly: rule.warningOnly || false,
        };
        if (field.validateFirst) break;
      }
    }
    //console.log(newError);
    return { isValid, error: newError };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const errors = {};
    formFieldsRef.current.forEach((field) => {
      const { isValid: fieldValid, error } = validateField(
        field.name,
        form.formValues[field.name],
        form.formValues
      );
      if (error) {
        errors[field.name] = error;
      }
      //console.log(error);
      if (!fieldValid && !error?.warningOnly) {
        isValid = false;
      }
    });
    form.setErrors(errors);
    if (isValid) {
      onFinish?.(form.formValues);
    } else {
      if (scrollToFirstError) {
        console.log(scrollToFirstError);
        const firstErrorFieldName = Object.keys(errors)[0];
        console.log("Error", form.errors);
        if (firstErrorFieldName) {
          const firstFieldElement = document.querySelector(
            `[name="${firstErrorFieldName}"]`
          );

          if (firstFieldElement) {
            firstFieldElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            firstFieldElement.focus();
          }
        }
      }
      onFinishFailed?.(form.errors);
    }
  };

  useEffect(() => {
    if (form && defaultValues) {
      form.setDefaultValues(defaultValues);
    }
  }, [form, defaultValues]);

  useEffect(() => {
    setIsDisabled(disabledProp);
  }, [disabledProp]);

  return (
    <>
      {disabledProp && (
        <label>
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={(e) => setIsDisabled(e.target.checked)}
            className={styles["disable-form"]}
          />
          Form disabled
        </label>
      )}
      <FormContext.Provider
        value={{
          ...form,
          registerField,
          validateField,
          disabled: isDisabled,
          layout,
          variant,
          size,
          requiredMark,
          labelWrap,
          formFieldsRef,
          colon,
          labelCol,
          wrapperCol,
          labelAlign,
        }}
      >
        <form
          onSubmit={handleSubmit}
          className={styles[`form-layout-${layout}`]}
        >
          {children}
        </form>
      </FormContext.Provider>
    </>
  );
};

export default Form;
