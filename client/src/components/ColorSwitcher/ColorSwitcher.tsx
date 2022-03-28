import { useColorMode } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { SunIcon } from "@chakra-ui/icons";

export const ColorSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <IconButton
        colorScheme="gray"
        variant="solid"
        aria-label="Change color theme"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      />
    </div>
  );
};
