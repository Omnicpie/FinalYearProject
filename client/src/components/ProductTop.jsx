import React, { Component } from 'react';
import CornerRibbon from "react-corner-ribbon";

class ProductTop extends Component {
    state = {
        shops: {
            "asda": "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Asda_logo.svg/300px-Asda_logo.svg.png",
            "tesco": "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Tesco_Logo.svg/200px-Tesco_Logo.svg.png",
            "aldi": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/AldiWorldwideLogo.svg/500px-AldiWorldwideLogo.svg.png",
            "sains": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Sainsbury%27s_Logo.svg",
            "coop": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/The_Co-Operative_clover_leaf_logo.svg/500px-The_Co-Operative_clover_leaf_logo.svg.png"
        }
    }

    getShop() {
        var shop = this.props.product.shop;
        return this.state.shops[shop]
    }

    render() {
        return (
            <a href={this.props.product.url} className="product">
            <div style={{ display: 'flex', position: 'relative', width: '80%', margin: 'auto', border: '1px outset black', borderCollapse: 'collapse' }}>
                <CornerRibbon position="top-left" fontColor="white" backgroundColor="green" style={{fontSize: "10px"}}>Best Value</CornerRibbon>
                <div className="typeSec">
                    <img src={this.getShop()} alt={this.props.product.shop} className="ShopIcon"/>
                </div>
                <div style={{ borderLeft: '1px solid #dbdbdb', marginRight: '20px' }}></div>
                <div className="InfoSec">
                    <p>Price: {this.props.product.product_price}</p>
                    <p>{this.props.product.product_name}</p>
                </div>
            </div></a>
        );
    }
}



export default ProductTop;