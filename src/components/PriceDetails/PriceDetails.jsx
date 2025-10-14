import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material"

import { useLanguage } from "../../contexts/LanguageContext";
import { useOverview } from "../../contexts/OverViewContext";

const products = [
  {
    name: 'Professional plan',
    desc: 'Monthly subscription',
    price: '15.00€',
  },
  {
    name: 'Dedicated support',
    desc: 'Included in the Professional plan',
    price: 'Free',
  },
  {
    name: 'Landing page template',
    desc: 'License',
    price: '€49.99',
  },
];

const PriceDeatils = () => {
  const { translation } = useLanguage();
  const { overview } = useOverview();

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
        {overview.car_name}{" "}
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
        <Typography variant="body1" sx={{ fontWeight: 'medium', fontSize: "1.5em"}}>
          Total: {overview.total_amount?.toFixed(2)}€
        </Typography>
      </Box>

    </Box>
  );
};

export default PriceDeatils;