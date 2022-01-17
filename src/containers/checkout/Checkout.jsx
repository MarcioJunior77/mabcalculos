import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, CircularProgress } from '@material-ui/core';
import { commerce } from '../../lib/commerce';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import ClientDataForm from './steps/ClientDataForm';
import PaymentForm from './steps/PaymentForm';
import './checkout.css';

const steps = ["Dados do Cliente", "Detalhes de Pagamento"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const history = useHistory();
    
    useEffect(() => {
        if(cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                    setCheckoutToken(token);
                } catch (error) {
                    if(activeStep !== steps.length) history.push('/');
                }
            }

            generateToken();
        }
    }, [cart]);
    
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
    const next = (data) => {
        setShippingData(data);
        console.log(data.data.email);
        nextStep();
    };

    const Form = () => activeStep === 0
    ? <ClientDataForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm checkoutToken={checkoutToken} shippingData={shippingData} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} />

    const Confirmation = () => order.customer ? (
        <div>
            <h1 id='finish_thanks_message'>Obrigado pela compra, {order.customer.firstname} {order.customer.lastname}.</h1>
            <h1 id='finish_advice'>Fique de olho em seu email, te enviaremos sua(s) aula(s) por lá.</h1>
            <hr id='finish_line'/>
            <Link to={'/'}><button id='finish_button'>Página inicial</button></Link>
        </div>
    ) : (
        <div>
            <CircularProgress />
        </div>
    );

    if(error) {
        <>
            <h1>Error: {error}</h1>
        </>
    }

    return (
        <div id='body'>
            <div id='form'>
                <h1 id='forms_title'>Formulário</h1>
                <Stepper activeStep={activeStep} id='stepper'>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form />}
            </div>
        </div>
    );
}

export default Checkout
