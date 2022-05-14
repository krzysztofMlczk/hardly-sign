import {
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { requestAuthorizationCode, select } from "../LoginPage.slice";

import { Formik, Form, useField, FieldHookConfig } from "formik";

export const EmailStep = () => {
  const isSubmitting = useAppSelector(select.isSubmitting);
  return (
    <VStack spacing={4}>
      <EmailForm isSubmitting={isSubmitting} />
      <Link to="/register">
        <Button
          variant="outline"
          colorScheme="teal"
          size="xs"
          disabled={isSubmitting}
        >
          Register
        </Button>
      </Link>
    </VStack>
  );
};

const EmailForm = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const dispatch = useAppDispatch();

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={() => {
        dispatch(requestAuthorizationCode());
      }}
    >
      <Form>
        <VStack spacing={4}>
          <CustomField
            name="email"
            placeholder="E-mail"
            disabled={isSubmitting}
            validate={validateEmail}
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
  placeholder: string;
};

// Takes the same props as Formik Field component + input placeholder
const CustomField = ({
  placeholder,
  ...props
}: CustomFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && !!meta.error}>
      <Input {...field} disabled={props.disabled} placeholder={placeholder} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
