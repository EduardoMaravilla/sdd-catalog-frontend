import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { AuthenticationProvider } from "./context/auth/AuthenticationProvider.tsx";
import { LoadBasicDataProvider } from "./context/load-basic-data/LoadBasicDataProvider.tsx";
import { CarConfigurationProvider } from "./context/config-car/CarConfigurationProvider.tsx";
import { LoadProfileDataProvider } from "./context/profile-data/LoadProfileDataProvider.tsx";
import "./utils/i18n.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/styles/SideBarLeft.css";
import "./assets/styles/NavBarMobile.css";
import "./assets/styles/CheckIcon.css";
import "./assets/styles/MainRoot.css";
import "./assets/styles/loginPage.css";
import "./assets/styles/profilePage.css";
import "./assets/styles/CreateBuildPage.css";
import "./assets/styles/PersonalBuildPage.css";
import "./assets/styles/HomePage.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter future={{ v7_startTransition: true }}>
    <StrictMode>
      <AuthenticationProvider>
        <LoadBasicDataProvider>
          <CarConfigurationProvider>
            <LoadProfileDataProvider>
              <App />
            </LoadProfileDataProvider>
          </CarConfigurationProvider>
        </LoadBasicDataProvider>
      </AuthenticationProvider>
    </StrictMode>
  </BrowserRouter>
);
