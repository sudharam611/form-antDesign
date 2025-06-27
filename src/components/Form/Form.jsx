import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useForm from "../../hooks/useForm";
import styles from "./Form.module.css";
import PropTypes from "prop-types";

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
  const formFieldsRef = useRef([]);
  const form = useForm(initialValues);
  const [isDisabled, setIsDisabled] = useState(disabledProp);

  useEffect(() => {
    if (form && defaultValues) {
      form.setDefaultValues(defaultValues);
    }
  }, [form, defaultValues]);

  useEffect(() => {
    setIsDisabled(disabledProp);
  }, [disabledProp]);

  const registerField = (field) => {
    const existingIndex = formFieldsRef.current.findIndex(
      (formField) => formField.name === field.name
    );

    const fieldData = {
      ...field,
      ref: field.ref || React.createRef(),
      dependencies: field.dependencies || [],
      rules: field.rules || [],
      validateFirst: field.validateFirst || false,
    };

    if (existingIndex !== -1) {
      formFieldsRef.current[existingIndex] = fieldData;
    } else {
      formFieldsRef.current.push(fieldData);
    }
    return () => {
      formFieldsRef.current = formFieldsRef.current.filter(
        (formField) => formField.name !== field.name
      );
    };
  };

  const validateField = (name, value, formValues) => {
    const field = formFieldsRef.current.find(
      (formField) => formField.name === name
    );
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
      if (!fieldValid && !error?.warningOnly) {
        isValid = false;
      }
    });
    form.setErrors(errors);
    if (isValid) {
      onFinish?.(form.formValues);
    } else {
      if (scrollToFirstError) {
        const firstErrorFieldName = Object.keys(errors)[0];
        if (firstErrorFieldName) {
          const errorField = formFieldsRef.current.find(
            (field) => field.name === firstErrorFieldName
          );

          const node = errorField?.ref?.current;

          if (node) {
            node.scrollIntoView({ behavior: "smooth", block: "center" });
            node.focus();
          }
        }
      }
      onFinishFailed?.(form.errors);
    }
  };

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

Form.propTypes = {
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.object,
  onFinish: PropTypes.func,
  onFinishFailed: PropTypes.func,
  disabled: PropTypes.bool,
  layout: PropTypes.oneOf(["horizontal", "vertical", "inline"]),
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  size: PropTypes.oneOf(["small", "default", "large"]),
  requiredMark: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["optional", "default"]),
    PropTypes.shape({
      type: PropTypes.oneOf(["customize"]).isRequired,
      render: PropTypes.func,
    }),
  ]),
  defaultValues: PropTypes.object,
  labelWrap: PropTypes.bool,
  scrollToFirstError: PropTypes.bool,
  validateMessages: PropTypes.shape({
    required: PropTypes.string,
    validator: PropTypes.string,
  }),
  colon: PropTypes.bool,
  labelCol: PropTypes.shape({
    span: PropTypes.number,
  }),
  wrapperCol: PropTypes.shape({
    span: PropTypes.number,
  }),
  labelAlign: PropTypes.oneOf(["left", "right"]),
};

export default Form;
