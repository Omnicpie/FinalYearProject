import React, { Component } from 'react';
import Select from 'react-select';

class BasketRefineMobile extends Component {
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
        const options = [
            {value: '1', label: 'Product Names A-Z'},
            {value: '2', label: 'Product Names Z-A'},
            {value: '3', label: 'Product Price LOW-HIGH'},
            {value: '4', label: 'Product Price HIGH-LOW'},
        ];
        const styles = {
            select: base => ({
                ...base,
                border: `0px`
            }),
            option: (provided, state) => {
                const background = "var(--background-1)"; 
                return {...provided, background};
            }
        };
        return ( 
            <div className={this.props.loading ? 'hidden': ''}>
                <button style={{margin: "10pt"}} className="button" onClick={this.toggleMenu.bind(this)}>Refine Browse</button>
                <form className={this.state.open ? 'form-visable-mob': 'hidden'} onSubmit={this.props.submitRefiner} style={{width: "95%", margin: "auto", border: "1px solid black", marginBottom: "10pt", backgroundColor: "var(--background-2)"}}>
                    <p style={{padding: "5pt"}}>{this.props.products} products found</p>
                    <hr/>
                    <input type="text" name="term" className="form-control form-control-search-2" style={{width: "80%", margin: "auto"}}></input>
                    <div className="shops"  style={{display: "grid", width: "70%", margin: "auto"}}>
                        <label htmlFor="asda" className="browseShopLabels" style={{gridRow: "1"}}>Asda</label><input type="checkbox" name="asda" className="browseCheckboxes" style={{gridRow: "1"}}></input>
                        <label htmlFor="aldi" className="browseShopLabels" style={{gridRow: "2"}}>Aldi</label><input type="checkbox" name="aldi" className="browseCheckboxes" style={{gridRow: "2"}}></input>
                        <label htmlFor="tesco" className="browseShopLabels" style={{gridRow: "3"}}>Tesco</label><input type="checkbox" name="tesco" className="browseCheckboxes" style={{gridRow: "3"}}></input>
                        <label htmlFor="sains" className="browseShopLabels" style={{gridRow: "4"}}>Sainsburys</label><input type="checkbox" name="sains" className="browseCheckboxes" style={{gridRow: "4"}}></input>
                        <label htmlFor="coop" className="browseShopLabels" style={{gridRow: "5"}}>CoOp</label><input type="checkbox" name="coop" className="browseCheckboxes" style={{gridRow: "5"}}></input>
                    </div>
                    <Select defaultValue={options[0]} label="Single select" options={options} style={styles} onChange={this.props.handleSelect} theme={theme => ({...theme, borderRadius: "10px", colors: {...theme.colors, primary: "var(--accent-1)", primary25: "var(--background-1)", primary50: "var(--text-1)", primary75: "var(--text-1)", neutral0: "var(--background-2)", neutral80: "var(--text-1)"}})}/>
                    <input type="submit"  className="button" value="Update Browse" style={{width: "80%", margin: "auto", marginBottom: "10pt", backgroundColor: "var(--background-1)"}}></input>
                </form>
            </div>
        );
    }
}
 
export default BasketRefineMobile;