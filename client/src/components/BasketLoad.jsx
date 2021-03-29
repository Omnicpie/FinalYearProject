import React, { Component } from 'react';
import ProductEmpty from "./ProductEmpty";
import ProductAdd from "./ProductAdd";
import "bootstrap/dist/css/bootstrap.min.css";
import CircleLoader from "react-spinners/CircleLoader";
import MediaQuery from "react-responsive";
import BasketRefinePC from "./BasketRefinePC";
import BasketRefineMobile from "./BasketRefineMobile";
import Modal from "./Modal";
import AuthService from "../services/auth.service";
import { FaExclamationCircle } from 'react-icons/fa';

class BasketConfig extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            reloading: false,
            showConfirm: false,
            show: false,
            price: 0,
            basketID: {id: 0},
			currentUser: { username: "" },
            products: [
                {term: "",found: false, item: {url: "", shop: "", product_name: "", product_price: "", product_additionals: ""}}
            ],
            userBaskets:[],
            refine: {
                products: [],
                shops: {
                    asda : "1",
                    coop: "1",
                    tesco: "1",
                    aldi: "1",
                    sains: "1"
                },
                type:"new",
                orderby: "1"
            },
            save: {
                products: [],
                type: "",
                name: "",
                user: { username: "" },
                overwrite: "",
                price: ""
            }
        };
        this.submitRefiner = this.submitRefiner.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.removeSelf = this.removeSelf.bind(this);
        this.saveBasket = this.saveBasket.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }


    callSaveAPI(){
        fetch("https://eshopapi.ddns.net/api/basket/save", {method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify(this.state.save)})
        .then(res=> {
            this.setState({showConfirm: true}, ()=>{
                setTimeout(() => {this.setState({showConfirm: false})}, 5000)
            })
        })
        .then(res=> this.updateBaskets());
    }

    updateBaskets(){
        fetch("https://eshopapi.ddns.net/api/basket/get/all", {method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify(this.state.currentUser)})
        .then(res=> res.json())
        .then(res => this.setState({userBaskets: res }))
    }

    callAPI(){
        fetch("https://eshopapi.ddns.net/api/basket/get/all", {method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify(this.state.currentUser)})
        .then(res=> res.json())
        .then(res => {
            let price = 0;
            for(let i = 0; i<res.length; i++){
                if(res[i].value == this.state.basketID.id){
                    price = res[i].price;
                }
            }
            this.setState({userBaskets: res , price: price})
        })
        .then(res => {
            fetch("https://eshopapi.ddns.net/api/basket/get", {method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify(this.state.basketID)})
            .then(res => res.json())
            .then(res => this.setState({products: res, loading: false, reloading: false}));
        });
    }

    callFindAPI(){
        
        fetch("https://eshopapi.ddns.net/api/basket/find", {method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify(this.state.refine)})
        .then(res=> res.json())
        .then(res => this.setState({ loading:false,reloading:false, products: res.items, price: res.total }));
    }

    handleClick(event){
        let x = this.state.products;
        x.push({term: "", found: false, item: {url: "", shop: "", product_name: "", product_price: "", product_additionals: ""}});
        this.setState({products: x});
        
    }

    handleSelect(selectedOption){
        let x = selectedOption.value;
        this.setState({ 
            save: {
                products: this.state.products,
                type: this.state.type,
                name: selectedOption.label,
                overwrite: x,
                price: this.state.save.price
            },
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
            reloading: true
        }, () =>{
            this.callFindAPI();
        });
        event.preventDefault();
    }
    
    removeSelf(item){
        const prods = this.state.products;
        if (item > -1) {
            prods.splice(item, 1);
        }

        this.setState({products: prods});
    }

    saveBasket(event){
        let form = event.target;
        let type = ""
        let name = ""
        if(form[0].checked){
            type = "new"
            name = form[1].value
        }
        else if(form[2].checked){
            type = "overwrite";
            name = this.state.save.name;
        }
        let x = [];
        let prods = this.state.products
        for(let i = 0; i< prods.length; i++){
            let item = {term: prods[i].term, item: prods[i].item.url, shop: prods[i].item.shop}
            x.push(item)
        }
        this.setState({
            save: {
                products: x,
                type: type,
                name: name,
                user: this.state.currentUser,
                overwrite: this.state.save.overwrite,
                price: this.state.price
            },
        }, () =>{
            this.callSaveAPI();
            this.handleClose();
        });
        event.preventDefault();
    }

    componentDidMount(){
		const currentUser = AuthService.getCurrentUser();
        let savepre = this.state.save;
        savepre.overwrite = this.props.match.params.id
        this.setState({currentUser: currentUser, basketID: {id: this.props.match.params.id}, save: savepre}, ()=>{
            this.callAPI();
        });
    }

    handleClose(){
        this.setState({show: false});
    }

    handleShow(){
        this.setState({show: true});
    }

    render() {
        const { products, show, userBaskets } = this.state;
        // Logic for displaying current products    
        

        const renderproducts = products.map((product , key) => {
            return <ProductEmpty key={key} product={product} prodKey={key} removeSelf={this.removeSelf}/>;
        });

       
        return (
            <div style={{width:"100%"}}>
                <CircleLoader css={"display: block;margin: 0 auto;border-color: red;"} size={150} color={"var(--accent-1)"} loading={this.state.loading}/>
                
                <Modal handleClose={this.handleClose} overwrite={this.props.match.params.id} show={show} saveBasket={this.saveBasket} handleSelect={this.handleSelect} userBaskets={userBaskets}/>
                <p className={this.state.loading ? '': 'hidden'} style={{textAlign: 'center'}}><br/>Loading</p>
                <div className="browseProds">
                    <MediaQuery minWidth={1224}>
                        <BasketRefinePC loading={this.state.loading} handleShow={this.handleShow} products={this.state.products.length} saveBasket={this.saveBasket} handleSelect={this.handleSelect} submitRefiner={this.submitRefiner}/>
                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>
                        <BasketRefineMobile handleShow={this.handleShow} loading={this.state.loading} products={this.state.products.length} handleSelect={this.handleSelect} submitRefiner={this.submitRefiner}/>
                    </MediaQuery>
                    <ul className={this.state.loading ? 'hidden': 'xyz'}>
                        <CircleLoader css={"display: block;margin: 0 auto;border-color: red;"} size={150} color={"var(--accent-1)"} loading={this.state.reloading}/>
                        <div className={this.state.reloading ? 'hidden': ''}>
                            {renderproducts}
                            <ProductAdd handleClick={this.handleClick}/>
                        </div>
                    </ul>
                </div>
                <div className={this.state.reloading ? 'hidden': 'price-section'}>
                    <p style={{width: "max-content", height: "max-content", margin: "auto 0"}}>Total Price: £{this.state.price}</p>
                    <input type="submit" value="Find Best Basket!" className="button" form="x1" style={{width: "max-content", margin: "auto 10pt auto auto", height: "max-content"}}></input>
                </div>
                <div className={this.state.showConfirm ? 'confirmation alert alert-success': 'hidden'}><FaExclamationCircle/>Basket Saved</div>
            </div>
        );
    }
}
 
export default BasketConfig;