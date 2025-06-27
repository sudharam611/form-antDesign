import React from "react";

const WithFormFieldEnhancer = (WrappedComponent) => {
  return ({
    name,
    formValues,
    valuePropName = "value",
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
    childProps = {},
  }) => {
    const rawValue = formValues[name];

    const valueProps = getValueProps
      ? getValueProps(rawValue)
      : {
          [valuePropName]:
            valuePropName === "checked" ? rawValue ?? false : rawValue ?? "",
        };

    const handleChildChange = (e) => {
      let newValue =
        valuePropName === "checked"
          ? e?.target?.checked ?? e
          : e?.target?.value ?? e;

      if (normalize) {
        newValue = normalize(newValue, formValues);
      }

      handleInputChange(newValue);

      if (validateTrigger === "onChange") {
        debouncedValidateRef.current(newValue);
      }

      if (typeof childProps.onChange === "function") {
        childProps.onChange(e);
      }
    };

    const handleChildBlur = (e) => {
      if (validateTrigger === "onBlur") {
        const { error } = validateField(name, formValues[name], formValues);
        setErrors((prev) => ({ ...prev, [name]: error || "" }));
      }

      if (typeof childProps.onBlur === "function") {
        childProps.onBlur(e);
      }
    };

    return (
      <WrappedComponent
        type={type}
        placeholder={placeholder}
        name={name}
        rules={rules}
        disabled={disabled}
        {...valueProps}
        onChange={handleChildChange}
        onBlur={handleChildBlur}
        {...childProps}
      />
    );
  };
};

export default WithFormFieldEnhancer;
