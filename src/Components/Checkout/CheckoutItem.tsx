import { Grid, Typography } from '@mui/material';
import { ProductsCheckout } from '../../Types/Product';

interface ProductProps {
  holder: ProductsCheckout;
}

export default function CheckoutItem(props: ProductProps) {
  return (
    <Grid container display='flex' flexDirection='column' justifyContent='space-evenly'>
      <Grid item xs={12}>
        <Typography variant='body2' fontWeight={800}>
          {`${props.holder.product.name}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body2' fontWeight={400}>
          {props.holder.product.price} TBH
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body2' fontWeight={200}>
          Quantity: {props.holder.quantity}
        </Typography>
      </Grid>
    </Grid>
  );
}
