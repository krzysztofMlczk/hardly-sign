import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export const MainPanel = () => {
  return (
    <Tabs isFitted isLazy={true}>
      <TabList>
        <Tab>Sign</Tab>
        <Tab>Verify</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>Signing Panel</p>
        </TabPanel>
        <TabPanel>
          <p>Verification Panel</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
