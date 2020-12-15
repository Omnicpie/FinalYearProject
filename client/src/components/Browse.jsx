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
            products: [],
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
    }

    callAPI(){
        fetch("http://100.66.128.60:8080/api/browse")
            .then(res=> res.json())
            .then(res => this.setState({ loading:false, products: res }));
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
            return <Product product={product}/>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if(number === 1 && currentPage === 1){
                return(
                    <li key={number} className='page-item active' id={number}><a href='#' onid={number} className="page-link" onClick={this.handleClick}>{number}</a></li>
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
            <div>
                <CircleLoader css={"display: block;margin: 0 auto;border-color: red;"} size={150} color={"#123abc"} loading={this.state.loading}/>
                <p className={this.state.loading ? '': 'hidden'} style={{textAlign: 'center'}}><br/>Loading</p>
                <ul>
                    {renderproducts}
                </ul>
                <ul className={this.state.loading ? 'hidden': 'pagination'}>
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