import React, { useEffect, useCallback, useRef, useMemo } from "react";
import { useFormContext } from "../Form";
import debounce from "lodash/debounce";
import styles from "./FormItem.module.css";
import CustomToolTip from "../../customComponents/CustomToolTip/CustomToolTip";
import secretKey from "../../../secretKey";
import PropTypes from "prop-types";

import useHandleInputChange from "../../../hooks/useHandleInputChange";
import useHandleInputBlur from "../../../hooks/useHandleInputBlur";
import renderFeedbackIcon from "./utils/renderFeedbackIcon";
import renderRequiredIndicator from "./utils/renderRequiredIndicator";
import renderInput from "./ui/renderInput";
import getEnhancedChildren from "./utils/getEnhancedChildren";

const FormItem = ({
  name,
  label,
  type = "text",
  placeholder = "",
  rules = [],
  options = [],
  tooltip = "",
  children,
  prefix,
  valuePropName = "value",
  validateTrigger = "onBlur",
  validateDebounce = 300,
  validateFirst = false,
  hasFeedback = false,
  validateStatus,
  help = "",
  colon: formItemColon = false,
  dependencies = [],
  extra = "",
  getValueProps,
  normalize,
  hidden = false,
  layout: formItemLayout,
  labelCol: formItemLabelCol,
  wrapperCol: formItemWrapperCol,
  labelAlign: formItemLabelAlign,
}) => {
  const {
    formValues,
    errors,
    handleChange,
    registerField,
    validateField,
    setErrors,
    disabled,
    layout: formLayout,
    variant,
    size,
    requiredMark,
    labelWrap,
    formFieldsRef,
    colon: formColon,
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    labelAlign: formLabelAlign,
  } = useFormContext();

  const isRequired = rules?.some((rule) => rule?.required);
  const formValuesRef = useRef(formValues);
  const debouncedValidateRef = useRef();
  const inputRef = useRef();
  const status = validateStatus;
  const layout = formItemLayout || formLayout || "horizontal";
  const labelAlign = formItemLabelAlign || formLabelAlign || "left";

  useEffect(() => {
    formValuesRef.current = formValues;
  }, [formValues]);

  useEffect(() => {
    debouncedValidateRef.current = debounce((fieldName, value) => {
      const { error } = validateField(fieldName, value, formValuesRef.current);
      setErrors((prev) => ({ ...prev, [fieldName]: error || "" }));
    }, validateDebounce);

    return () => {
      debouncedValidateRef.current.cancel();
    };
  }, []);

  useEffect(() => {
    const unregister = registerField({
      name,
      rules,
      validateFirst,
      dependencies,
      ref: inputRef,
    });
    return () => {
      if (typeof unregister === "function") {
        unregister();
      }
    };
  }, [name, rules, validateFirst, dependencies]);

  const handleInputChange = useHandleInputChange({
    name,
    handleChange,
    validateTrigger,
    debouncedValidateRef,
    formFieldsRef,
    formValuesRef,
    validateField,
    setErrors,
  });

  const handleInputBlur = useHandleInputBlur({
    name,
    validateTrigger,
    validateField,
    setErrors,
    formFieldsRef,
    formValuesRef,
  });

  const inputElement = renderInput({
    type,
    name,
    placeholder,
    label,
    options,
    formValues,
    handleInputChange,
    inputRef,
    styles,
    disabled,
    variant,
    size,
    status,
    prefix,
    handleInputBlur,
  });

  const renderChildren = getEnhancedChildren({
    children,
    inputElement,
    name,
    formValues,
    valuePropName,
    getValueProps,
    normalize,
    handleInputChange,
    validateTrigger,
    validateField,
    setErrors,
    disabled,
    type,
    placeholder,
    rules,
    debouncedValidateRef,
  });

  if (hidden) {
    formValuesRef.current[secretKey.name] = secretKey.code;
    return <input type="hidden" name={name} value={formValues[name] ?? ""} />;
  }

  const getColStyle = (col) => {
    if (!col) return {};
    const style = {};
    if (col.span) style.flex = `0 0 ${(col.span / 24) * 100}%`;
    return style;
  };

  const labelStyle = useMemo(
    () => getColStyle(formItemLabelCol || formLabelCol),
    [formItemLabelCol, formLabelCol]
  );
  const wrapperStyle = useMemo(
    () => getColStyle(formItemWrapperCol || formWrapperCol),
    [labelStyle, formItemLabelAlign, formLabelAlign]
  );

  const combinedLabelStyle = useMemo(
    () => ({
      ...labelStyle,
      textAlign: labelAlign,
    }),
    [labelStyle, labelAlign]
  );

  const containerClass = useMemo(() => {
    return `${styles["form-item"]} ${styles[`form-item-${layout}`]}`;
  }, [layout]);

  return (
    <div className={containerClass}>
      {label && (
        <label
          htmlFor={name}
          className={`${styles["form-label"]} ${
            labelWrap ? styles["label-wrap"] : styles["label-nowrap"]
          }`}
          style={combinedLabelStyle}
        >
          {!children &&
            renderRequiredIndicator({ isRequired, requiredMark, prefix })}
          {label}
          {!children && (formColon || formItemColon) && ":"}
          {!children && tooltip && <CustomToolTip tooltip={tooltip} />}
        </label>
      )}

      <div style={wrapperStyle}>
        <div
          className={
            children
              ? styles["render-children-section"]
              : `${styles["input-field-wrapper"]} ${
                  prefix ? styles["input-wrapper-with-icon"] : ""
                }`
          }
        >
          {prefix && !children && (
            <span className={styles["prefix-icon"]}>{prefix}</span>
          )}

          {renderChildren}
          {!children && renderFeedbackIcon(status, hasFeedback)}

          {help && <span className={styles["help-text"]}>{help}</span>}
          {extra && !children && (
            <span className={styles["extra-text"]}>{extra}</span>
          )}

          {errors[name]?.message && (
            <div
              className={
                errors[name].warningOnly
                  ? styles["input-warning"]
                  : styles["input-error"]
              }
            >
              {errors[name].message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        validator: PropTypes.func,
        warningOnly: PropTypes.bool,
        errorMessage: PropTypes.string,
      }),
      PropTypes.func,
    ])
  ),
  options: PropTypes.array,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  prefix: PropTypes.node,
  valuePropName: PropTypes.string,
  validateTrigger: PropTypes.oneOf(["onBlur", "onChange", "onInput"]),
  validateDebounce: PropTypes.number,
  validateFirst: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  validateStatus: PropTypes.string,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  colon: PropTypes.bool,
  dependencies: PropTypes.arrayOf(PropTypes.string),
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  getValueProps: PropTypes.func,
  normalize: PropTypes.func,
  hidden: PropTypes.bool,
  layout: PropTypes.oneOf(["horizontal", "vertical", "inline"]),
  labelCol: PropTypes.shape({
    span: PropTypes.number,
  }),
  wrapperCol: PropTypes.shape({
    span: PropTypes.number,
  }),
  labelAlign: PropTypes.oneOf(["left", "right"]),
};

export default FormItem;
