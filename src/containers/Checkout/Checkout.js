import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state={
  	ingredients: this.props.location.state.ingredients
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {

    return (
		<div>
			<CheckoutSummary 
        ingredients={this.state.ingredients}
        onCheckoutCancelled={this.checkoutCancelledHandler}
        onCheckoutContinued={this.checkoutContinuedHandler}/>
		</div>     
    );
  }
}

export default Checkout;