import React, { Component } from 'react';

class ProductAdd extends Component {
    state = {
    }

    render() {
        return (
            <div onClick={this.props.handleClick} className="product2" style={{ display: 'flex', position: 'relative', width: '80%', margin: 'auto', border: '1px outset black', borderCollapse: 'collapse', cursor: "pointer" }}>
                <p style={{textAlign: "center", width: "100%", marginTop: "1rem"}}>Add New</p>
            </div>
        );
    }
}



export default ProductAdd;