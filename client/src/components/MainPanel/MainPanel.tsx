import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
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
          <Uploader />
        </TabPanel>
        <TabPanel>
          <p>Verification Panel</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
