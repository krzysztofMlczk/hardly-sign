import { Center, VStack, Text } from "@chakra-ui/react";
import { MultiStepLoginForm } from "./MultiStepLoginForm/MultiStepLoginForm";
// TODO: Implement Logout mechanism
// TODO: Implement Auth Code validation call to backend
export const LoginPage = () => {
  return (
    <>
      <Center h="80vh">
        <VStack spacing={4}>
          <Text fontSize="2xl" as="kbd">
            Login
          </Text>
          <MultiStepLoginForm />
        </VStack>
      </Center>
    </>
  );
};
