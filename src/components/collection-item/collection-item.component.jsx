import React, { useContext } from 'react';
import {CartContext} from '../../providers/cart/cart.provider';
import CustomButton from '../custom-button/custom-button.component';
import './collection-item.styles.scss';

const CollectionItem = ({item}) => {
    const {addItem} = useContext(CartContext);
    const {name, price, imageUrl} = item;
    return (
        <div className="collection-item">
           <div 
           style={{
               backgroundImage: `url(${imageUrl})`
           }}
            className="image"
        />
           <div className="collection-footer">
                <span className='name'>{name}</span>
                <span className="price">${price}</span>
           </div>
           <CustomButton onClick={() => addItem(item)} className='custom-button' inverted>Add to cart</CustomButton>
        </div>
    )
}

export default CollectionItem;
