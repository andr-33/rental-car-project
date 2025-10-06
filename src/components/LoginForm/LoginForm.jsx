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

import { useLanguage } from "../../contexts/LanguageContext";
import axios from "axios";

const LoginForm = () => {
  const { translation } = useLanguage();

  return (
    <Box
      component="form"
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