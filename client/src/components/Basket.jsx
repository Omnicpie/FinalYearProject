import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Basket extends Component {
    state = {  }
    render() { 
        return (
            <Link to={"/basket/" + this.props.basket.value} className="nav-link">
                <div className="product2" style={{ display: 'flex', position: 'relative', width: '80%', margin: 'auto', border: '1px outset black', borderCollapse: 'collapse' }} onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete}>
                    <div style={{ borderLeft: '1px solid #dbdbdb', marginRight: '20px' }}></div>
                    <div className="InfoSec">
                        <div>
                            <p>{this.props.basket.label}</p>
                            <p style={{fontSize: "0.8em"}}>Total price: {this.props.basket.price} | Items: {this.props.basket.num_prods}</p>
                        </div>
                    </div>
                </div>
            </Link> 
         );
    }
}
 
export default Basket;