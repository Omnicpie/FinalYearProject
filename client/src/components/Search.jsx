import React, { Component } from 'react';
import { BiSearchAlt } from "react-icons/bi";


class Search extends Component {
    constructor(){
        super();
        this.state = {

        }
        this.submit = this.submit.bind(this);
    }

    submit(event){
        let term = event.target[0].value
        this.props.history.push("/search/"+term);
        this.props.notSearch();
        event.preventDefault();
    }

    render() { 
        return ( 
            <div>
                <form action="#" method="#" role="search" onSubmit={this.submit}>
                    <div className="input-group">
                        <input className="form-control form-control-search" placeholder="Search for products. . ." name="srch-term" id="ed-srch-term" type="text"/>
                        <div className="input-btn">
                            <button type="submit" id="searchbtn"><BiSearchAlt/></button>
                        </div>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default Search;