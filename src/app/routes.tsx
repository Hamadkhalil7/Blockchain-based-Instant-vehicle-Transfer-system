import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { LoginRegister } from "./components/LoginRegister";
import { SellerDashboard } from "./components/SellerDashboard";
import { InitiateTransfer } from "./components/InitiateTransfer";
import { BuyerDashboard } from "./components/BuyerDashboard";
import { OfficerDashboard } from "./components/OfficerDashboard";
import { OwnershipCertificate } from "./components/OwnershipCertificate";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginRegister,
  },
  {
    path: "/seller-dashboard",
    Component: SellerDashboard,
  },
  {
    path: "/initiate-transfer",
    Component: InitiateTransfer,
  },
  {
    path: "/buyer-dashboard",
    Component: BuyerDashboard,
  },
  {
    path: "/officer-dashboard",
    Component: OfficerDashboard,
  },
  {
    path: "/certificate/:id",
    Component: OwnershipCertificate,
  },
]);
