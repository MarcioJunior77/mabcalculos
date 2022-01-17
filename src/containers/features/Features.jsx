import React from 'react'
import './features.css';
import Products from './products/Products';
const Features = ({ cart, products, handleAddToCart, handleRemoveFromCart }) => {
    return (
        <div className='partSection'>
            <h1 id='featuresTitle'>Escolha Quais <b>Conteúdos</b> Você Quer <b className='decorate'>Dominar</b></h1>
            {/* <h1 id='advice'>* Todas as aulas tem 2 horas de duração e cerca de 300 exercícios para teste.</h1> */}
            <div>
                <Products cart={ cart } products={ products } handleAddToCart= { handleAddToCart } handleRemoveFromCart={ handleRemoveFromCart } />
            </div>
        </div>
    )
}

export default Features