import styles from "../FormItem.module.css";

const renderInput = ({
  type,
  name,
  placeholder,
  label,
  options,
  formValues,
  handleInputChange,
  inputRef,
  disabled,
  variant,
  size,
  status,
  prefix,
  handleInputBlur,
}) => {
  const commonProps = {
    id: name,
    name,
    disabled,
    ref: inputRef,
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

export default renderInput;
