import {
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  VStack,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { requestAuthorizationCode, select } from "../LoginPage.slice";

import { Formik, Form, useField, FieldHookConfig } from "formik";
import { Link } from "react-router-dom";

export const EmailStep = () => {
  const isSubmitting = useAppSelector(select.isSubmitting);
  return (
    <VStack spacing={4}>
      <EmailForm isSubmitting={isSubmitting} />
      <Link to="/about">
        <Button colorScheme="teal" variant="outline" size="sm">
          About Us
        </Button>
      </Link>
    </VStack>
  );
};

interface Credentials {
  email: string;
  password: string;
}

const EmailForm = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const dispatch = useAppDispatch();

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "E-mail required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validatePassword = (value: string) =>
    !value ? "Password required" : undefined;

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values: Credentials) => {
        dispatch(requestAuthorizationCode(values));
      }}
    >
      <Form>
        <VStack spacing={4}>
          <CustomField
            name="email"
            type="email"
            placeholder="E-mail"
            disabled={isSubmitting}
            validate={validateEmail}
          />
          <CustomField
            name="password"
            type="password"
            placeholder="password"
            disabled={isSubmitting}
            validate={validatePassword}
          />
          <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
            Request code
          </Button>
        </VStack>
      </Form>
    </Formik>
  );
};

type CustomFieldProps = {
  type: "email" | "password";
  placeholder: string;
};

// Takes the same props as Formik Field component + input placeholder
const CustomField = ({
  type,
  placeholder,
  ...props
}: CustomFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <Input
        {...field}
        type={type}
        disabled={props.disabled}
        placeholder={placeholder}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
