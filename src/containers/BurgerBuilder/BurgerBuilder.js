import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		totalPrice: 4,
		purchaseable: false,
		purchasing: false,
		loading: false,
		error: null
	}

	componentDidMount () {
		// axios.get('https://react-my-burger-a0de2.firebaseio.com/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ingredients:response.data})
		// 	})
		// 	.catch(error => {
		// 		this.setState({error: true})
		// 	});
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({purchaseable: sum > 0});
	}

	// addIngredientHandler = ( type ) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;

	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updatedIngredients[type] = updatedCount;

	// 	const priceAddition = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice + priceAddition;

	// 	this.setState({
	// 		totalPrice: newPrice,
	// 		ingredients: updatedIngredients
	// 	});

	// 	this.updatePurchaseState(updatedIngredients);
	// }

	// removeIngredientHandler = ( type ) => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount>0) {
	// 		const updatedCount = oldCount - 1;

	// 		const updatedIngredients = {
	// 			...this.state.ingredients
	// 		};
	// 		updatedIngredients[type] = updatedCount;

	// 		const priceAddition = INGREDIENT_PRICES[type];
	// 		const oldPrice = this.state.totalPrice;
	// 		const newPrice = oldPrice - priceAddition;

	// 		this.setState({
	// 			totalPrice: newPrice,
	// 			ingredients: updatedIngredients
	// 		});

	// 		this.updatePurchaseState(updatedIngredients);
	// 	}
	// }

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		this.props.history.push({
			pathname: '/checkout',
			state: { 
				ingredients: this.props.ings,
				totalPrice: this.state.totalPrice
			}
		});
	}

	render () {
		const disabledInfo = {
			...this.props.ings
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;

		if (this.props.ings) {
			orderSummary = <OrderSummary
				ingredients={this.props.ings}
				totalPrice={this.state.totalPrice}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler} />;
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

		let burger = this.state.error ? <p>Ingredients could not be loaded.</p> : <Spinner />

		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={ this.props.ings }/>
					<BuildControls
						ingredientAdded={  this.props.onIngredientAdded }
						ingredientRemove={ this.props.onIngredientRemoved }
						disabled={ disabledInfo }
						purchaseable={ this.state.purchaseable }
						totalPrice={ this.state.totalPrice }
						ordered={this.purchaseHandler} />
				</Aux>
			);
		}

		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
		onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
