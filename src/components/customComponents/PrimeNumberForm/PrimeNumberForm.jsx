import React, { useState } from "react";
import Form from "../../Form/Form";
import FormItem from "../../Form/FormItem/FormItem";
import InputNumeric from "../InputNumeric/InputNumeric";

const PrimeNumberForm = () => {
  const [number, setNumber] = useState({
    value: 11,
    validateStatus: "validating",
    errorMesg: null,
  });
  const validatePrimenumber = (num) => {
    if (num === 11) {
      return {
        validateStatus: "success",
        message: "✔️ 11 is the prime number between 8 and 12",
      };
    }
    return {
      validateStatus: "error",
      message: "❌ The prime between 8 and 12 is 11!",
    };
  };
  const handleNumberChange = (value) => {
    if (value === "") {
      setNumber({
        value: "",
        validateStatus: "error",
        errorMesg: "Please enter a number.",
      });
      return;
    }
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setNumber({
        value,
        validateStatus: "error",
        errorMesg: "Invalid number.",
      });
      return;
    }
    const result = validatePrimenumber(num);
    setNumber({
      value,
      ...result,
    });
  };

  return (
    <>
      <Form name="handle-data-manually" labelWrap>
        <FormItem
          name="primeNumber"
          label="Prime between 8 and 12"
          validateStatus={number.validateStatus}
          help={
            number.message ||
            "A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself."
          }
        >
          <InputNumeric
            min={8}
            max={12}
            value={number.value}
            status={number.validateStatus}
            onChange={handleNumberChange}
          />
        </FormItem>
      </Form>
    </>
  );
};

export default PrimeNumberForm;
