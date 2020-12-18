import React, { Component } from 'react';
import Product from "./Product";
import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import CircleLoader from "react-spinners/CircleLoader";

class Browse extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            reloading: false,
            products: [],
            refine: {
                term: "",
                shops: {
                    asda : "1",
                    coop: "1",
                    tesco: "1",
                    aldi: "1",
                    sains: "1"
                },
                orderby: "product_name"
            },
            currentPage: 1,
            productsPerPage: 100,
            upperPageBound: 7,
            lowerPageBound: 0,
            isPrevBtnActive: 'disabled',
            isNextBtnActive: '',
            pageBound: 7
        };
        this.handleClick = this.handleClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnNextClick = this.btnNextClick.bind(this);
        this.btnPrevClick = this.btnPrevClick.bind(this);
        this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
        this.submitRefiner = this.submitRefiner.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    callAPI(){
        this.setState({reloading: true});
        fetch("http://100.66.128.60:8080/api/browse", {method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify(this.state.refine)})
            .then(res=> res.json())
            .then(res => this.setState({ loading:false,reloading:false, products: res }));
    }

    componentDidUpdate() {
        $("ul li.active").removeClass('active');
        $('ul li#'+this.state.currentPage).addClass('active');
    }

    handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
        currentPage: listid
        });
        $("ul li.active").removeClass('active');
        $('ul li#'+listid).addClass('active');
        this.setPrevAndNextBtnClass(listid);
    }

    setPrevAndNextBtnClass(listid) {
        let totalPage = Math.ceil(this.state.products.length / this.state.productsPerPage);
        this.setState({isNextBtnActive: 'disabled'});
        this.setState({isPrevBtnActive: 'disabled'});
        if(totalPage === listid && totalPage > 1){
            this.setState({isPrevBtnActive: ''});
        }
        else if(listid === 1 && totalPage > 1){
            this.setState({isNextBtnActive: ''});
        }
        else if(totalPage > 1){
            this.setState({isNextBtnActive: ''});
            this.setState({isPrevBtnActive: ''});
        }
    }
    
    btnIncrementClick() {
        this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
    }

    btnDecrementClick() {
        this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
        this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid});
        this.setPrevAndNextBtnClass(listid);
    }

    btnPrevClick() {
        if((this.state.currentPage -1)%this.state.pageBound === 0 ){
            this.setState({upperPageBound: this.state.upperPageBound - this.state.pageBound});
            this.setState({lowerPageBound: this.state.lowerPageBound - this.state.pageBound});
        }
        let listid = this.state.currentPage - 1;
        this.setState({ currentPage : listid});
        this.setPrevAndNextBtnClass(listid);
    }
    
    btnNextClick() {
        if((this.state.currentPage +1) > this.state.upperPageBound ){
            this.setState({upperPageBound: this.state.upperPageBound + this.state.pageBound});
            this.setState({lowerPageBound: this.state.lowerPageBound + this.state.pageBound});
        }
        let listid = this.state.currentPage + 1;
        this.setState({ currentPage : listid});
        this.setPrevAndNextBtnClass(listid);
    }

    submitRefiner(event){
        console.log(event)
        let form = event.target;
        this.setState({
            refine: {
                term: form[0].value,
                shops: {
                    asda : form[1].checked ? 1 : 0,
                    coop: form[5].checked ? 1 : 0,
                    tesco: form[3].checked ? 1 : 0,
                    aldi: form[2].checked ? 1 : 0,
                    sains: form[4].checked ? 1 : 0
                },
                orderby: "product_name"
            },
        }, () =>{
            console.log(this.state)
            this.callAPI();
            this.forceUpdate();
        });
        event.preventDefault();
    }

    handleChange(event){


    }

    componentDidMount(){
        this.callAPI();
    }
    
    render() {
        const { products, currentPage, productsPerPage,upperPageBound,lowerPageBound,isPrevBtnActive,isNextBtnActive } = this.state;
        // Logic for displaying current products
        const indexOfLastTodo = currentPage * productsPerPage;
        const indexOfFirstTodo = indexOfLastTodo - productsPerPage;
        const currentproducts = products.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderproducts = currentproducts.map((product) => {
            return <Product key={product.url} product={product}/>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if(number === 1 && currentPage === 1){
                return(
                    <li key={number} className='page-item active' id={number}><a href='#' className="page-link" onClick={this.handleClick}>{number}</a></li>
                )
            }
            else if((number < upperPageBound + 1) && number > lowerPageBound){
                return(
                    <li key={number} className="page-item"id={number}><a href='#' className="page-link" id={number} onClick={this.handleClick}>{number}</a></li>
                )
            }
        });

        let pageIncrementBtn = null;
        if(pageNumbers.length > upperPageBound){
            pageIncrementBtn = <li className='page-item'><a href='#' className="page-link" onClick={this.btnIncrementClick}> &hellip; </a></li>
        }

        let pageDecrementBtn = null;
        if(lowerPageBound >= 1){
            pageDecrementBtn = <li className='page-item'><a href='#' className="page-link" onClick={this.btnDecrementClick}> &hellip; </a></li>
        }

        let renderPrevBtn = null;
        if(isPrevBtnActive === 'disabled') {
            renderPrevBtn = <li className={isPrevBtnActive}><span id="btnPrev" className="page-link disabled" style={{color: "grey"}}> Prev </span></li>
        }
        else{
            renderPrevBtn = <li className={isPrevBtnActive}><a href='#' id="btnPrev" className="page-link" onClick={this.btnPrevClick}> Prev </a></li>
        }

        let renderNextBtn = null;
        if(isNextBtnActive === 'disabled') {
            renderNextBtn = <li className={isNextBtnActive}><span id="btnNext" className="page-link disabled" style={{color: "grey"}}> Next </span></li>
        }
        else{
            renderNextBtn = <li className={isNextBtnActive}><a href='#' id="btnNext" className="page-link" onClick={this.btnNextClick}> Next </a></li>
        }
        return (
            <div >
                <CircleLoader css={"display: block;margin: 0 auto;border-color: red;"} size={150} color={"#123abc"} loading={this.state.loading}/>
                <p className={this.state.loading ? '': 'hidden'} style={{textAlign: 'center'}}><br/>Loading</p>
                <div style={{display: "flex"}}>
                    <div style={{width: "15%", display: "flex", float: "left", flexGrow: "2", flexDirection: "column"}}>
                        <form className={this.state.loading ? 'hidden': ''} onSubmit={this.submitRefiner}>
                            <input type="text" name="term" onChange={this.handleChange}></input>
                            <div className="shops">
                                <label htmlFor="asda">Asda</label><input type="checkbox" name="asda" onChange={this.handleChange}></input>
                                <label htmlFor="aldi">Aldi</label><input type="checkbox" name="aldi" onChange={this.handleChange}></input>
                                <label htmlFor="tesco">Tesco</label><input type="checkbox" name="tesco" onChange={this.handleChange}></input>
                                <label htmlFor="sains">Sainsburys</label><input type="checkbox" name="sains" onChange={this.handleChange}></input>
                                <label htmlFor="coop">CoOp</label><input type="checkbox" name="coop" onChange={this.handleChange}></input>
                                <br/>
                                <input type="submit" value="Update Browse"></input>
                            </div>
                        </form>
                    </div>
                    <ul style={{width: "80%"}} className={this.state.loading ? 'hidden': ''}>
                        <CircleLoader css={"display: block;margin: 0 auto;border-color: red;"} size={150} color={"#123abc"} loading={this.state.reloading}/>
                        <div className={this.state.reloading ? 'hidden': ''}>{renderproducts}</div>
                    </ul>
                </div>
                <ul className={this.state.loading || this.state.reloading ? 'hidden': 'pagination'}>
                    {renderPrevBtn}
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}
                    {renderNextBtn}
                </ul>
            </div>
        );
    }
}
 
export default Browse;