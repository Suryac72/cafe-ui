import {
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Setting, getJwtToken, logout } from "../../shared/utils";
import { deepOrange } from "@mui/material/colors";

interface AvatarProps {
  settings: Setting[];
  avatarText?:string;
}

const NavAvatar = ({ settings,avatarText }: AvatarProps) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (route: string) => {
    console.log(route);
    if (route === "/") {
      const { userData } = getJwtToken();
      logout(userData);
    }
    navigate(route);
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar  sx={{ bgcolor: deepOrange[500] }} >{avatarText}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, key) => (
          <MenuItem
            key={key}
            onClick={() => handleCloseUserMenu(setting.route)}
          >
            <Link to={setting.route}>
              <Typography textAlign="center">{setting.label}</Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default NavAvatar;
