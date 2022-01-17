import React, { useState, useEffect } from 'react'
import { Footer, Start, Video, Features, Header, Cart, Checkout } from './containers';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    
    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data)
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    }

    const handleAddToCart = async (productId, quantity_type) => {
        const { cart } = await commerce.cart.add(productId, quantity_type);
        setCart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <div className='App'>
                <Header totalItems={ cart.total_items }/>
                <Switch>
                    <Route exact path="/">
                        <Start />
                        <Video />
                        <Features cart={ cart } products={ products } handleAddToCart={ handleAddToCart } handleRemoveFromCart= { handleRemoveFromCart } />
                        <Footer />
                    </Route>
                    <Route exact path="/cart">
                        <Cart cart={ cart } handleRemoveFromCart={ handleRemoveFromCart } handleEmptyCart= { handleEmptyCart } onUpdateCartQty= { handleUpdateCartQty }/>
                    </Route>
                    <Route exact path="/pay">
                        <Checkout 
                            cart={ cart } 
                            order={ order }
                            onCaptureCheckout={ handleCaptureCheckout}
                            error={ errorMessage }
                        />
                    </Route>
                </Switch>
            </div>
        </Router>   
    );
}

export default App
