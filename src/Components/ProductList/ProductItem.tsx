import { Avatar, Box, Grid, Typography } from '@mui/material'
import { Product, ProductsCheckout } from '../../Types/Product'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import theme from '../../theme'
import { useState, useEffect } from 'react'

interface ProductProps {
  product: Product
  updateCheckout: (checkoutProduct: ProductsCheckout) => void
}

export default function ProductItem({ product, updateCheckout }: ProductProps) {
  const [quantity, setQuantity] = useState<number>(0)

  useEffect(() => {
    updateCheckout({ product: product, quantity: quantity })
  }, [quantity])

  return (
    <Grid
      item
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='69px'
      mb={4}
      xs={4}
      sx={{
        [theme.breakpoints.down('sm')]: {
          maxWidth: '100%',
          minWidth: '100%',
        },
      }}
    >
      <Avatar
        alt={product.name}
        sx={{
          backgroundColor: 'white',
          border: '4px solid #6A52FF',
          width: 61,
          height: 61,
        }}
      />
      <Typography variant='body2' fontWeight={800}>
        {product.name}
      </Typography>

      <Grid display='flex' flexDirection='row' gap={1}>
        <Typography color='primary' variant='caption'>
          {product.price}
        </Typography>
        <Typography color='primary' variant='caption'>
          {product.currency}
        </Typography>
      </Grid>

      <Grid display='flex' flexDirection='row' gap={1}>
        <Box
          onClick={() => setQuantity((prevState) => prevState + 1)}
          style={{ cursor: 'Pointer' }}
        >
          <AddBoxOutlinedIcon color='primary'></AddBoxOutlinedIcon>
        </Box>
        <Typography variant='body2'> {quantity}</Typography>
        <Box
          onClick={() => setQuantity((prevState) => Math.max(prevState - 1, 0))}
          style={{ cursor: 'Pointer' }}
        >
          <IndeterminateCheckBoxOutlinedIcon color='primary'></IndeterminateCheckBoxOutlinedIcon>
        </Box>
      </Grid>
      <Typography color='text.secondary' variant='caption'>
        quantity
      </Typography>
    </Grid>
  )
}
