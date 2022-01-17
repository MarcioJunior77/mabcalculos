import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './forms.css'
import FormInput from './CustomTextField';

const ClientDataForm = ({ checkoutToken, next }) => {
    const methods = useForm();

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ data }))}>
                    <div id='inputs'>
                        <FormInput name="firstName" label="Nome" />
                        <FormInput name="lastName" label="Sobrenome" />
                        <FormInput name="cellphone" label="Número de celular" />
                        <FormInput name="email" label="e-mail" />
                    </div>
                    {/* <div>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                        {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                            {item.label}
                            </MenuItem>
                        ))}
                        </Select>
                    </div> */}
                    <div className='bottom_form_buttons'>
                        <Link to='./cart'><button className='goBack'>Voltar</button></Link>
                        <button type='submit' className='goForward'>Avançar</button>
                    </div> 
                </form>
            </FormProvider>
        </>
    );
}

export default ClientDataForm
