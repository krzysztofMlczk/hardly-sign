import {
  VStack,
  HStack,
  PinInput,
  PinInputField,
  Button,
} from "@chakra-ui/react";
import {} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import {
  resetSteps,
  validateAuthorizationCode,
  select,
} from "../LoginPage.slice";

export const PinStep = () => {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(select.isSubmitting);

  return (
    <VStack spacing={4}>
      <PinForm isSubmitting={isSubmitting} />
      <Button
        variant="outline"
        colorScheme="teal"
        size="xs"
        disabled={isSubmitting}
        onClick={() => dispatch(resetSteps())}
      >
        Back
      </Button>
    </VStack>
  );
};

export const PinForm = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const dispatch = useAppDispatch();

  const onComplete = (value: string) => {
    console.log(value);
    dispatch(validateAuthorizationCode(value));
  };
  return (
    <HStack>
      {/* otp - One Time Password */}
      <PinInput otp mask isDisabled={isSubmitting} onComplete={onComplete}>
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
        <PinInputField />
      </PinInput>
    </HStack>
  );
};
