import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  useTheme
} from "@mui/material";

import { useLanguage } from "../contexts/LanguageContext";

import HomeAppBar from "../components/HomeAppBar/HomeAppBar";

const Auth = () => {
  const { translation } = useLanguage();
  const theme = useTheme();

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}>
      <HomeAppBar />
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
      }}>
        <Box
          sx={{
            borderRadius: 4,
            border: '1px solid #ccc',
            boxShadow: 6,
            px: 2,
            py: 4,
            bgcolor: theme.palette.background.paper,
            width: {xs: "325px", md: "450px"},
            margin: "0 auto",
          }}
        >
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
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;