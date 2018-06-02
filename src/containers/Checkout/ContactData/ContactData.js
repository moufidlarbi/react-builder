import React, { Component } from 'react';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state={
     name: '',
     email: '',
     address: {
        street: '',
        postalCode: ''
    }
}
orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients)
} 

render() {
  return (
   <div className={classes.ContactData}>
   <h4>Enter your Contact Information</h4>
   <form>
   <input type="text" name="name" placeholder="Your Name"/>
   <input type="email" name="email" placeholder="Your Email"/>
   <input type="text" name="street" placeholder="Street"/>
   <input type="text" name="postal" placeholder="Postal Code"/>
   <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
   </form>
   </div>
   );
}
}

export default ContactData;