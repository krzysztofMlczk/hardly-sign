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
        colorScheme="blue"
        aria-label="Search database"
        variant="outline"
        icon={<HamburgerIcon />}
      />
      YOUR DOCUMENTS
    </div>
  );
};
