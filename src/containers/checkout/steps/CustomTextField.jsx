import React from 'react';
import { TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label }) => {
    const { control } = useFormContext();

    return (
        <div id='input'>
            <Controller render={({ field }) => <TextField {...field} label={label} fullWidth required/>}
                control={control}      
                name={name}
                defaultValue=''
            />
        </div>
    );
}

export default FormInput;
