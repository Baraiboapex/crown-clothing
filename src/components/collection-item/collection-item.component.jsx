import React from 'react';

import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/cart.actions';

import {
    CollectionItemContainer,
    CollectionItemImageStyles,
    CollectionItemFooter,
    CollectionItemFooterName,
    CollectionItemFooterPrice,
    CustomCollectionItemButton
} from './collection-item.styles.jsx';

// import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem}) => {
    const {name, price, imageUrl } = item;
    return (
        <CollectionItemContainer>
            <CollectionItemImageStyles
                className="image"
                imageUrl={imageUrl}
            />
            <CollectionItemFooter>
                <CollectionItemFooterName>
                    {name}
                </CollectionItemFooterName>
                <CollectionItemFooterPrice>
                    {price
                }</CollectionItemFooterPrice>
            </CollectionItemFooter>
            <CustomCollectionItemButton onClick={()=>addItem(item)} inverted>
                Add To Cart
            </CustomCollectionItemButton>
        </CollectionItemContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);