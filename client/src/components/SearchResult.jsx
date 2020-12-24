import React, { Component } from 'react';
import CircleLoader from "react-spinners/CircleLoader";
import Product from "./Product";

class SearchResult extends Component {
    state = { 
        search: {
            term: ""
        },
        results: [],
        loading: true,
        reloading: false
    }

    callAPI(){
        this.setState({reloading: true});
        fetch("https://eshopapi.ddns.net/api/search", {method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify(this.state.search)})
            .then(res => res.json())
            .then(res => this.setState({ loading:false,reloading:false, results: res}))
            .catch(err => this.setState({loading:false,reloading:false,results: [{url: "", product_name: "No Products Found for that name", product_price: "", product_additionals: "Search again for more results"}]}));
    }


    componentDidMount(){
        var urlParams = new URLSearchParams(window.location.search);
        let term = urlParams.get("srch-term");
        console.log(term)
        this.setState({search: {term: term}}, () => {
            this.callAPI();
        });
    }
    render() {
        const { results } = this.state;

        const renderproducts = results.map((result) => {
            return <Product key={result.url} product={result}/>;
        });
        
        return ( 
            <div style={{width:"100%"}}>
                <CircleLoader css={"display: block;margin: 0 auto;border-color: red;"} size={150} color={"#123abc"} loading={this.state.loading}/>
                <p className={this.state.loading ? '': 'hidden'} style={{textAlign: 'center'}}><br/>Loading</p>
                <div className="browseProds">
                    <ul className={this.state.loading ? 'hidden': 'xyz'}>
                        <CircleLoader css={"display: block;margin: 0 auto;border-color: red;"} size={150} color={"#123abc"} loading={this.state.reloading}/>
                        <div className={this.state.reloading ? 'hidden': ''}>{renderproducts}</div>
                    </ul>
                </div>
            </div>
        );
    }
}
 
export default SearchResult;