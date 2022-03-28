import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "../../state/hooks";
import { toggleDrawer } from "../App/App.slice";

export const TopBar = () => {
  const dispatch = useAppDispatch();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <IconButton
        onClick={() => dispatch(toggleDrawer())}
        colorScheme="gray"
        aria-label="Open drawer"
        icon={<HamburgerIcon />}
      />
      YOUR DOCUMENTS
    </div>
  );
};
