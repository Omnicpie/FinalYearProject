import React, { Component } from 'react';
import { BiSearchAlt } from "react-icons/bi";

class Search extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <form action="#" method="#" role="search">
                    <div className="input-group">
                        <input className="form-control" placeholder="Search . . ." name="srch-term" id="ed-srch-term" type="text"/>
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