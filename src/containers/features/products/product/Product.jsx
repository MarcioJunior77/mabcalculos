import React, { useState } from "react";
import './Product.css';
import { Link } from 'react-router-dom';

const Product = ({ cart, product, handleAddToCart }) => {
    const [buttonStyle,setButtonStyle] = useState("buy");
    const [content,setContent] = useState("COMPRAR");
    const [play,setPlay] = useState("add");

    const button = () => {
        setButtonStyle("buyed");
        if(content === "COMPRAR"){
            handleAddToCart(product.id, 1);
            document.getElementsByClassName("buyed").disabled = true
        }
        setContent("COMPRADO");
        setPlay("remove")
    };
    
    return (
        <div id="card">
            <div>
                <div className="apresentation">
                    <h1 className="name">{product.name}</h1>
                    <div id="price_div">
                        <h1 id="price">{product.price.formatted_with_symbol}</h1>
                        <svg id="box_price" width="255" height="125" viewBox="0 0 255 125" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_696_67)">
                            <path d="M41.0086 28.214C44.7736 23.0523 50.778 20 57.1669 20H215C226.046 20 235 28.9543 235 40V85C235 96.0457 226.046 105 215 105H57.1669C50.778 105 44.7736 101.948 41.0086 96.786L24.5969 74.286C19.4746 67.2635 19.4746 57.7365 24.5969 50.714L41.0086 28.214Z" fill="#53E1AE"/>
                            </g>
                            <defs>
                            <filter id="filter0_d_696_67" x="0.755127" y="0" width="254.245" height="125" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset/>
                            <feGaussianBlur stdDeviation="10"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_696_67"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_696_67" result="shape"/>
                            </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div className="content">
                    <h1 id="box_description">Contém: regra de três, juros, porcentagem,
                    progressões, equações do primeiro grau, geometria analitica, 
                    geometria sólida, geometria plana, trigonometria e fração.</h1>
                </div>
                <div id="tag_box">
                    <h1 className="tag_content">Duração: 2h</h1>
                    <h1 className="tag_content">+300 Ex</h1>
                </div>
                <div id="bottom">
                    <button onClick={button} play={play} className={buttonStyle}>{content}</button>
                    <Link to="/cart"><img id="add_cart" src={product.image.url} alt="teste" /></Link>
                </div>
            </div>
            <div>
                <div id="box_detail"></div>
            </div>
        </div>
    )
}

export default Product