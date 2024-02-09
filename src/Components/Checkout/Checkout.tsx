import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Box,
  Button,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import theme from '../../theme';
import { useNavigate } from 'react-router-dom';
import { useCheckoutProductsState } from '../context/context';
import { ProductsCheckout, CreditCardValues } from '../../Types/Product';
import CheckoutItem from './CheckoutItem';
import Validator, { ErrorKeys } from '../../Helpers/Validator';
import Formatter, { FormatterInterface } from '../../Helpers/Formatter';
import { ProductHttpService } from '../../Http/Products.http.service'
import { getTotalCost, constructPayment } from '../../Helpers/Utils'


export default function Checkout() {
  const navigate = useNavigate();
  const [displayResponse, setDisplayResponse] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { checkoutProducts } = useCheckoutProductsState() || {};

  const inputRefs: React.RefObject<HTMLInputElement>[] = Array.from(
    { length: 4 },
    () => useRef<HTMLInputElement>(null)
  );
  const formatters = useRef<FormatterInterface[]>([]);

  const [controlledFormValues, setControlledFormValues] =
    useState<CreditCardValues>({
      email: '',
      cardNumber: '',
      cardDate: '',
      cardCvc: '',
    });

  const [validationErrors, setValidationErrors] = useState<ErrorKeys | null>(null)
  const validator = new Validator(controlledFormValues);

  const handleStateValueChange = (key: string, value: string): void => {
    setControlledFormValues((prevState: CreditCardValues) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    formatters.current = inputRefs
      .filter((ref) => ref.current !== null)
      .map((ref) => new Formatter(ref.current!));

    return () => formatters.current.forEach((formatter) => formatter.cleanUp());
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((prevState) => !prevState)
    validator.validate()
    setValidationErrors(validator.errors)
    if (validator.allNull() && checkoutProducts) {
      const payment = constructPayment(checkoutProducts!, controlledFormValues);
      try {
        const res = await ProductHttpService.buyProducts(payment);
        if (res.status >= 200 && res.status <= 299) {
          navigate('/thanks', { state: { successPageProps: payment.products } })
        }
      } catch (error) {
        setDisplayResponse(true)
      } finally {
        setIsLoading((prevState) => !prevState)
      }
    }
  };


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
        <Grid container spacing={2}>
          {checkoutProducts && checkoutProducts.map((checkoutProduct: ProductsCheckout, index: number) => (
            <Grid item key={index}>
              <CheckoutItem holder={checkoutProduct} />
            </Grid>
          ))}
        </Grid>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)} style={{ maxWidth: '450px' }}>
          <Grid xs={12} item display='flex' flexDirection='column' gap={2} mt={4}>
            <Typography fontWeight={800}>Email</Typography>
            <TextField
              inputRef={inputRefs[0]}
              onChange={() => handleStateValueChange('email', formatters.current !== null ? formatters.current[0].formattedText : '')}
              placeholder='email@domain.com'
              value={controlledFormValues.email}
              id='email'
              variant='outlined'
            />
            {validationErrors?.email && <Typography color='error'>{validationErrors.email}</Typography>}
            <Typography fontWeight={800}>Card Information</Typography>
            <TextField
              id='cardNumber'
              inputRef={inputRefs[1]}
              variant='outlined'
              placeholder='____-____-____-____'
              onChange={() => handleStateValueChange('cardNumber', formatters.current !== null ? formatters.current[1].formattedText : '')}
              inputProps={{
                maxLength: 19,
              }}
              value={controlledFormValues.cardNumber}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    (
                    <Box
                      display={formatters.current[1] && formatters.current[1].cardType === 'Visa' ? 'none' : 'initial'}
                      component='img'
                      ml={1}
                      src='mastercard.svg'
                      sx={{ width: '20px' }}
                    />
                    <Box
                      display={formatters.current[1] && formatters.current[1].cardType === 'MasterCard' ? 'none' : 'initial'}
                      component='img'
                      src='visa.svg'
                      sx={{ width: '20px' }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            {validationErrors?.cardNumber && <Typography color='error'>{validationErrors.cardNumber}</Typography>}
            <Grid container>
              <Grid xs={6} item>
                <TextField
                  id='cardDate'
                  placeholder='MM/YY'
                  variant='outlined'
                  value={controlledFormValues.cardDate}
                  inputRef={inputRefs[2]}
                  onChange={() => handleStateValueChange('cardDate', formatters.current !== null ? formatters.current[2].formattedText : '')}
                  fullWidth
                  inputProps={{
                    maxLength: 5,
                  }}
                />
                {validationErrors?.date && <Typography color='error'>{validationErrors.date}</Typography>}
              </Grid>
              <Grid xs={6} item>
                <TextField
                  id='cardCvc'
                  placeholder='___'
                  value={controlledFormValues.cardCvc}
                  variant='outlined'
                  inputRef={inputRefs[3]}
                  onChange={() => handleStateValueChange('cardCvc', formatters.current !== null ? formatters.current[3].formattedText : '')}
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
                {validationErrors?.cvcNumber && <Typography color='error'>{validationErrors.cvcNumber}</Typography>}
              </Grid>
            </Grid>
            <Grid xs={12} item justifyContent='center' display='flex' mt={4}>
              {isLoading ? <CircularProgress /> :
                <Button variant='contained' color='secondary' type='submit'>
                  Pay {getTotalCost(checkoutProducts ? checkoutProducts : [])} TBH
                </Button>}
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
  );
}
