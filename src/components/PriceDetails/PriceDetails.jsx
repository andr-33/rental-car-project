import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme
} from "@mui/material"

import { useLanguage } from "../../contexts/LanguageContext";
import { useOverview } from "../../contexts/OverViewContext";
import { useEffect } from "react";

const PriceDeatils = () => {
  const { translation } = useLanguage();
  const { overview, updateOverview } = useOverview();

  const theme = useTheme();

  const products = [
    {
      name: translation('insurance'),
      desc: translation('insuranceDesc'),
      price: '$30',
      value: 30,
    },
    {
      name: translation('gas'),
      desc: translation('gasDesc'),
      price: '$15',
      value: 15,
    },
    {
      name: translation('cleaningService'),
      desc: translation('cleaningServiceDesc'),
      price: translation('free'),
      value: 0,
    },
  ];

  useEffect(() => {
    const extraCharges = products.reduce((acc, product) => acc + product.value, 0);
    updateOverview('extra_charges', extraCharges);
    const total = (overview.base_price || 0) + extraCharges;
    updateOverview('total_amount', total);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        width: '100%',
        borderRadius: 3,
        p: 2,
        border: '1px solid #ccc',
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ mb: 1 }}
      >
        {overview.model}{" "}
        <Typography
          component="span"
          variant="h6"
          fontWeight="normal"
        >
          ({translation("orSimilar")})
        </Typography>
      </Typography>

      <List disablePadding>
        {products.map((product) => (
          <ListItem disablePadding key={product.name} sx={{ px: 0 }}>
            <ListItemText
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "1em",
              color: theme.palette.text.secondary,
              fontWeight: 'medium'
            }}
          >
            {translation('extraCharges')}: ${overview.extra_charges}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "1em",
              color: theme.palette.text.secondary,
              fontWeight: 'medium'
            }}
          >
            {translation('basePrice')}: ${overview.base_price}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 'medium', fontSize: "1.5em" }}>
            Total: ${overview.total_amount}
          </Typography>
        </Box>
      </Box>

    </Box>
  );
};

export default PriceDeatils;