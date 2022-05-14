import { Center } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

export const LoadingScreen = () => {
  return (
    <Center h="100vh">
      <Spinner />
    </Center>
  );
};
