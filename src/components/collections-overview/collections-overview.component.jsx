import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'; 

import {selectCollection, selectCollectionItems} from '../../redux/shop/shop.selector';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const CollectionsOverview = ({collections}) => {
    console.log(collections);
    return(
    <div className='collections-overview'>
    {collections.map(({id, ...otherCollectionProps}) => (
        <CollectionPreview key={id} {...otherCollectionProps}/>
    ))}
    </div>
)}

const mapStateToProps = (createStructuredSelector)({
    collections:selectCollectionItems
});

export default connect(mapStateToProps)(CollectionsOverview);