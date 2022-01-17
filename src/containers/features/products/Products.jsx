import React/*, { useState }*/ from 'react';
import Product from './product/Product';

const Products = ({ cart, products, handleAddToCart, handleRemoveFromCart}) => {

    /*const [buttonStyle,setButtonStyle] = useState("buy");

    const style = () => {
        console.log("Voce clicou");
        setButtonStyle("buyed");
        const buy_button = document.querySelector(".buy");
        
        buy_button.addEventListener('click', () => {
            const color = buy_button.getAttribute('colors');
            if (color === "red") {
                buy_button.setAttribute("colors", "grey");
            }
            else {
                buy_button.setAttribute("colors", "red");
            }
        })  
    }*/
    if(!cart.line_items) return 'Loading...';


    return (
        <main id='classes'>
            {products.map((product) => (
                <div className='aulas'>
                    <Product cart={cart} product={product} handleAddToCart={ handleAddToCart } />
                </div>
            ))}
        </main>
    )
}

export default Products