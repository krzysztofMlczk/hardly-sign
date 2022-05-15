import { CustomDrawer } from "../../Drawer/Drawer";
import { MainPanel } from "../../MainPanel/MainPanel";
import { TopBar } from "../../TopBar/TopBar";

export const DashboardPage = () => {
  return (
    <>
      <TopBar />
      <CustomDrawer />
      <MainPanel />
    </>
  );
};
