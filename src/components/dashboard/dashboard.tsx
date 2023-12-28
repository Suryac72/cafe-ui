import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "../navbar/navbar";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { getJwtToken, logout } from "../../shared/utils";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import Toaster from "../toaster/toaster";
import Home from "./components/home";
import Category from "./components/category";
import Product from "./components/product";
import Bill from "./components/bill";
import User from "./components/user";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Dashboard(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [autoHideDuration, setAutoHideDuration] = useState(3000);
  const [alertMessage, setAlertMessage] = useState("");
  const { userData, expired } = getJwtToken();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dashboardItems = [
    {
      label: "Dashboard",
      component: <SpaceDashboardIcon />,
    },
    {
      label: "Manage Category",
      component: <CategoryIcon />,
    },
    {
      label: "Manage Product",
      component: <Inventory2Icon />,
    },
    {
      label: "Manage Order",
      component: <ShoppingCartIcon />,
    },
    {
      label: "View Bill",
      component: <ReceiptLongIcon />,
    },
    {
      label: "Manage Users",
      component: <PeopleAltIcon />,
    },
  ];

  const renderComponent = () => {
    // Add logic to render the component based on the selected item
    switch (selectedItem) {
      case "Dashboard":
        return <Home />;
      case "Manage Category":
        return <Category/>

      case "Manage Product":
        return <Product/>;

      case "Manage Order":
        return <div>Manage Order Component</div>;

      case "View Bill":
        return <Bill/>;

      case "Manage Users":
        return <User/>;

      default:
        return <Home />;
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (label: string) => {
    setSelectedItem(label);
  };

  useEffect(() => {
    if (expired) {
      setIsAlert(true);
      setSeverity("warning");
      setAutoHideDuration(4000);
      setAlertMessage("Session Expired!! Please Login Again!");
      logout(userData);
    }
  }, [expired, userData]);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {dashboardItems.map((items, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={selectedItem === items.label}
              onClick={() => handleListItemClick(items.label)}
            >
              <ListItemIcon>{items.component}</ListItemIcon>
              <ListItemText primary={items.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleClose = () => {
    setIsAlert(false);
  };

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        {isAlert && alertMessage && (
          <Toaster
            isAlert={isAlert}
            severity={severity}
            autoHideDuration={autoHideDuration}
            handleClose={handleClose}
            alertMessage={alertMessage}
          />
        )}
        <Navbar />
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {renderComponent()}
      </Box>
    </Box>
  );
}
