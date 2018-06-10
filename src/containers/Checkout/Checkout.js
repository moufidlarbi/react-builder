import React, { Component } from 'react';

import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
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
        ingredients={this.props.ings}
        onCheckoutCancelled={this.checkoutCancelledHandler}
        onCheckoutContinued={this.checkoutContinuedHandler}/>

      <Route path={this.props.match.path + '/contact-data'} render={() => (<ContactData ingredients={this.props.ings} totalPrice={this.props.price}/>)}/>
		</div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps, null)(withRouter(Checkout));