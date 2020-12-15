import React, { Component } from 'react';

class Product extends Component {
    state = {
        shops: {
            "asda": "ASDA",
            "tesco": "TESCO",
            "aldi": "ALDI",
            "sains": "SAINSBURYS",
            "coop": "CO-OPERATIVE"
        }
    }

    getShop() {
        var shop = this.props.product.shop;
        return this.state.shops[shop]
    }

    getDate() {
    }

    render() {
        return (
            <div style={{ display: 'flex', width: '60%', margin: 'auto', border: '1px outset black', borderCollapse: 'collapse' }}>
                <div className="typeSec">
                    {this.getShop()}
                </div>
                <div style={{ borderLeft: '1px solid #dbdbdb', marginRight: '50px' }}></div>
                <div className="InfoSec">
                    <p>Price: {this.props.product.product_price}</p>
                    <p>{this.props.product.product_name}</p>
                </div>
            </div>
        );
    }
}

export default Product;