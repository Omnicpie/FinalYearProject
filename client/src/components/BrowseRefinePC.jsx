import React, { Component } from 'react';
import Select from 'react-select';

class BrowseRefinePC extends Component {
    state = {  }
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
            <div style={{width: "15%", display: "flex", float: "left", flexGrow: "2", flexDirection: "column"}}>
                <form className={this.props.loading ? 'hidden': 'form-visable'} onSubmit={this.props.submitRefiner}>
                    <p style={{marginTop: "10pt"}}>{this.props.products} products found</p>
                    <hr/>
                    <h4 style={{textAlign: "center"}}>Filter Browse</h4>
                    <input className="form-control form-control-search-2" type="text" name="term" ></input>
                    <hr/>
                    <div className="shops" style={{display: "grid"}}>
                        <label htmlFor="asda" className="browseShopLabels" style={{gridRow: "1"}}>Asda</label><input type="checkbox" name="asda" className="browseCheckboxes" style={{gridRow: "1"}}></input>
                        <label htmlFor="aldi" className="browseShopLabels" style={{gridRow: "2"}}>Aldi</label><input type="checkbox" name="aldi" className="browseCheckboxes" style={{gridRow: "2"}}></input>
                        <label htmlFor="tesco" className="browseShopLabels" style={{gridRow: "3"}}>Tesco</label><input type="checkbox" name="tesco" className="browseCheckboxes" style={{gridRow: "3"}}></input>
                        <label htmlFor="sains" className="browseShopLabels" style={{gridRow: "4"}}>Sainsburys</label><input type="checkbox" name="sains" className="browseCheckboxes" style={{gridRow: "4"}}></input>
                        <label htmlFor="coop" className="browseShopLabels" style={{gridRow: "5"}}>CoOp</label><input type="checkbox" name="coop" className="browseCheckboxes" style={{gridRow: "5"}}></input>
                    </div>
                    <hr/>
                    <p>Product Ordering</p>
                    <Select defaultValue={options[0]} label="Single select" options={options} style={styles} onChange={this.props.handleSelect} theme={theme => ({...theme, borderRadius: "10px", colors: {...theme.colors, primary: "var(--accent-1)", primary25: "var(--background-1)", primary50: "var(--text-1)", primary75: "var(--text-1)", neutral0: "var(--background-2)", neutral80: "var(--text-1)"}})}/>
                    <hr/>
                    <input type="submit" value="Update Browse" className="button"></input>
                </form>
            </div>
        );
    }
}
 
export default BrowseRefinePC;