import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Basket extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() { 
        return (
            <div className="product2" style={{ display: 'flex', position: 'relative', width: '80%', margin: 'auto', border: '1px outset black', borderCollapse: 'collapse' }} onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete}>
                <div style={{ borderLeft: '1px solid #dbdbdb', marginRight: '20px' }}></div>
                <div >
                    <div>
                        <p>{this.props.basket.label}</p>
                        <p style={{fontSize: "0.8em"}}>Total price: £{this.props.basket.price} | Items: {this.props.basket.num_prods}</p>
                    </div>
                </div>
                <div style={{margin:"auto 0 auto auto", height: "max-content"}}>
                    <Link to={"/basket/" + this.props.basket.value} className="nav-link"><div className="btn btn-secondary">Edit Basket</div></Link>
                </div>
                <div style={{margin:"auto 10pt auto 10pt", height: "max-content"}}>
                    <div className="btn btn-danger" onClick={this.props.deleteBasket} id={this.props.basket.value}>Delete Basket</div>
                </div>
            </div>
         );
    }
}
 
export default Basket;