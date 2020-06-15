import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const pubKey = 	'pk_test_51GuN6vJYXIs4OtFyjpKAyfp06jiSQmZMBzSL9h6GZGNxsZWVWRvhb4VYcW9B9UfAzfFwd1HjQvz5sxNTecI11GxH00SEoSySSw';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }

    return(
        <StripeCheckout
            label='Pay Now'
            name='Crown Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={pubKey}
        />
    )
}

export default StripeCheckoutButton;