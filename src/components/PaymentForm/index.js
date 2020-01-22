import React, {Component} from 'react';
import { Form, Button, Row, Col, ButtonToolbar, Alert } from 'react-bootstrap';
import Loading from '../Loading/index';
import '../../style.css';
import amex from './icons/icons/amex.svg';
import mastercard from './icons/icons/mastercard.svg';
import diners from './icons/icons/diners.svg';
import visa from './icons/icons/visa.svg';
import discover from './icons/icons/discover.svg';
import SVG from 'react-inlinesvg';

export default class PaymentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        isInitial: true,
        isVisaCard: false,
        isMaster: false,
        isDiner: false,
        isDiscover: false,
        isAmex: false,
        isCreditNumberValid: true,
        isCIDValid: true,
        cardNumber: "",
        name: "",
        expiryYear: "2020",
        expiryMonth: "January",
        CID: "",
        years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]        
      }
      this.handleSelectYear = this.handleSelectYear.bind(this);
      this.handleSelectMonth = this.handleSelectMonth.bind(this);
      this.onCardNumberChange = this.onCardNumberChange.bind(this);
      this.onNameChange = this.onNameChange.bind(this);
      this.onCIDChange = this.onCIDChange.bind(this);
      this.submit = this.submit.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    // if (this.props.val !== prevProps.val) {
    //   this.getCustomerDetails(this.props.val)
    // }
  }

  handleSelectYear(event) {
    if(event && event.target){
      this.setState({ expiryYear: event.target.value, isInitial: false });
    }
  }

  handleSelectMonth(event) {    
    if(event && event.target){
      this.setState({ expiryMonth: event.target.value, isInitial: false });
    }
  }

  checkValidCreditNumber (cardNo) {
    
    var s = 0;
    var doubleDigit = false;
    for (var i = cardNo.length - 1; i >= 0; i--) {
        var digit = +cardNo[i];
        if (doubleDigit) {
            digit *= 2;
            if (digit > 9)
                digit -= 9;
        }
        s += digit;
        doubleDigit = !doubleDigit;
    }
    return s % 10 == 0;
  }

  onCardNumberChange(cardNumber){
    
    if(cardNumber){
      cardNumber = cardNumber.trim();
      const isCreditNumberValid = this.checkValidCreditNumber(cardNumber);
      debugger;
      if(cardNumber.slice(0,1) == "4" && cardNumber.length <= 16){
        //Visa
        this.setState({cardNumber, isCreditNumberValid, isInitial: false, isAmex: false, isVisaCard: true, isMaster: false, isDiner: false, isDiscover: false}); 
      }
      else if(cardNumber.slice(0,2) == "34" || cardNumber.slice(0,2) == "37" && cardNumber.length <= 16){       
        //American express
        this.setState({cardNumber, isCreditNumberValid, isInitial: false, isAmex: true, isVisaCard: false, isMaster: false, isDiner: false, isDiscover: false});        
      }      
      else if((cardNumber.slice(0,2) == "51" || cardNumber.slice(0,2) == "52"|| cardNumber.slice(0,2) == "53"|| cardNumber.slice(0,2) == "54"|| cardNumber.slice(0,2) == "55")  && cardNumber.length <= 16){
        //Master card
        this.setState({cardNumber, isCreditNumberValid, isInitial: false, isAmex: false, isVisaCard: false, isMaster: true, isDiner: false, isDiscover: false}); 
      }
      else if((cardNumber.slice(0,4) == "6011" || cardNumber.slice(0,1) == "5") && cardNumber.length <= 16){
        //Discover
        this.setState({cardNumber, isCreditNumberValid, isInitial: false, isAmex: false, isVisaCard: false, isMaster: false, isDiner: false, isDiscover: true});
      } 
      else if((cardNumber.slice(0,3) == "300" || cardNumber.slice(0,3) == "301"|| cardNumber.slice(0,3) == "302"|| cardNumber.slice(0,3) == "303"|| cardNumber.slice(0,3) == "304"|| cardNumber.slice(0,3) == "305" || cardNumber.slice(0,3) == "36" || cardNumber.slice(0,3) == "38") && cardNumber.length <=14 ){
        //Diners club
        this.setState({cardNumber, isCreditNumberValid, isInitial: false, isAmex: false, isVisaCard: false, isMaster: false, isDiner: true, isDiscover: false});
      }
      else{        
        this.setState({cardNumber, isCreditNumberValid, isInitial: false, isAmex: false, isVisaCard: false, isMaster: false, isDiner: false, isDiscover: false});  
      }
    } else{        
      this.setState({cardNumber, isAmex: false, isVisaCard: false, isMaster: false, isDiner: false, isDiscover: false});  
    }   

    const isCreditNumberValid = this.checkValidCreditNumber(cardNumber);
  }

  onNameChange(name){    
      this.setState({name, isInitial: false});
  }

  onCIDChange(CID){      
    const cvvCheck3 =/^[0-9]{3}$/;
    const cvvCheck4 =/^[0-9]{4}$/;
    const {  
      isVisaCard, 
      isMaster, 
      isDiner, 
      isDiscover, 
      isAmex
    } = this.state; 
    debugger; 
    if((isVisaCard && cvvCheck3.test(CID)) ||
    (isMaster && cvvCheck3.test(CID)) ||
    (isDiner && cvvCheck3.test(CID)) ||
    (isDiscover && cvvCheck3.test(CID)) ||
    (isAmex && cvvCheck4.test(CID))){
      this.setState({CID, isInitial: false, isCIDValid: true});
    }else{
      this.setState({CID, isInitial: false, isCIDValid: false});
    }
  }

  submit() {    
    const { cardNumber, name, expiryYear, expiryMonth, CID } = this.state;
    this.props.saveCard({cardNumber, name, expiryYear, expiryMonth, CID});
    this.setState({isLoading: true});  
  }

  render() {   
    const { 
      cardNumber, 
      name, 
      CID, 
      years,
      months, 
      isLoading, 
      isInitial, 
      isVisaCard, 
      isMaster, 
      isDiner, 
      isDiscover, 
      isAmex, 
      isCreditNumberValid,
      isCIDValid 
    } = this.state;
    
    if(isLoading){
      return (
        <article>
          <div className="home-page">
            <section className="centered">
              <h2>Payment Processing</h2>
            </section>
            <Loading { ...{loading: true} } />
          </div>
        </article>
      );
    }

    let logo;
    if (isAmex) {
      logo = amex;
    } else if(isVisaCard) {
      logo = visa;
    }else if(isMaster) {
      logo = mastercard;
    }else if(isDiner) {
      logo = diners;
    }else if(isDiscover) {
      logo = discover;
    }

    return (<div className="row">
        <div className="col-md-11">
          {(!cardNumber || !name || !CID) && !isInitial && isCreditNumberValid && isCIDValid ?
            <Alert key={1} variant="danger">
              Please fill in the required fields.
            </Alert>
          :""}
          {!isCreditNumberValid ?
            <Alert key={1} variant="danger">
              This card number is not valid.
            </Alert>
          :""}
          {!isCIDValid && isCreditNumberValid ?
            <Alert key={1} variant="danger">
              Security code length not matched.
            </Alert>
          :""}
            <Form>
                <Form.Group as={Row} controlId="number">
                    <Form.Label column sm="3">
                    Card Number
                    </Form.Label>
                    <Col sm="7">
                    <Form.Control type="text" placeholder="Card Number" value={cardNumber} onChange={e => this.onCardNumberChange(e.target.value)} />
                    </Col>
                    <Col sm="2">
                    {logo && <SVG src={logo} />}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="name">
                    <Form.Label column sm="3">
                    Name on card
                    </Form.Label>
                    <Col sm="8">
                    <Form.Control type="text" placeholder="Name on card" value={name} onChange={e => this.onNameChange(e.target.value)} />
                    </Col>
                    <Col sm="1">
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="month">
                    <Form.Label column sm="3">
                    Expiry Month
                    </Form.Label>
                    <Col sm="4">
                      <Form.Control as="select" onChange={this.handleSelectMonth}>
                      {months.map((opt, i) => (
                          <option key={i} >{opt}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col sm="5">
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="year">
                    <Form.Label column sm="3">
                    Expiry Year
                    </Form.Label>
                    <Col sm="4">
                      <Form.Control as="select" onChange={this.handleSelectYear}>
                      {years.map((opt, i) => (
                          <option key={i} >{opt}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col sm="5">
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="cid">
                    <Form.Label column sm="3">
                    CID
                    </Form.Label>
                    <Col sm="3">
                    <Form.Control type="text" placeholder="" value={CID} onChange={e => this.onCIDChange(e.target.value)} />
                    </Col>
                    <Col sm="6">
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="cid">
                <Col sm="1"></Col>
                <Col sm="10">
                <Button variant="secondary" size="lg" block disabled={!name || !cardNumber || !CID || !isCreditNumberValid || !isCIDValid } onClick={this.submit}>
                  Pay Now
                </Button>
                </Col>
                <Col sm="1">
                </Col>
                </Form.Group>
            </Form>
        </div>
    </div>)
  }
}
