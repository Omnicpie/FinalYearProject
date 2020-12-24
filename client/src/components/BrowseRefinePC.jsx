import React, { Component } from 'react';

class BrowseRefinePC extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={{width: "15%", display: "flex", float: "left", flexGrow: "2", flexDirection: "column"}}>
                <form className={this.props.loading ? 'hidden': 'form-visable'} onSubmit={this.props.submitRefiner}>
                    <p>{this.props.products} products found</p>
                    <hr/>
                    <input type="text" name="term" ></input>
                    <hr/>
                    <div className="shops">
                        <label htmlFor="asda">Asda</label><input type="checkbox" name="asda"></input>
                        <label htmlFor="aldi">Aldi</label><input type="checkbox" name="aldi"></input>
                        <label htmlFor="tesco">Tesco</label><input type="checkbox" name="tesco"></input>
                        <label htmlFor="sains">Sainsburys</label><input type="checkbox" name="sains"></input>
                        <label htmlFor="coop">CoOp</label><input type="checkbox" name="coop"></input>
                    </div>
                    <hr/>
                    <input type="submit" value="Update Browse"></input>
                </form>
            </div>
        );
    }
}
 
export default BrowseRefinePC;