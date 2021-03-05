import React, { Component } from 'react';
import ProductEmpty from "./ProductEmpty";
import ProductAdd from "./ProductAdd";
import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import CircleLoader from "react-spinners/CircleLoader";
import MediaQuery from "react-responsive";
import BasketRefinePC from "./BasketRefinePC";
import BasketRefineMobile from "./BasketRefineMobile";

class BasketConfig extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            reloading: false,
            products: [
                {term: "",found: false, item: {url: "", shop: "", product_name: "", product_price: "", product_additionals: ""}}
            ],
            refine: {
                products: [],
                shops: {
                    asda : "1",
                    coop: "1",
                    tesco: "1",
                    aldi: "1",
                    sains: "1"
                },
                orderby: "1"
            }
        };
        this.submitRefiner = this.submitRefiner.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.removeSelf = this.removeSelf.bind(this);
    }


    callAPI(){
        this.setState({ loading:false,reloading:false });
    }

    handleClick(event){
        let x = this.state.products;
        x.push({term: "", found: false, item: {url: "", shop: "", product_name: "", product_price: "", product_additionals: ""}});
        this.setState({products: x});
        
    }

    handleSelect(selectedOption){
        let x = selectedOption.value;
        let terms = []
        for(let i = 0; i < this.state.products.length; i++){
            terms[i] = this.state.products[i].term;
        }
        this.setState({ 
            refine: {
                products: terms,
                shops: {
                    asda : this.state.refine.shops.asda,
                    coop: this.state.refine.shops.coop,
                    tesco: this.state.refine.shops.tesco,
                    aldi: this.state.refine.shops.aldi,
                    sains: this.state.refine.shops.sains
                },
                delivery: "",
                orderby: x
            } 
        });
    }

    submitRefiner(event){
        let form = event.target;
        let terms = []
        for(let i = 0; i < this.state.products.length; i++){
            terms[i] = this.state.products[i].term;
        }
        this.setState({
            refine: {
                products: terms,
                shops: {
                    asda : form[1].checked ? 1 : 0,
                    coop: form[5].checked ? 1 : 0,
                    tesco: form[3].checked ? 1 : 0,
                    aldi: form[2].checked ? 1 : 0,
                    sains: form[4].checked ? 1 : 0
                },
                delivery: form[6].checked ? 1 : 0
            },
        }, () =>{
            console.log(this.state)
            this.callAPI();
        });
        event.preventDefault();
    }
    
    removeSelf(item){
        
        console.log(item)
        const prods = this.state.products;
        console.log(item)
        if (item > -1) {
            prods.splice(item, 1);
        }

        this.setState({products: prods});
    }

    componentDidMount(){
        this.callAPI();
    }
    
    render() {
        const { products } = this.state;
        // Logic for displaying current products

        

        const renderproducts = products.map((product , key) => {
            return <ProductEmpty key={key} product={product} prodKey={key} removeSelf={this.removeSelf}/>;
        });

       
        return (
            <div style={{width:"100%"}}>
                <CircleLoader css={"display: block;margin: 0 auto;border-color: red;"} size={150} color={"var(--accent-1)"} loading={this.state.loading}/>
                <p className={this.state.loading ? '': 'hidden'} style={{textAlign: 'center'}}><br/>Loading</p>
                <div className="browseProds">
                    <MediaQuery minWidth={1224}>
                        <BasketRefinePC loading={this.state.loading} products={this.state.products.length} handleSelect={this.handleSelect} submitRefiner={this.submitRefiner}/>
                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>
                        <BasketRefineMobile  loading={this.state.loading} products={this.state.products.length} handleSelect={this.handleSelect} submitRefiner={this.submitRefiner}/>
                    </MediaQuery>
                    <ul className={this.state.loading ? 'hidden': 'xyz'}>
                        <CircleLoader css={"display: block;margin: 0 auto;border-color: red;"} size={150} color={"var(--accent-1)"} loading={this.state.reloading}/>
                        <div className={this.state.reloading ? 'hidden': ''}>
                            {renderproducts}
                            <ProductAdd handleClick={this.handleClick}/>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
}
 
export default BasketConfig;