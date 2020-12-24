import React, { Component } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import { useHistory } from 'react-router-dom';


class Search extends Component {
    constructor(){
        super();
        this.state = {

        }
        this.submit = this.submit.bind(this);
    }

    submit(event){
        let term = event.target[0].value

    }

    render() { 
        return ( 
            <div>
                <form action="/search" method="#" role="search" onSubmit={this.submit}>
                    <div className="input-group">
                        <input className="form-control form-control-search" placeholder="Search for products or use the navigation above. . ." name="srch-term" id="ed-srch-term" type="text"/>
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