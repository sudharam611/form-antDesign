import React, { useState } from "react";
import Form from "./components/Form/Form";
import FormItem from "./components/Form/FormItem/FormItem";
import Button from "./components/customComponents/Button/Button";
import "./App.css";
import CustomCheckbox from "./components/customComponents/CustomCheckBox/CustomCheckbox";
import Header from "./components/customComponents/Header/Header";
import Tag from "./components/customComponents/Tag/Tag";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import residences from "./data/residences";
import {
  Cascader,
  Checkbox,
  Col,
  ColorPicker,
  DatePicker,
  InputNumber,
  Radio,
  Rate,
  Row,
  Select,
  Slider,
  Switch,
} from "antd";
import Flex from "./components/customComponents/Flex/Flex";
import PrimeNumberForm from "./components/customComponents/PrimeNumberForm/PrimeNumberForm";

const App = () => {
  const { Option } = Select;

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      {/* 1. BASIC FORM */}
      <div className="form-container">
        <Header
          heading="Basic Form"
          description="Basic Form data control. Includes initial values, validation and submit"
        />
        <Form
          name="basic"
          initialValues={{ rememberMe: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
        >
          <FormItem
            name="username"
            label="Username"
            type="text"
            placeholder="Enter username"
            rules={[
              { required: true, errorMessage: "Please input your username!" },
            ]}
          />

          <FormItem
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password"
            rules={[
              { required: true, errorMessage: "Please input your password!" },
              {
                validator: (value) => !value || value.length > 6,
                errorMessage: "Password must be more than 6 character",
              },
            ]}
          />

          <FormItem name="rememberMe" valuePropName="checked">
            <CustomCheckbox>Remember Me</CustomCheckbox>
          </FormItem>

          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>

      {/* 2. FORM METHODS*/}
      <div className="form-container">
        <Header
          heading="Form methods"
          description="Call form method with Form.useForm"
        />
        <Form
          name="control-hooks"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          defaultValues={{ note: "Hey, How are you?", gender: "Male" }}
        >
          <FormItem
            name="note"
            label="Note"
            type="text"
            placeholder="Enter your note"
            rules={[
              { required: true, errorMessage: "Please input your note!" },
            ]}
          />

          <FormItem
            name="gender"
            label="Gender"
            type="select"
            rules={[
              { required: true, errorMessage: "Please select your gender!" },
            ]}
            options={["Male", "Female", "Other"]}
          />
          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="reset" variant="secondary">
              Reset
            </Button>
            <Button type="fill" variant="tertiary">
              Fill Form
            </Button>
          </div>
        </Form>
      </div>

      {/* 3. FORM LAYOUT*/}
      <div className="form-container">
        <Header
          heading="Form layout - Vertical"
          description="There are three layout for form: horizontal, vertical, inline"
        />
        <Form
          name="form-layout"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          colon={false}
          labelAlign="left"
        >
          <FormItem
            name="fielda"
            label="Field A"
            placeholder="input placeholder"
            colon={true}
          />
          <FormItem
            name="fieldb"
            label="Field B"
            placeholder="input placeholder"
          />
        </Form>
      </div>

      {/* 4. FORM MIX LAYOUT */}
      <div className="form-container">
        <Header
          heading="Form mix layout"
          description="Defining a separate layout on Form.Item can achieve multiple layouts for a single form."
        />
        <Form
          name="form-layout"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <FormItem
            name="horizontal"
            label="horizontal"
            rules={[{ required: true }]}
          />
          <FormItem
            layout="vertical"
            label="Vertical"
            name="vertical"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            labelAlign="left"
          />
        </Form>
        <Form
          layout="vertical"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <FormItem
            label="Vertical"
            name="vertical"
            rules={[{ required: true }]}
            labelAlign="left"
          />
          <FormItem
            layout="horizontal"
            label="Horizontal"
            name="horizontal"
            rules={[{ required: true }]}
          />
        </Form>
      </div>

      {/* 5. FORM DISABLED*/}
      <div className="form-container">
        <Header
          heading="Form disabled"
          description="Set component to disabled"
        />
        <Form
          name="disabled-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          disabled={true}
        >
          <FormItem
            name="input"
            label="Input"
            type="text"
            placeholder="sample input"
          />

          <FormItem
            name="select"
            label="Select"
            type="select"
            options={["a", "b", "c"]}
          />

          <FormItem
            name="radio"
            label="Radio"
            type="radio"
            options={["Apple", "Pear"]}
          />

          <FormItem name="date" label="Date" type="date" />

          <FormItem name="time" label="Time" type="time" />

          <FormItem name="color" label="Color Picker" type="color" />

          <FormItem
            name="dateandtime"
            label="Date & Time"
            type="datetime-local"
          />
          <FormItem name="file" label="Upload Resume" type="file" />
          <FormItem name="textarea" label="TextArea" type="textarea" />

          <div className="button-section">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </div>

      {/* 6. FORM VARIANTS */}
      <div className="form-container">
        <Header
          heading="Form variants - Underlined"
          description="Change the variant of all components in the form : outlined, filled, borderless and underlined"
        />
        <Form
          name="form-variants"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          variant="underlined"
        >
          <FormItem
            name="input"
            label="Input"
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="inputnumber"
            label="InputNumber"
            type="number"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />

          <FormItem
            name="textarea"
            label="TextArea"
            type="textarea"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="mentions"
            label="Mentions"
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />

          <FormItem
            name="select"
            label="Select"
            type="select"
            options={["a", "b", "c"]}
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="date"
            label="Date"
            type="date"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>

      {/* 7. REQUIRED STYLE */}
      <div className="form-container">
        <Header
          heading="Required Style - Customize"
          description="Switch required or optional style with requiredMark - default, optional, hidden, customize"
        />
        <Form
          name="required-mark"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={{
            type: "customize",
            render: (isRequired) =>
              isRequired ? (
                <Tag text="Required" style="required-box" />
              ) : (
                <Tag text="Optional" style="optional-box" />
              ),
          }}
          //requiredMark={{ type: "optional" }}
        >
          <FormItem
            name="fielda"
            label="Field A"
            placeholder="input placeholder"
            rules={[
              { required: true, errorMessage: "Please input your username!" },
            ]}
          />
          <FormItem
            name="fieldb"
            label="Field B"
            placeholder="input placeholder"
          />
        </Form>
      </div>

      {/* 8. FORM SIZE */}
      <div className="form-container">
        <Header
          heading="Form size - Small"
          description="Set component size: small, default, large"
        />
        <Form
          name="form-size"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="small"
        >
          <FormItem
            name="input"
            label="Input"
            type="text"
            placeholder="Enter input"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="select"
            label="Select"
            type="select"
            options={["a", "b", "c"]}
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="date"
            label="Date"
            type="date"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
        </Form>
      </div>

      {/* 9. LABEL WRAP */}
      <div className="form-container">
        <Header
          heading="Label can wrap"
          description="Turn on labelWrap to wrap label if text is long"
        />
        <Form
          name="label-wrap"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelWrap
        >
          <FormItem
            name="input"
            label="Normal label"
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem
            name="input"
            label="A super long label text"
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          />
          <FormItem name="input" label="A super long label text" type="text" />
        </Form>
      </div>

      {/* 10. NO BLOCK RULE */}
      <div className="form-container">
        <Header
          heading="No Block rule"
          description="rule with warningOnly will not block form submit"
        />
        <Form
          name="warningOnly-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          defaultValues={{ url: "https://google.com" }}
        >
          <FormItem
            name="url"
            label="URL"
            type="url"
            rules={[
              { required: true, errorMessage: "Please input this field" },
              {
                validator: (value) => !value || value.length < 20,
                errorMessage: "URL should be 20 characters long",
                warningOnly: true,
              },
            ]}
          />
          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Button type="fill" variant="tertiary">
              Fill Form
            </Button>
          </div>
        </Form>
      </div>

      {/* 11. VALIDATE TRIGGER */}
      <div className="form-container">
        <Header
          heading="Validate Trigger"
          description="Change the verification timing through validateTrigger, or change the verification frequency through validateDebounce, or set the verification short circuit through validateFirst"
        />
        <Form
          name="validate-trigger-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            hasFeedback
            name="field1"
            label="Field A"
            type="text"
            validateTrigger="onBlur"
            placeholder="Validates onBlur"
            rules={[
              {
                validator: (value) => !value || value.length <= 3,
                errorMessage: "Text chars must be less than or equal to 3",
              },
            ]}
          />

          <FormItem
            hasFeedback
            name="field2"
            label="Field B"
            type="text"
            validateTrigger="onChange"
            validateDebounce={3000}
            placeholder="Validate requires debounce after 3s"
            rules={[
              {
                validator: (value) => !value || value.length <= 3,
                errorMessage: "Text chars must be less than or equal to 3",
              },
            ]}
          />
          <FormItem
            hasFeedback
            name="field3"
            label="Field C"
            type="text"
            validateTrigger="onChange"
            validateFirst
            rules={[
              {
                validator: (value) => !value || value.length >= 10,
                errorMessage: "Text chars must be greater than 10",
              },
              {
                validator: (value) => !value || value.length <= 3,
                errorMessage: "Text chars must be less than or equal to 3",
              },
            ]}
          />
        </Form>
      </div>

      {/* 12. CUSTOMIZED VALIDATION */}
      <div className="form-container">
        <Header
          heading="Customized Validation"
          description="We provide properties like validateStatus help hasFeedback to customize your own validate status and message, without using Form."
        />
        <Form
          name="customized-validation"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            name="fail"
            label="Fail"
            type="text"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
          />
          <FormItem
            name="warning"
            label="Warning:  "
            type="text"
            validateStatus="warning"
          />
          <FormItem
            name="validating"
            label="Validating"
            type="text"
            hasFeedback
            validateStatus="validating"
            help="The information is being validated"
          />
          <FormItem
            name="success"
            label="Success"
            type="text"
            hasFeedback
            validateStatus="success"
            placeholder="I'm the content"
          />
          <FormItem
            name="warning"
            label="Warning"
            type="text"
            hasFeedback
            validateStatus="warning"
          />
          <FormItem
            name="fail"
            label="Fail"
            type="text"
            hasFeedback
            validateStatus="error"
          />
        </Form>
      </div>

      {/* 13. INLINE LOGIN FORM */}
      <div className="form-container">
        <Header
          heading="Inline Login Form"
          description="Inline login form is often used in navigation bar."
        />
        <Form
          name="inline-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="inline"
        >
          <FormItem
            name="sampleusername"
            type="text"
            placeholder="Username"
            prefix={<UserOutlined />}
            rules={[
              { required: true, errorMessage: "Please enter this input" },
            ]}
          />
          <FormItem
            name="samplepassword"
            type="password"
            placeholder="Password"
            prefix={<LockOutlined />}
            rules={[
              {
                validator: (value) => !value || value.length > 6,
                errorMessage: "Password must be more than 6 character",
              },
            ]}
          />
          <div>
            <Button type="submit" variant="primary">
              Log In
            </Button>
          </div>
        </Form>
      </div>

      {/* 14. LOGIN FORM */}
      <div className="form-container">
        <Header
          heading="Login Form"
          description="Normal login form which can contain more elements.."
        />
        <Form
          name="login-form"
          initialValues={{ rememberMeLogin: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <FormItem
            name="loginusername"
            type="text"
            placeholder="Username"
            rules={[
              { required: true, errorMessage: "Please input your Username!" },
            ]}
            prefix={<UserOutlined />}
          />
          <FormItem
            name="loginpassword"
            type="password"
            placeholder="Password"
            rules={[
              { required: true, errorMessage: "Please input your Password!" },
              {
                validator: (value) => !value || value.length > 6,
                errorMessage: "Password must be more than 6 character",
              },
            ]}
            prefix={<LockOutlined />}
          />
          <Flex justify="space-between">
            <FormItem name="rememberMeLogin" valuePropName="checked">
              <CustomCheckbox>Remember Me</CustomCheckbox>
            </FormItem>
            <a href="">Forgot password</a>
          </Flex>

          <div className="button-section">
            <Button type="submit" variant="primary">
              Log In
            </Button>{" "}
            or <a href="">Register now!</a>
          </div>
        </Form>
      </div>

      {/* 15. REGISTRATION */}
      <div className="form-container">
        <Header
          heading="Registration"
          description="Fill in this form to create a new account for you."
        />
        <Form
          name="registration-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{}}
          labelWrap
        >
          <FormItem
            name="email"
            label="Email"
            type="email"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
            extra="We'll never share your email with anyone"
          />
          <FormItem
            name="password"
            label="Password"
            type="password"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            name="confirmpassword"
            label="Confirm Password"
            type="password"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            name="nickname"
            label="Nickname"
            type="text"
            tooltip="What do you want other to call you?"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            name="phonenumber"
            label="Phone Number"
            type="tel"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            label="Habitual Residence"
            name="residence"
            rules={[
              { required: true, errorMessage: "Please input this field" },
            ]}
          >
            <Cascader options={residences} />
          </FormItem>
          <FormItem
            name="donation"
            label="Donation"
            type="number"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />

          <FormItem
            name="website"
            label="Website"
            type="url"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />
          <FormItem
            name="intro"
            label="Intro"
            type="textarea"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
            ]}
          />

          <FormItem
            name="gender"
            label="Gender"
            type="select"
            rules={[
              { required: true, errorMessage: "Please select your gender!" },
            ]}
            options={["Male", "Female", "Other"]}
          />
          <FormItem name="agreement">
            <CustomCheckbox>I have read the agreement</CustomCheckbox>
          </FormItem>
          <div className="button-section">
            <Button type="submit" variant="primary">
              Register
            </Button>
          </div>
        </Form>
      </div>

      {/* 16. DEPENDENCIES */}
      <div className="form-container">
        <Header
          heading="Dependencies"
          description="Form.Item can set the associated field through the dependencies property. When the value of the associated field changes, the validation and update will be triggered.

"
        />
        <Form
          name="dependencies-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelWrap
        >
          <FormItem
            validateTrigger="onChange"
            name="password"
            label="Password"
            type="text"
            rules={[
              { required: true, errorMessage: "Please input this field!" },
              {
                validator: (value) => value.length >= 6,
                errorMessage: "Password must be at least 6 characters",
              },
            ]}
          />
          <FormItem
            validateTrigger="onChange"
            name="confirmpassword"
            label="Confirm Password"
            type="text"
            dependencies={["password"]}
            rules={[
              { required: true, errorMessage: "Please input this field!" },
              {
                validator: (value, allValues) => value === allValues.password,
                errorMessage: "Passwords do not match",
              },
            ]}
          />
        </Form>
      </div>

      {/* 17. DYNAMIC RULES */}
      <div className="form-container">
        <Header
          heading="Dynamic Rules"
          description="Perform diffrent check rules according to different situations."
        />
        <Form
          name="dynamic-rules-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <FormItem
            name="name"
            label="Name"
            rules={[{ required: true, errorMessage: "Name is required" }]}
          />
          <FormItem
            name="nickname"
            label="Nickname"
            dependencies={["hasNickname"]}
            rules={[
              ({ getFormValues }) => {
                const values = getFormValues();
                return {
                  required: values?.hasNickname,
                  errorMessage: "Nickname is required when checkbox is checked",
                };
              },
            ]}
          />

          <FormItem name="hasNickname" valuePropName="checked">
            <CustomCheckbox>Nickname is required</CustomCheckbox>
          </FormItem>

          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>

      {/* 18. HANDLE FORM DATA MANUALLY */}
      <div className="form-container">
        <Header
          heading="Handle Form data manually"
          description="Form will collect and validate form data automatically. But if you don't need this feature or the default behavior cannot satisfy your business, you can handle form data manually."
        />
        <PrimeNumberForm />
      </div>

      {/* 19. SLIDE TO ERROR FIELD */}
      <div className="form-container">
        <Header
          heading="Slide to error field"
          description="When validation fails or manually scroll to error field."
        />
        <div style={{ height: "200px", overflow: "scroll" }}>
          <Form
            name="slide-to-error-field"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            scrollToFirstError={true}
          >
            <FormItem
              name="profile"
              label="Username"
              type="text"
              placeholder="Enter username"
              rules={[
                { required: true, errorMessage: "Please input your username!" },
              ]}
            />

            <FormItem name="occupation" label="Occupation" type="text" />
            <FormItem name="motto" label="Motto" type="textarea" />

            <FormItem
              name="bio"
              label="Bio"
              type="textarea"
              rules={[
                { required: true, errorMessage: "Please input this field!" },
              ]}
            />

            <div className="button-section">
              <Button type="submit" variant="primary">
                Submit
              </Button>
              <Button type="reset" variant="secondary">
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* 20. VALIDATION MESSAGES */}
      <div className="form-container">
        <Header
          heading="Validation Messages"
          description="Customize validate message template with validateMessages"
        />
        <Form
          name="validation-messages-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={{
            required: "${label} is required!",
            pattern: "${label} is not valid.",
            email: "${label} must be a valid email address.",
          }}
        >
          <FormItem
            name="username"
            label="Username"
            type="text"
            rules={[{ required: true }]}
          />

          <FormItem
            name="email"
            label="Email"
            type="email"
            rules={[{ required: true }]}
          />
          <FormItem name="age" label="Age" type="number" />
          <FormItem name="website" label="Website" type="url" />
          <FormItem name="introduction" label="Introduction" type="textarea" />

          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>

      {/* 21. OTHER FORM CONTROLS */}
      <div className="form-container">
        <Header
          heading="Other Form Controls"
          description="Demonstration of validation configuration for form controls"
        />
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            "input-number": 3,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
            "color-picker": null,
          }}
        >
          <FormItem label="Plain Text">
            <span className="">China</span>
          </FormItem>
          <FormItem
            name="select"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: "Please select ypur country" }]}
          >
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </FormItem>
          <FormItem
            name="select-multiple"
            label="Select[multiple]"
            rules={[
              {
                required: true,
                message: "Please select your favourite colors!",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Please select favourite colors"
            >
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </FormItem>
          <FormItem label="InputNumber" name="input-number">
            <InputNumber min={1} max={10} />

            <span>machines</span>
          </FormItem>
          <FormItem name="switch" label="Switch" valuePropName="checked">
            <Switch />
          </FormItem>
          <FormItem name="slider" label="Slider">
            <Slider
              marks={{
                0: "A",
                20: "B",
                40: "C",
                60: "D",
                80: "E",
                100: "F",
              }}
            />
          </FormItem>
          <FormItem name="radio-group" label="Radio.Group">
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem
            name="radio-button"
            label="Radio.Button"
            rules={[{ required: true, message: "Please pick an item!" }]}
          >
            <Radio.Group>
              <Radio.Button value="a">item 1</Radio.Button>
              <Radio.Button value="b">item 2</Radio.Button>
              <Radio.Button value="c">item 3</Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem name="checkbox-group" label="Checkbox.Group">
            <Checkbox.Group>
              <Row>
                <Col span={8}>
                  <Checkbox value="A" style={{ lineHeight: "32px" }}>
                    A
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="B" style={{ lineHeight: "32px" }} disabled>
                    B
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="C" style={{ lineHeight: "32px" }}>
                    C
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="D" style={{ lineHeight: "32px" }}>
                    D
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="E" style={{ lineHeight: "32px" }}>
                    E
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="F" style={{ lineHeight: "32px" }}>
                    F
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </FormItem>
          <FormItem name="rate" label="Rate">
            <Rate />
          </FormItem>
          <FormItem
            name="color-picker"
            label="ColorPicker"
            rules={[{ required: true, message: "color is required!" }]}
          >
            <ColorPicker />
          </FormItem>
          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>

      {/* 22. GETVALUEPROPS + NORMALIZE */}
      <div className="form-container">
        <Header
          heading="getValueProps + normalize"
          description="By combining getValueProps and normalize, it is possible to convert the format of value, such as converting the timestamp into a dayjs object and then passing it to the DatePicker."
        />
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <FormItem
            name="dob"
            label="Date of Birth"
            getValueProps={(value) => ({
              value: value && dayjs(Number(value)),
            })}
            normalize={(value) => value && `${dayjs(value).valueOf()}`}
          >
            <DatePicker />
          </FormItem>
          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>

      {/* PROPS EXAMPLE */}
      {/* 23. HIDDEN PROP */}
      <div className="form-container">
        <Header
          heading="Hidden"
          description="The hidden prop in FormItem is used to conditionally hide a form field without removing it from the form's data structure or validation."
        />
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <FormItem name="employeeName" type="text" label="Employee Name" />
          <FormItem name="employeeCode" type="text" label="Employee Code" />
          <FormItem name="employeeAddress" type="textarea" label="Address" />
          <FormItem name="secretCode" label="Secret Code" hidden={true} />
          <div className="button-section">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default App;
