import { Box, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../state/hooks";
import { toggleDrawer } from "../App/App.slice";

export const TopBar = () => {
  const dispatch = useAppDispatch();
  return (
    <Box w="100%" p={2}>
      <IconButton
        onClick={() => dispatch(toggleDrawer())}
        colorScheme="gray"
        aria-label="Open drawer"
        icon={<HamburgerIcon />}
      />
    </Box>
  );
};
