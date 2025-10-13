import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import axios from "axios";

const LoginForm = () => {
  const [ loginValues, setLoginValues ] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { translation } = useLanguage();
  const { saveToken } = useAuth();
  const { updateNotification, openNotification } = useNotification();


  const handleOnChange = (e) => {
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/user/login", loginValues);
      saveToken(response.data.sessionToken);
      navigate("/");
    } catch (error) {
      console.error(error.response.data.error.message);
      updateNotification(error.response.data.error.code, "error");
      openNotification();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FormControl>
        <FormLabel>{translation("email")}</FormLabel>
        <TextField
          name="email"
          type="email"
          required
          fullWidth
          placeholder={translation("emailPlaceholder")}
          onChange={handleOnChange}
          value={loginValues.email}
        />
      </FormControl>
      <FormControl>
        <FormLabel>{translation("password")}</FormLabel>
        <TextField
          name="password"
          type="password"
          required
          fullWidth
          placeholder="••••••"
          onChange={handleOnChange}
          value={loginValues.password}
        />
      </FormControl>
      <Button
        variant="contained"
        fullWidth
        type="submit"
      >
        {translation("login")}
      </Button>
      <Typography textAlign={"center"}>
        <Link
          sx={{
            cursor: "pointer"
          }}
        >
          {translation("forgotPassword")}
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;