import { Flex, Avatar, Box, Text, Badge } from "@chakra-ui/react";
import type { User } from "../../types/user";

type Props = {
  user: User;
};

export const ProfileInfo = ({ user }: Props) => {
  return (
    <Flex>
      <Avatar src={""} />
      <Box ml="3">
        <Text fontWeight="medium" fontSize="lg">
          {`${user.firstName} ${user.lastName}`}
          <Badge ml="1" colorScheme="green">
            Auth
          </Badge>
        </Text>
        <Text fontWeight="light" fontSize="xs" opacity={0.7}>
          {user.email}
        </Text>
      </Box>
    </Flex>
  );
};
