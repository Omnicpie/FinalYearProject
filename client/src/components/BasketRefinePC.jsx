import React, { Component } from 'react';
import AuthService from "../services/auth.service";
import { FaExclamationCircle } from "react-icons/fa";

class BasketRefinePC extends Component {
    state = { 
        currentUser: undefined
     }

    componentDidMount(){
    	const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
              currentUser: user
            });
      }
    }
    render() { 
        const {currentUser} = this.state;
        return ( 
            <div style={{width: "15%", display: "flex", float: "left", flexGrow: "2", flexDirection: "column"}}>
                <form className={this.props.loading ? 'hidden': 'form-visable'} id="x1" onSubmit={this.props.submitRefiner}>
                    <p style={{marginTop: "10pt"}}>{this.props.products} item{(this.props.products === "1") ? null : "s"}</p>
                    <hr/>
                    {(currentUser) ?
                     <button onClick={this.props.handleShow} type="button" className="button">Save Basket</button> : 
                            <button type="button" disabled className="button">Save Basket<span className="tooltiptext">Log in to save a basket</span></button>
                    }
                    <hr/>
                    <h4 style={{textAlign: "center"}}>Basket Options</h4>
                    <hr/>
                    <p style={{marginBottom: "0", textDecoration: "underline"}}>Shop Availablity</p>
                    <div className="shops" style={{display: "grid"}}>
                        <label htmlFor="asda" className="browseShopLabels" style={{gridRow: "1"}}>Asda</label><input type="checkbox" name="asda" className="browseCheckboxes" style={{gridRow: "1"}}></input>
                        <label htmlFor="aldi" className="browseShopLabels" style={{gridRow: "2"}}>Aldi</label><input type="checkbox" name="aldi" className="browseCheckboxes" style={{gridRow: "2"}}></input>
                        <label htmlFor="tesco" className="browseShopLabels" style={{gridRow: "3"}}>Tesco</label><input type="checkbox" name="tesco" className="browseCheckboxes" style={{gridRow: "3"}}></input>
                        <label htmlFor="sains" className="browseShopLabels" style={{gridRow: "4"}}>Sainsburys</label><input type="checkbox" name="sains" className="browseCheckboxes" style={{gridRow: "4"}}></input>
                        <label htmlFor="coop" className="browseShopLabels" style={{gridRow: "5"}}>CoOp</label><input type="checkbox" name="coop" className="browseCheckboxes" style={{gridRow: "5"}}></input>
                    </div>
                    <hr/>
                    <div className="shops" style={{display: "grid"}}>
                        <label htmlFor="deliver" className="browseShopLabels" style={{gridRow: "1"}}>Delivery</label><input type="checkbox" name="delivery" className="browseCheckboxes" style={{gridRow: "1"}}></input>
                    </div>
                    {(currentUser) ? 
                    <div>
                        <p style={{fontSize: "9pt"}}><FaExclamationCircle  style={{height: "1em", width: "1em"}}/>These preferences can be saved in your profile settings</p>
                    </div> : null}
                    <hr/>
                </form>
            </div>
        );
    }
}
 
export default BasketRefinePC;