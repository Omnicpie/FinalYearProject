import React, { Component } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import Product from "./Product";

class SearchResult extends Component {
  state = {
    search: {
      term: "",
    },
    results: [],
    loading: true,
    reloading: false,
  };

  callAPI() {
    this.setState({ reloading: true });
    fetch("https://eshopapi.ryananderson.uk/api/search", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.search),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length !== 0) {
          this.setState({ loading: false, reloading: false, results: res });
        } else {
          this.setState({
            loading: false,
            reloading: false,
            results: [
              {
                url: "",
                product_name: "No Products Found for that name",
                product_price: "",
                product_additionals: "Search again for more results",
              },
            ],
          });
        }
      })
      .catch((err) => {
        this.setState({
          loading: false,
          reloading: false,
          results: [
            {
              url: "",
              product_name: "No Products Found for that name",
              product_price: "",
              product_additionals: "Search again for more results",
            },
          ],
        });
      });
  }

  componentDidMount() {
    this.setState({ search: { term: this.props.match.params.term } }, () => {
      this.callAPI();
    });
  }
  render() {
    const { results } = this.state;

    const renderproducts = results.map((result, index) => {
      return <Product key={result.url} product={result} index={index + 1} />;
    });

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
        <br className={this.state.loading ? "hidden" : "xyx"} />
        <h1
          className={this.state.loading ? "hidden" : ""}
          style={{ textAlign: "center" }}
        >
          Search Results
        </h1>
        <hr className={this.state.loading ? "hidden" : ""} />
        <div className="browseProds">
          <ul className={this.state.loading ? "hidden" : "xyx"}>
            <CircleLoader
              css={"display: block;margin: 0 auto;border-color: red;"}
              size={150}
              color={"#123abc"}
              loading={this.state.reloading}
            />

            {/*<div className={this.state.reloading ? 'hidden': ''}>{renderTop}</div>
                        {/* whenClicked is a property not an event, per se. <br className={this.state.loading ? 'hidden': 'xyx'}/>
                        <br className={this.state.loading ? 'hidden': 'xyx'}/>
                        <h1 className={this.state.loading ? 'hidden': ''} style={{textAlign: "center"}}>Other Results</h1><hr className={this.state.loading ? 'hidden': ''}/>*/}
            <div className={this.state.reloading ? "hidden" : ""}>
              {renderproducts}
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchResult;
