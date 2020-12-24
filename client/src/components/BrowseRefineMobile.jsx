import React, { Component } from 'react';

class BrowseRefineMobile extends Component {
    state = { 
        open: false
        
    }

    toggleMenu(){
        if(this.state.open){
            this.setState({open: false})
        }
        else{
            this.setState({open: true})
        }
    }

    getVisable(){

    }
    render() { 
        return ( 
            <div className={this.props.loading ? 'hidden': ''}>
                <button onClick={this.toggleMenu.bind(this)}>Refine Browse</button>
                <form className={this.state.open ? 'form-visable-mob': 'hidden'} onSubmit={this.props.submitcefiner}>
                    <p>{this.props.products} products found</p>
                    <hr/>
                    <input type="text" name="term"></input>
                    <div className="shops">
                        <tr>
                            <tc><label htmlFor="asda">Asda</label><input type="checkbox" name="asda"></input></tc>
                            <tc><label htmlFor="aldi">Aldi</label><input type="checkbox" name="aldi"></input></tc>
                            <tc><label htmlFor="tesco">Tesco</label><input type="checkbox" name="tesco"></input></tc>
                            <tc><label htmlFor="sains">Sainsburys</label><input type="checkbox" name="sains"></input></tc>
                            <tc><label htmlFor="coop">CoOp</label><input type="checkbox" name="coop"></input></tc>
                        </tr>
                    </div>
                    <input type="submit" value="Update Browse"></input>
                </form>
            </div>
        );
    }
}
 
export default BrowseRefineMobile;