import React from "react";
import { signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

const Logout = ({ setIsAuth }) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(
          user.isAnonymous || !user.displayName ? "ゲスト" : user.displayName
        );
      }
    });
    return () => unsubscribe();
  }, []);
  const navigate = useNavigate();
  const logout = () => {
    //Googleでログイン
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };
  return (
    <>
      <Box
        sx={{
          color: "#544b39",
          fontSize: { xs: "14px", sm: "16px", md: "20px" },
          textAlign: "center",
        }}
      >
        <Box sx={{ mt: "50px" }}>
          <Typography>こんにちは！</Typography>
          <Typography>{userName}さん</Typography>
        </Box>
        <Box sx={{ mt: "20px" }}>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { xs: "16px", sm: "18px", md: "22px" },
            }}
          >
            ログアウトする
          </Typography>
          <Button
            onClick={logout}
            variant="contained"
            sx={{
              backgroundColor: "#b4d5c8",
              color: "#544b39",
              mt: "30px",
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
            }}
          >
            ログアウト
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Logout;
