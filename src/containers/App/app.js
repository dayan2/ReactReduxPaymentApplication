import React, { Component } from "react";
import { connect } from "react-redux";
import { saveCard } from "../../actions/index";
import PaymentForm from "../../Components/PaymentForm/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.saveCard = this.saveCard.bind(this);
  }

  saveCard(card) {    
    this.props.saveCard(card);
  }
  
  render() {
    return (
        <PaymentForm saveCard={this.saveCard} />
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        saveCard: card => dispatch(saveCard(card))
    };
}
export default connect(null, mapDispatchToProps)(App);