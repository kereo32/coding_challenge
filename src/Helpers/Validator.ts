/* eslint-disable spaced-comment */

import { CreditCardValues } from '../Types/Product';

export type ErrorKeys = {
    email:string | null,
    date:string | null,
    cardNumber:string | null,
    cvcNumber:string | null
}
//This class validates string values of given parameters and If It sees any errors on strings,
//It updates the _errors object. If no error In the string It updates It with null for me to
//Use the allNull function later to validate values are legit.
class Validator {
  private _email: string;
  private _date: string;
  private _cardNumber: string;
  private _cvcNumber: string;
  private _errors:ErrorKeys

  constructor({ email, cardDate, cardNumber, cardCvc }: CreditCardValues) {
    this._email = email;
    this._cardNumber = cardNumber;
    this._date = cardDate;
    this._cvcNumber = cardCvc;
    this._errors = {
      email : '',
      date:'',
      cardNumber:'',
      cvcNumber:''
    }
  }

  public validate(): void {
    this.validateEmail();
    this.validateCardNumber();
    this.validateCardDate();
    this.validateCvcNumber();
  }

  private validateEmail(): void {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this._email.trim()) {
      this._errors.email = 'Email is required'
    } else if (!emailRegex.test(this._email)) {
      this._errors.email = 'Invalid email format'
    }else{
      this._errors.email = null
    }
  }

  private validateCardNumber(): void {
    const cardNumberRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
    console.log(this._cardNumber,this._cardNumber.trim().split('-').join(''))
    if (!this._cardNumber.trim().split('-').join('')) {
      this._errors.cardNumber = 'Card number is required'
    } else if (!cardNumberRegex.test(this._cardNumber.trim().split('-').join(''))) {
      this._errors.cardNumber = 'Invalid card number format'
    }else{
      this._errors.cardNumber = null
    }
  }

  private validateCardDate(): void {
    const cardDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!this._date.trim()) {
      this._errors.date = 'Card date is required'
    } else if (!cardDateRegex.test(this._date)) {
      this._errors.date = 'Invalid card date format'
    }else{
      this._errors.date = null
    }
  }

  private validateCvcNumber(): void {
    const cvcNumberRegex = /^\d{3}$/;

    if (!this._cvcNumber.trim()) {
      this._errors.cvcNumber = 'CVC number is required'
    } else if (!cvcNumberRegex.test(this._cvcNumber)) {
      this._errors.cvcNumber = 'Invalid CVC number format'
    }else{
      this._errors.cvcNumber = null
    }
  }

  get errors(): ErrorKeys {
    return this._errors;
  }

  public allNull() : boolean {
    if(this._errors.cardNumber !== null) return false
    if(this._errors.email !== null) return false
    if(this._errors.cvcNumber !== null) return false
    if(this._errors.date !== null) return false
    
    return true
  }
}

export default Validator;
