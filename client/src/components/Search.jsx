import React, { Component } from 'react';
import { BiSearchAlt } from "react-icons/bi";

class Search extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <form action="#" method="#" role="search">
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