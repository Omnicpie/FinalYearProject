import React, { Component } from "react";
import Product from "./Product";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import CircleLoader from "react-spinners/CircleLoader";
import MediaQuery from "react-responsive";
import BrowseRefinePC from "./BrowseRefinePC";
import BrowseRefineMobile from "./BrowseRefineMobile";
import { FaExclamationCircle } from "react-icons/fa";

class Browse extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      reloading: false,
      showError: false,
      products: [],
      refine: {
        term: "",
        shops: {
          asda: "1",
          coop: "1",
          tesco: "1",
          aldi: "1",
          sains: "1",
        },
        orderby: "1",
      },
      currentPage: 1,
      productsPerPage: 100,
      upperPageBound: 7,
      lowerPageBound: 0,
      isPrevBtnActive: "disabled",
      isNextBtnActive: "",
      pageBound: 7,
    };
    this.handleClick = this.handleClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnNextClick = this.btnNextClick.bind(this);
    this.btnPrevClick = this.btnPrevClick.bind(this);
    this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
    this.submitRefiner = this.submitRefiner.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  callAPI() {
    this.setState({ reloading: true });
    fetch("https://eshopapi.ryananderson.uk/api/browse", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.refine),
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({ loading: false, reloading: false, products: res })
      );
  }

  componentDidUpdate() {
    $("ul li.active").removeClass("active");
    $("ul li#" + this.state.currentPage).addClass("active");
  }

  handleClick(event) {
    let listid = Number(event.target.id);
    this.setState({
      currentPage: listid,
    });
    $("ul li.active").removeClass("active");
    $("ul li#" + listid).addClass("active");
    this.setPrevAndNextBtnClass(listid);
  }

  setPrevAndNextBtnClass(listid) {
    let totalPage = Math.ceil(
      this.state.products.length / this.state.productsPerPage
    );
    this.setState({ isNextBtnActive: "disabled" });
    this.setState({ isPrevBtnActive: "disabled" });
    if (totalPage === listid && totalPage > 1) {
      this.setState({ isPrevBtnActive: "" });
    } else if (listid === 1 && totalPage > 1) {
      this.setState({ isNextBtnActive: "" });
    } else if (totalPage > 1) {
      this.setState({ isNextBtnActive: "" });
      this.setState({ isPrevBtnActive: "" });
    }
  }

  btnIncrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound + this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound + this.state.pageBound,
    });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }

  btnDecrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound - this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound - this.state.pageBound,
    });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }

  btnPrevClick() {
    if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
      this.setState({
        upperPageBound: this.state.upperPageBound - this.state.pageBound,
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound - this.state.pageBound,
      });
    }
    let listid = this.state.currentPage - 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }

  btnNextClick() {
    if (this.state.currentPage + 1 > this.state.upperPageBound) {
      this.setState({
        upperPageBound: this.state.upperPageBound + this.state.pageBound,
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound + this.state.pageBound,
      });
    }
    let listid = this.state.currentPage + 1;
    this.setState({ currentPage: listid });
    this.setPrevAndNextBtnClass(listid);
  }

  handleSelect(selectedOption) {
    let x = selectedOption.value;
    this.setState({
      refine: {
        term: this.state.refine.term,
        shops: {
          asda: this.state.refine.shops.asda,
          coop: this.state.refine.shops.coop,
          tesco: this.state.refine.shops.tesco,
          aldi: this.state.refine.shops.aldi,
          sains: this.state.refine.shops.sains,
        },
        orderby: x,
      },
    });
  }

  submitRefiner(event) {
    let form = event.target;
    let clear = true;
    for (let i = 1; i < 6; i++) {
      if (form[i].checked) {
        clear = false;
      }
    }
    this.setState(
      {
        refine: {
          term: form[0].value,
          shops: {
            asda: form[1].checked ? 1 : 0,
            coop: form[5].checked ? 1 : 0,
            tesco: form[3].checked ? 1 : 0,
            aldi: form[2].checked ? 1 : 0,
            sains: form[4].checked ? 1 : 0,
          },
          orderby: this.state.refine.orderby,
        },
        showError: clear,
      },
      () => {
        if (!clear) {
          this.callAPI();
        } else {
          this.setState({ reloading: false });
        }
      }
    );
    event.preventDefault();
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    const {
      products,
      currentPage,
      productsPerPage,
      upperPageBound,
      lowerPageBound,
      isPrevBtnActive,
      isNextBtnActive,
    } = this.state;
    // Logic for displaying current products
    const indexOfLastTodo = currentPage * productsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - productsPerPage;
    const currentproducts = products.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderproducts = currentproducts.map((product) => {
      return <Product key={product.url} product={product} />;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      if (number === 1 && currentPage === 1) {
        return (
          <li key={number} className="page-item active" id={number}>
            <a href="#" className="page-link" onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      } else if (number < upperPageBound + 1 && number > lowerPageBound) {
        return (
          <li key={number} className="page-item" id={number}>
            <a
              href="#"
              className="page-link"
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </a>
          </li>
        );
      }
    });

    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound) {
      pageIncrementBtn = (
        <li className="page-item">
          <a href="#" className="page-link" onClick={this.btnIncrementClick}>
            {" "}
            &hellip;{" "}
          </a>
        </li>
      );
    }

    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
      pageDecrementBtn = (
        <li className="page-item">
          <a href="#" className="page-link" onClick={this.btnDecrementClick}>
            {" "}
            &hellip;{" "}
          </a>
        </li>
      );
    }

    let renderPrevBtn = null;
    if (isPrevBtnActive === "disabled") {
      renderPrevBtn = (
        <li className={isPrevBtnActive}>
          <span
            id="btnPrev"
            className="page-link disabled"
            style={{ color: "grey" }}
          >
            {" "}
            Prev{" "}
          </span>
        </li>
      );
    } else {
      renderPrevBtn = (
        <li className={isPrevBtnActive}>
          <a
            href="#"
            id="btnPrev"
            className="page-link"
            onClick={this.btnPrevClick}
          >
            {" "}
            Prev{" "}
          </a>
        </li>
      );
    }

    let renderNextBtn = null;
    if (isNextBtnActive === "disabled") {
      renderNextBtn = (
        <li className={isNextBtnActive}>
          <span
            id="btnNext"
            className="page-link disabled"
            style={{ color: "grey" }}
          >
            {" "}
            Next{" "}
          </span>
        </li>
      );
    } else {
      renderNextBtn = (
        <li className={isNextBtnActive}>
          <a
            href="#"
            id="btnNext"
            className="page-link"
            onClick={this.btnNextClick}
          >
            {" "}
            Next{" "}
          </a>
        </li>
      );
    }
    return (
      <div style={{ width: "100%" }}>
        <CircleLoader
          css={"display: block;margin: 0 auto;border-color: red;"}
          size={150}
          color={"var(--accent-1)"}
          loading={this.state.loading}
        />
        <p
          className={this.state.loading ? "" : "hidden"}
          style={{ textAlign: "center" }}
        >
          <br />
          Loading
        </p>
        <div className="browseProds">
          <MediaQuery minWidth={1224}>
            <BrowseRefinePC
              loading={this.state.loading}
              products={this.state.products.length}
              handleSelect={this.handleSelect}
              submitRefiner={this.submitRefiner}
            />
          </MediaQuery>
          <MediaQuery maxWidth={1224}>
            <BrowseRefineMobile
              loading={this.state.loading}
              products={this.state.products.length}
              handleSelect={this.handleSelect}
              submitRefiner={this.submitRefiner}
            />
          </MediaQuery>
          <ul className={this.state.loading ? "hidden" : "xyz"}>
            <CircleLoader
              css={"display: block;margin: 0 auto;border-color: red;"}
              size={150}
              color={"var(--accent-1)"}
              loading={this.state.reloading}
            />
            <div className={this.state.reloading ? "hidden" : ""}>
              {renderproducts}
            </div>
          </ul>
        </div>
        <ul
          className={
            this.state.loading || this.state.reloading ? "hidden" : "pagination"
          }
        >
          {renderPrevBtn}
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          {renderNextBtn}
        </ul>
        <div
          className={
            this.state.showError ? "confirmation alert alert-danger" : "hidden"
          }
        >
          <FaExclamationCircle />
          No Shops Selected!
        </div>
      </div>
    );
  }
}

export default Browse;
