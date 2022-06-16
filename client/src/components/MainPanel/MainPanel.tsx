import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { OwnerInput } from "../OwnerInput/OwnerInput";
import { Uploader } from "../Uploader/Uploader";

export const MainPanel = () => {
  return (
    <Tabs isFitted isLazy={true}>
      <TabList>
        <Tab>Sign</Tab>
        <Tab>Verify</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Uploader variant="sign" />
        </TabPanel>
        <TabPanel>
          <OwnerInput />
          <Box h="20px"></Box>
          <Uploader variant="verify" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
