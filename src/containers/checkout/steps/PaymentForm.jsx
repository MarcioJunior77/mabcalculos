import React from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({teste, checkoutToken, shippingData, backStep, nextStep, onCaptureCheckout, timeout}) => {
    const handleSubmit = async (e, elements, stripe) => {
        e.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if(error) {
            console.log('[error]', error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { 
                    firstname: shippingData.data.firstName,
                    lastname: shippingData.data.lastName,
                    cellphone: shippingData.data.cellphone,
                    email: shippingData.data.email },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            };

            onCaptureCheckout(checkoutToken.id, orderData);

            timeout();

            nextStep();
        }
    };

    return (
        <div>
            <button onClick={teste} ><h1 id='title_review'>Resumo da compra:</h1></button>
            <div id='list_review'>
                {checkoutToken.live.line_items.map((product) => (
                    <div id='item_detail' key={product.name}>
                        <h1 id='class_name_review'>{product.name}</h1>
                        <h1 id='class_price_review'>{product.line_total.formatted_with_symbol}</h1>
                    </div>
                ))}
                <div id='total_review'>
                    <h1 id='total_title_review'>Total</h1>
                    <h1 id='total_price_review'>{checkoutToken.live.subtotal.formatted_with_symbol}</h1>
                </div>
                <hr id='line1'/>
                <h1 id='payment_title'>Método de Pagamento</h1>
                <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                        {({ elements, stripe }) => (
                            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                                <CardElement id='card_payment'/>
                                <div className='bottom_form_buttons'>
                                    <button onClick={backStep} className='goBack'>Voltar</button>
                                    <button type='submit' disabled={!stripe} className='goForward'>{ checkoutToken.live.subtotal.formatted_with_symbol }</button>
                                </div>
                            </form>
                        )}
                    </ElementsConsumer>
                </Elements>
            </div>
        </div>
    );
}

export default PaymentForm
