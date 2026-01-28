import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = ({ isAuth }) => {
  return (
    <AppBar
      position="static"
      component="nav"
      sx={{
        backgroundColor: "#b4d5c8",
        fontfontSize: { xs: "14px", sm: "16px", md: "20px" },
      }}
    >
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Typography>
          <Link to="/">ホーム</Link>
        </Typography>

        {!isAuth ? (
          <Typography>
            <Link to="/login">ログイン</Link>
          </Typography>
        ) : (
          <>
            <Typography>
              <Link to="/logout">ログアウト</Link>
            </Typography>
            <Typography>
              <Link to="/createpost">日記を書く</Link>
            </Typography>
            <Typography>
              <Link to="/Todo">やることリスト</Link>
            </Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
