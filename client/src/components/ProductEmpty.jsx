import React, { Component } from 'react';
import CornerRibbon from "react-corner-ribbon";
import { FaTimesCircle } from "react-icons/fa";

class ProductEmpty extends Component {
    constructor() {
        super();
        this.state = { 
            shops: {
                "asda": "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Asda_logo.svg/300px-Asda_logo.svg.png",
                "tesco": "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Tesco_Logo.svg/200px-Tesco_Logo.svg.png",
                "aldi": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/AldiWorldwideLogo.svg/500px-AldiWorldwideLogo.svg.png",
                "sains": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Sainsbury%27s_Logo.svg",
                "coop": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/The_Co-Operative_clover_leaf_logo.svg/500px-The_Co-Operative_clover_leaf_logo.svg.png",
                "" : "EshopLogo1.png"
            },
             visable: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.showDelete = this.showDelete.bind(this);
        this.hideDelete = this.hideDelete.bind(this);
        this.removeSelf = this.removeSelf.bind(this);
    }

    getShop() {
        var shop = this.props.product.item.shop;
        return this.state.shops[shop]
    }

    handleChange(event){
        console.log(event)
        this.props.product.term = event.target.value
        event.target.value = this.props.product.term 
    }

    findRibbon(){
        var index = this.props.index;
        switch (index) {
            case 1:
                return <CornerRibbon position="top-left" fontColor="white" backgroundColor="#D6AF36" style={{fontSize: "10px"}}>Best Value</CornerRibbon>;
            case 2:
                return <CornerRibbon position="top-left" fontColor="white" backgroundColor="#b4b4b4" style={{fontSize: "10px"}}>2nd</CornerRibbon>
            case 3:
                return <CornerRibbon position="top-left" fontColor="white" backgroundColor="#6a3805" style={{fontSize: "10px"}}>3rd</CornerRibbon>
            default:
                return;
        }
    }

    showDelete(){
        
        this.setState({visable: true})
    }
    hideDelete(){
        
        this.setState({visable: false})
    }
    removeSelf(){
        let x = this.props.prodKey;
        this.props.removeSelf(x);
    }
    componentDidMount(){
        document.getElementById(this.props.prodKey).value = this.props.product.term;
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.product.term !== prevProps.product.term){
            document.getElementById(this.props.prodKey).value = this.props.product.term;
        }
    }

    render() {

        return (
            <div className="product2" style={{ display: 'flex', position: 'relative', width: '80%', margin: 'auto', border: '1px outset black', borderCollapse: 'collapse' }} onMouseEnter={this.showDelete} onMouseLeave={this.hideDelete}>
                {this.findRibbon()}
                {(this.state.visable) ? <div style={{zIndex: 9999, position: "absolute", color: "var(--accent-1)", cursor: "pointer"}} onClick={this.removeSelf}><FaTimesCircle style={{height: "1.1em", width: "1.1em"}}/></div> : null}
                <div className="typeSec">
                    <img src={this.getShop()} alt="Logo" className="ShopIcon" style={{height: "45px"}}/>
                </div>
                <div style={{ borderLeft: '1px solid #dbdbdb', marginRight: '20px' }}></div>
                <div className="InfoSec">
                    {(this.props.product.found) ?
			        <div>
                        <p>{this.props.product.product_name}</p>
                        <p style={{fontSize: "0.8em"}}>Price: {this.props.product.product_price}</p>
                    </div>
                    :  
                    <div>
                        <p>Input Product</p>
                        <input id={this.props.prodKey} onChange={this.handleChange}/>
                    </div>}
                </div>
            </div>
        );
    }
}



export default ProductEmpty;