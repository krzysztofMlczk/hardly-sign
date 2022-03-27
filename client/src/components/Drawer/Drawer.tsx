import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { toggleDrawer, select } from "../App/App.slice";

export const CustomDrawer = () => {
  const isOpen = useAppSelector(select.isDrawerOpen);
  const dispatch = useAppDispatch();
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={() => dispatch(toggleDrawer())}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Drawer Content</DrawerHeader>
        <DrawerBody></DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
