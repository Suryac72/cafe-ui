import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

interface HeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, buttonText, onButtonClick }) => {
  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5">{title}</Typography>
        {buttonText && onButtonClick && (
          <Button variant="contained" onClick={onButtonClick}>
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Header;
