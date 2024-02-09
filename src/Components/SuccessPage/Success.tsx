import { Grid, Typography } from '@mui/material'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import SuccessProductItem from './SuccessProductItem'
import { useCheckoutProductsState } from '../context/context'
import { ProductsCheckout } from '../../Types/Product'

export default function SuccessPage() {
  const { checkoutProducts } = useCheckoutProductsState() || {};
  return (
    <Grid container display='flex' justifyContent='center'>
      <Grid display='flex' flexDirection='column' gap={2} mt={16} maxWidth={'700px'}>
        <Grid xs={12} item>
          <Typography align='center' variant='h4' fontWeight={800}>
            Success
          </Typography>
        </Grid>
        <Grid xs={12} item alignItems='center' display='flex' flexDirection='column'>
          <CheckCircleOutlineOutlinedIcon fontSize='large' color='success' />
        </Grid>
        <Grid xs={12} item mb={4}>
          <Typography align='center' variant='body2' color='text.secondary'>
            Thank you for shopping with us
          </Typography>
        </Grid>
        <Grid container alignItems="center" spacing={2}>
          {checkoutProducts && checkoutProducts.map((product: ProductsCheckout, index: number) => (
            <Grid item key={index}>
              <SuccessProductItem holder={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
