import React from "react";
import WithFormFieldEnhancer from "./withFormFieldEnhancer";

const getEnhancedChildren = ({
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
}) => {
  if (!children) return inputElement;

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const Enhanced = WithFormFieldEnhancer(child.type);

    return (
      <Enhanced
        name={name}
        formValues={formValues}
        valuePropName={valuePropName}
        getValueProps={getValueProps}
        normalize={normalize}
        handleInputChange={handleInputChange}
        validateTrigger={validateTrigger}
        validateField={validateField}
        setErrors={setErrors}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        rules={rules}
        debouncedValidateRef={debouncedValidateRef}
        childProps={child.props}
      />
    );
  });
};

export default getEnhancedChildren;
