import React, { useContext } from 'react';
import {CartContext} from '../../providers/cart/cart.provider';
import { useHistory } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const {cartItems, toggleHidden} = useContext(CartContext);
    const history = useHistory();
    return (
        <div className='cart-dropdown'>
            <div className="cart-items"> 
             {
                 cartItems.length ? (
                 cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                 ) : (
                     <span className="empty-message">Your cart is empty</span>
                 )
             }
            </div>
            <CustomButton onClick={() => {
                    history.push('/checkout');
                    toggleHidden();
                } } 
                disabled={!cartItems.length}
            >
                GO TO CHECKOUT
            </CustomButton>
        </div>
    )
}

export default CartDropdown;
