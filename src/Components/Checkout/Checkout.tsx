import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import theme from '../../theme'

export default function Checkout() {
  const [displayResponse, setDisplayResponse] = useState<boolean>()

  const onSubmit = async () => {
    // Validate and submit data ......
  }

  const getTotalCost = (): number => {
    return 0
  }

  return (
    <Grid container display='flex' justifyContent='center'>
      <Grid
        display='flex'
        flexDirection='column'
        gap={2}
        maxWidth={'700px'}
        m={6}
        sx={{
          [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
          },
        }}
      >
        <Grid xs={12} item mb={4}>
          <Typography align='center' variant='h4' fontWeight={800}>
            Checkout
          </Typography>
        </Grid>
        <form onSubmit={onSubmit} style={{ maxWidth: '450px' }}>
          <Grid xs={12} item display='flex' flexDirection='column' gap={2} mt={4}>
            <Typography fontWeight={800}>Email</Typography>
            <TextField id='email' variant='outlined' />
            <Typography fontWeight={800}>Card Information</Typography>
            <TextField
              id='cardNumber'
              variant='outlined'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    (
                    <Box component='img' ml={1} src='mastercard.svg' sx={{ width: '20px' }} />
                    <Box component='img' src='visa.svg' sx={{ width: '20px' }} />)
                  </InputAdornment>
                ),
              }}
            />

            <Grid container>
              <Grid xs={6} item>
                <TextField
                  id='cardDate'
                  variant='outlined'
                  fullWidth
                  inputProps={{
                    maxLength: 5,
                  }}
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  id='cardCvc'
                  variant='outlined'
                  fullWidth
                  inputProps={{
                    maxLength: 3,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Box component='img' src='cvc.png' sx={{ width: '20px' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid xs={12} item justifyContent='center' display='flex' mt={4}>
              <Button variant='contained' color='secondary' type='submit'>
                Pay {getTotalCost()} TBH
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Snackbar
        open={displayResponse}
        autoHideDuration={6000}
        onClose={() => setDisplayResponse(false)}
      >
        <Alert severity='error'>Something went wrong. Please try again.</Alert>
      </Snackbar>
    </Grid>
  )
}
