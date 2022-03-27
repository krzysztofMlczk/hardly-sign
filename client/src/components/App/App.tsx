import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { MainPanel } from "../MainPanel/MainPanel";
import { TopBar } from "../TopBar/TopBar";
import { CustomDrawer } from "../Drawer/Drawer";
import theme from "../../utils/chakra/theme";
import { store } from "../../state/store";
import { Provider } from "react-redux";

import { DashboardPage } from "../Pages/DashboardPage/DashboardPage";
import { LoginPage } from "../Pages/LoginPage/LoginPage";
import { RegisterPage } from "../Pages/RegisterPage/RegisterPage";

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
