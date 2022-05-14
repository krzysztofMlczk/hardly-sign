import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  StackDivider,
  Text,
  HStack,
  Flex,
  Box,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  EditIcon,
  SettingsIcon,
  LinkIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { logout, toggleDrawer, select } from "../App/App.slice";
import { ProfileInfo } from "./ProfileInfo";
import { ColorSwitcher } from "../ColorSwitcher/ColorSwitcher";
import { User } from "../../types/user";

type DrawerOption = {
  label: string;
  destinationRoute: string; // TODO: make separate type/enum for accessible routes in the application
  icon: JSX.Element;
};

const drawerOptions: DrawerOption[] = [
  {
    label: "certificates",
    destinationRoute: "/certificates",
    icon: <EditIcon />,
  },
  {
    label: "settings",
    destinationRoute: "/settings",
    icon: <SettingsIcon />,
  },
  {
    label: "localization",
    destinationRoute: "/localization",
    icon: <LinkIcon />,
  },
  {
    label: "visualization",
    destinationRoute: "/visualization",
    icon: <ViewIcon />,
  },
];

export const CustomDrawer = () => {
  const isOpen = useAppSelector(select.isDrawerOpen);
  const user = useAppSelector(select.user) as User;
  const dispatch = useAppDispatch();

  const closeDrawer = () => {
    dispatch(toggleDrawer());
  };

  const onLogout = () => {
    closeDrawer();
    dispatch(logout());
    localStorage.removeItem("token");
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={closeDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <ProfileInfo user={user} />
        </DrawerHeader>
        <DrawerBody>
          <VStack divider={<StackDivider />} spacing={0} align="left">
            {drawerOptions.map(({ label, destinationRoute, icon }) => (
              <DrawerOption
                label={label}
                destinationRoute={destinationRoute}
                icon={icon}
                onClick={closeDrawer}
              />
            ))}
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <HStack>
            <Button
              variant="outline"
              onClick={onLogout}
              leftIcon={<ArrowBackIcon />}
            >
              Logout
            </Button>
            <ColorSwitcher />
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const DrawerOption = ({
  label,
  destinationRoute,
  icon,
  onClick,
}: DrawerOption & { onClick: () => void }) => {
  return (
    <Link to={destinationRoute} onClick={onClick}>
      <Flex alignItems="center" py={2} gap={2}>
        <Box opacity={0.6}>{icon}</Box>
        <Text casing="capitalize">{label}</Text>
      </Flex>
    </Link>
  );
};
