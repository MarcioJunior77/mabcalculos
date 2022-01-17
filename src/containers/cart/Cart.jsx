import React from 'react'
import { Link } from 'react-router-dom';
import './cart.css';

const Cart = ({ cart, handleRemoveFromCart, handleEmptyCart, onUpdateCartQty }) => {

    const EmptyCart = () => (
        <div id='empty_cart_page'>
            <h1 id='warning'>Você não tem nenhuma compra adicionada em sua sacola,</h1>
            <Link to="/"><button id='cart_go_to_features_button'>adicione aqui!</button></Link>
        </div>
    );

    const FilledCart = () => (
        <div id='cart'>
            <div id='cart1'>
                <h1 id='cart_title'>Suas Compras:</h1>
                <div id='buys'>
                    {cart.line_items.map((item) => (
                        <div id='cart_product'>
                            <div className='buyed_classes' key={item.id}>
                                <div id='cart_circle'>
                                    <img id='cart_product_image' width="200" height="200" src={item.image.url} alt="teste" />
                                </div>
                                <div id='buyed_product_data'>
                                    <h1 id='buyed_product_title'>{item.name}</h1>
                                    <h1 id='buyed_product_quantity'>Quantidade: 0{item.quantity}</h1>
                                </div>
                                <div id='cart_quantity_buttons'>
                                    <button id='quantity_increment_button' onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</button>
                                    <h1 id='cart_relative_quantity'>0{item.quantity}</h1>
                                    <button id='quantity_decrement_button' onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</button>
                                </div>
                                <h1 id='buyed_product_price'>{item.price.formatted_with_symbol}</h1>
                            </div>
                            <button id='cart_remove_button' onClick={() => handleRemoveFromCart(item.id)}>
                                <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="28.2842" width="5" height="40" rx="2.5" transform="rotate(45 28.2842 0)" fill="#676767"/>
                                    <rect y="3.53564" width="5" height="40" rx="2.5" transform="rotate(-45 0 3.53564)" fill="#676767"/>
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                <div id='button_control'>
                    <div>
                        <h1 id='cart_total'>Total:</h1>
                        <h1 id='cart_total_value'>{ cart.subtotal.formatted_with_symbol }</h1>
                    </div>
                    <div>
                        <button id='cart_empty_button' onClick={handleEmptyCart}>Remover tudo</button>
                        <Link to="/pay"><button id='pay'>Pagar</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );

    if(!cart.line_items) return 'Loading...';

    return (
        <div>
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
            {/* { false ? <EmptyCart /> : <FilledCart /> } */}
        </div>
    )
}

export default Cart
