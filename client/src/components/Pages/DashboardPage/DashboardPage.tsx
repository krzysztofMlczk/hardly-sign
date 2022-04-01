import { CustomDrawer } from "../../Drawer/Drawer";
import { MainPanel } from "../../MainPanel/MainPanel";
import { TopBar } from "../../TopBar/TopBar";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  return (
    <>
      <TopBar />
      <CustomDrawer />
      <MainPanel />
    </>
  );
};
