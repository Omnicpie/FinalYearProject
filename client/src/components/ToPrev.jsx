import React, { Component } from 'react';
import { Redirect } from 'react-router';

class ToPrev extends Component {
    state = {  }
    render() { 
        const pathname= "/"+ this.props.match.params.term
        console.log(pathname)
        return ( <Redirect to={{pathname: pathname}}/> );
    }
}
 
export default ToPrev;