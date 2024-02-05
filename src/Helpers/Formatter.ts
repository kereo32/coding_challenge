/* eslint-disable spaced-comment */
export interface FormatterInterface {
  formattedText: string;
  cardType : string;
  cleanUp : () => void
}

//This class expects an input element and assigns listeners to input and keydown event listeners,
//to format the values on the input fields for user experience, also helps the validation logic later on.

class Formatter implements FormatterInterface {
  private _inputElement: HTMLInputElement;
  private _formattedText = '';
  private _validNumbers = [1,2,3,4,5,6,7,8,9,0]
  private _cardType  = ''

  constructor(inputElement: HTMLInputElement) {
    this._inputElement = inputElement;
    this.init();
  }

  private init() {
    this._inputElement.addEventListener('input', this.handleInputChange);
    this._inputElement.addEventListener('keydown',this.handleKeyboardEvent)
  }

  private handleInputChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    this.formatText(target.value)
  };

  private handleKeyboardEvent = (e : KeyboardEvent) : void => {
    if (e.key === 'Backspace' || e.key === 'Delete'){
      this._formattedText = this._formattedText.slice(0, -1);
    }
  }

  private formatText = (value: string): void => {
    switch (this._inputElement.id) {
      case 'cardNumber' : 
        this.formatCardNumber(value)
        break;
      case 'email' :
        this.formatEmail(value)
        break;
      case 'cardDate' :
        this.formatCardDate(value)
        break;
      case 'cardCvc':
        this.formatCardCvcNumber(value)
        break;
      default : 
        null
    }
  };

  private formatCardNumber = (value: string): void => {
    //I took regex values mostly from Stackoverflow and ChatGPT,
    //It would be Ideal to take a deeper dive and make my own regex values.
    const formattedValue = value.replace(/[^\d]/g, '');
    const chunks = formattedValue.match(/.{1,4}/g);

    if (chunks) {
      this._formattedText = chunks.join('-');
    } else {
      this._formattedText = formattedValue;
    }

  this.checkCardType();
  };

  private formatEmail = (value: string): void => {
    //Splits the email string to 2 'email@domain.com' -> ['email','domain.com']
    //Aim is to disable user from putting multiple before domain part and disable putting multiple .'s at domain part.
    //It would be Ideal to create another array for valid characters to disable using any symbols after domain part.
  const chunks = value.split('@');
  if (chunks.length === 2) {
    const localPart = chunks[0];
    const domainPart = chunks[1];

    if(domainPart.split('.').length-1 > 1 && value.charAt(value.length-1) == '.') return
    
    this._formattedText = `${localPart}@${domainPart}`;
  } else {
    if(this._formattedText.includes('@')) return
    this._formattedText = value;
  }
  };

  private formatCardDate = (value: string): void => {
    //Only accepts members of validNumbers array via checking it with a private function
    //Then formats it in MM/YY format    
    const lastValue = value.charAt(value.length - 1);
  
    if (!this.isValidNumber(lastValue)) return;
  
    if (value.length > 2 && value.split('/').length-1 < 1 ) {
      this._formattedText = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else {
      this._formattedText = value;
    }
  };
  
  
  private formatCardCvcNumber = (value:string):void=>{
    //Same with date, no formatting
    const lastValue = value.charAt(value.length - 1);
    if (!this.isValidNumber(lastValue)) return;

    
    this._formattedText = value;
    
  }

  private isValidNumber = (value:string):boolean=>{
   return this._validNumbers.includes(parseInt(value))
  }

  private checkCardType = () : void => {
    const cardNumberValues = this._formattedText.split('-').join('')
    
    if(/^4/.test(cardNumberValues)){
      this._cardType = 'Visa'
    }
    if(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(cardNumberValues)){
      this._cardType = 'MasterCard'
    }
  }

  

  get formattedText() {
    return this._formattedText;
  }

  get cardType(){
    return this._cardType
  }

  cleanUp = () : void => {
    this._inputElement.removeEventListener('input', this.handleInputChange);
  }
}

export default Formatter;
