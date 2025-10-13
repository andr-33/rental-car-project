import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"

const products = [
  {
    name: 'Professional plan',
    desc: 'Monthly subscription',
    price: '€15.00',
  },
  {
    name: 'Dedicated support',
    desc: 'Included in the Professional plan',
    price: 'Free',
  },
  {
    name: 'Hardware',
    desc: 'Devices needed for development',
    price: '€69.99',
  },
  {
    name: 'Landing page template',
    desc: 'License',
    price: '€49.99',
  },
];

const PriceDeatils = ({ totalPrice }) => {
  return (
    <>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 0.5, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Typography variant='subtitle2'>Total</Typography>
      <Typography variant="h5">
        {totalPrice} €
      </Typography>
    </>
  );
};

export default PriceDeatils;