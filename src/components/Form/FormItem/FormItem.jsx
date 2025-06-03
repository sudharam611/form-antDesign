import React, { useEffect, useCallback, useRef } from "react";
import { useFormContext } from "../Form";
import _ from "lodash";
import debounce from "lodash/debounce";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styles from "./FormItem.module.css";
import CustomToolTip from "../../customComponents/CustomToolTip/CustomToolTip";
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
  ...restProps
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

  useEffect(() => {
    formValuesRef.current = formValues;
  }, [formValues]);

  useEffect(() => {
    registerField({ name, rules, validateFirst, dependencies });
  }, [name, rules, registerField, validateFirst, dependencies]);

  useEffect(() => {
    debouncedValidateRef.current = debounce((value) => {
      //console.log("debouncing");
      const { error } = validateField(name, value, formValuesRef.current);
      setErrors((prev) => ({ ...prev, [name]: error || "" }));
    }, validateDebounce);
  }, [validateField, validateDebounce, name]);

  const handleInputChange = useCallback(
    (value) => {
      handleChange(name, value);
      //console.log("happening");
      const updatedFormValues = { ...formValuesRef.current, [name]: value };
      if (validateTrigger === "onChange") {
        //console.log("onChange worki");
        debouncedValidateRef.current(value);
      }

      const dependentFields = formFieldsRef.current.filter((field) =>
        field.dependencies?.includes(name)
      );

      dependentFields.forEach((depField) => {
        const { error } = validateField(
          depField.name,
          updatedFormValues[depField.name],
          updatedFormValues
        );
        setErrors((prev) => ({ ...prev, [depField.name]: error || "" }));
      });
    },
    [handleChange, name, validateTrigger]
  );

  const handleInputBlur = useCallback(() => {
    if (validateTrigger === "onBlur") {
      //console.log("Happening on Blur");
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
  }, [validateTrigger, validateField, name]);

  const renderRequiredIndicator = () => {
    if (prefix) return;
    if (
      requiredMark?.type === "customize" &&
      typeof requiredMark.render === "function"
    ) {
      return requiredMark.render(isRequired);
    }

    if (!isRequired) {
      if (requiredMark?.type === "optional" || requiredMark === "optional") {
        return <span className={styles["optional-text"]}>(optional)</span>;
      }
      return null;
    }

    if (requiredMark?.type === "hidden" || requiredMark === "hidden") {
      return null;
    }

    return <span className={styles["required-asterisk"]}>*</span>;
  };

  // const getValidateStatus = () => {
  //   if (typeof validateStatus === "undefined") {
  //     const error = errors[name];
  //     const hasValue =
  //       formValues[name] !== undefined && formValues[name] !== "";

  //     if (!error && hasValue) return "success";
  //     if (error?.validating) return "validating";
  //     if (error?.warningOnly) return "warning";
  //     if (error) return "error";

  //     return undefined; // No status if untouched
  //   }

  //   return validateStatus;
  // };

  //const status = getValidateStatus();
  const status = validateStatus;
  // console.log(status);

  const renderFeedbackIcon = () => {
    if (!hasFeedback || !status) return null;
    // console.log(hasFeedback);
    switch (status) {
      case "success":
        return <span className={styles["feedback-icon"]}>✔️</span>;
      case "error":
        return <span className={styles["feedback-icon"]}>❌</span>;
      case "warning":
        return <span className={styles["feedback-icon"]}>⚠️</span>;
      case "validating":
        return <span className={styles["feedback-icon"]}>🔄</span>;
      default:
        return null;
    }
  };

  const renderInput = () => {
    const commonProps = {
      id: name,
      name,
      disabled,
      className: [
        styles["form-input"],
        variant && styles[variant],
        size && styles[size],
        status && styles[`form-input-${status}`],
        prefix && styles["input-with-icon"],
      ]
        .filter(Boolean)
        .join(" "),

      onBlur: handleInputBlur,
    };

    switch (type) {
      case "textarea":
        return (
          <textarea
            {...commonProps}
            rows={4}
            placeholder={placeholder}
            value={formValues[name] || ""}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        );

      case "select":
        return (
          <select
            {...commonProps}
            value={formValues[name] || ""}
            onChange={(e) => handleInputChange(e.target.value)}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <input
            {...commonProps}
            type="checkbox"
            checked={formValues[name] || false}
            onChange={(e) => handleInputChange(e.target.checked)}
          />
        );

      case "radio":
        return (
          <div className={styles["radio"]}>
            {options.map((option) => (
              <label key={option}>
                <input
                  {...commonProps}
                  type="radio"
                  value={option}
                  checked={formValues[name] === option}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <span className={styles["radio-input"]}>{option}</span>
              </label>
            ))}
          </div>
        );

      case "file":
        return (
          <input
            {...commonProps}
            type="file"
            onChange={(e) => handleInputChange(e.target.files[0])}
          />
        );

      default:
        return (
          <input
            {...commonProps}
            type={type}
            placeholder={placeholder}
            value={formValues[name] || ""}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        );
    }
  };

  const renderChildren = () => {
    if (!children) return renderInput();

    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      const rawValue = formValues[name];
      const valueProps = getValueProps
        ? getValueProps(rawValue)
        : {
            [valuePropName]:
              valuePropName === "checked" ? rawValue ?? false : rawValue ?? "",
          };
      const handleChildChange = (e) => {
        let newValue;

        if (valuePropName === "checked") {
          newValue =
            typeof e === "object" && e?.target !== undefined
              ? e.target.checked
              : e;
        } else {
          newValue =
            typeof e === "object" && e?.target !== undefined
              ? e.target.value
              : e;
        }
        if (normalize) {
          newValue = normalize(newValue, formValues);
        }

        handleInputChange(newValue);

        if (validateTrigger === "onChange") {
          debouncedValidateRef.current(newValue);
        }

        if (typeof child.props.onChange === "function") {
          child.props.onChange(e);
        }
      };
      const handleChildBlur = (e) => {
        if (validateTrigger === "onBlur") {
          const { error } = validateField(name, formValues[name], formValues);
          setErrors((prev) => ({ ...prev, [name]: error || "" }));
        }
        if (typeof child.props.onBlur === "function") {
          child.props.onBlur(e);
        }
      };

      return React.cloneElement(child, {
        ...restProps,
        type,
        placeholder,
        name,
        rules,
        ...valueProps,
        onChange: handleChildChange,
        onBlur: handleChildBlur,
        disabled,
      });
    });
  };

  if (hidden) {
    formValuesRef.current["secretCode"] = "123456";
    return <input type="hidden" name={name} value={formValues[name] ?? ""} />;
  }

  const getColStyle = (col) => {
    if (!col) return {};
    const style = {};
    if (col.span) style.flex = `0 0 ${(col.span / 24) * 100}%`;
    if (col.style) Object.assign(style, col.style);
    return style;
  };

  const layout = formItemLayout || formLayout || "horizontal";
  const labelAlign = formItemLabelAlign || formLabelAlign || "left";

  const labelStyle = getColStyle(formItemLabelCol || formLabelCol);
  const wrapperStyle = getColStyle(formItemWrapperCol || formWrapperCol);

  const combinedLabelStyle = {
    ...labelStyle,
    textAlign: labelAlign,
  };
  //console.log(labelAlign);
  const containerClass = `${styles["form-item"]} ${
    styles[`form-item-${layout}`]
  }`;
  //console.log(containerClass);
  return (
    // <div className={containerClass}>
    //   {children ? (
    //     <>
    //       {label && (
    //         <label
    //           htmlFor={name}
    //           className={`${styles["form-label"]} ${
    //             labelWrap ? styles["label-wrap"] : styles["label-nowrap"]
    //           }`}
    //           style={combinedLabelStyle}
    //         >
    //           {label}
    //         </label>
    //       )}
    //       <div style={wrapperStyle}>
    //         <div className={styles["render-children-section"]}>
    //           {renderChildren()}
    //           {help && <span className={styles["help-text"]}>{help}</span>}
    //           {errors[name]?.message && (
    //             <div
    //               className={`${
    //                 errors[name].warningOnly
    //                   ? styles["input-warning"]
    //                   : styles["input-error"]
    //               }`}
    //             >
    //               {errors[name].message}
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </>
    //   ) : (
    //     <>
    //       {label && (
    //         <label
    //           htmlFor={name}
    //           className={`${styles["form-label"]} ${
    //             labelWrap ? styles["label-wrap"] : styles["label-nowrap"]
    //           }`}
    //           style={combinedLabelStyle}
    //         >
    //           {renderRequiredIndicator()}
    //           {label} {(formColon || formItemColon) && ":"}
    //           {tooltip && <CustomToolTip tooltip={tooltip} />}
    //         </label>
    //       )}
    //       <div style={wrapperStyle}>
    //         <div
    //           className={`${styles["input-field-wrapper"]} ${
    //             prefix ? styles["input-wrapper-with-icon"] : ""
    //           }`}
    //         >
    //           {renderChildren()}
    //           {renderFeedbackIcon()}
    //           {prefix && (
    //             <span className={styles["prefix-icon"]}>{prefix}</span>
    //           )}
    //           {help && <span className={styles["help-text"]}>{help}</span>}
    //           {extra && <span className={styles["extra-text"]}>{extra}</span>}
    //           {errors[name]?.message && (
    //             <div
    //               className={`${
    //                 errors[name].warningOnly
    //                   ? styles["input-warning"]
    //                   : styles["input-error"]
    //               }`}
    //             >
    //               {errors[name].message}
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </div>

    <div className={containerClass}>
      {label && (
        <label
          htmlFor={name}
          className={`${styles["form-label"]} ${
            labelWrap ? styles["label-wrap"] : styles["label-nowrap"]
          }`}
          style={combinedLabelStyle}
        >
          {!children && renderRequiredIndicator()}
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

          {renderChildren()}

          {!children && renderFeedbackIcon()}

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

export default FormItem;
