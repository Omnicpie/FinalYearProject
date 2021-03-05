import React, { Component } from 'react';

class Cookies extends Component {
    state = {  }
    render() { 
        return ( 
         <div style={{width: "80%", margin: "0 auto "}}>
            <h1 style={{marginTop: "20pt"}}>Our use of cookies and similar technologies</h1>
            <br/>
            <p style={{fontSize: "12pt"}}>Our services use cookies and other similar technologies, such as local storage, to help provide you with a better, faster, and safer experience. Here are some of the ways that our website use these technologies: to log you in, save your preferences, personalize the content you see, and the layout of the system</p>
            <h2>What are cookies and local storage?</h2>
            <br/>
            <p style={{fontSize: "12pt"}}>Cookies are small files that websites place on your computer as you browse the web. Like many websites, Twitter, Periscope, and our other services use cookies to discover how people are using our services and to make them work better.</p>
            <p style={{fontSize: "12pt"}}>Local storage is an industry-standard technology that allows a website or application to store information locally on your computer or mobile device. We use local storage to customize what we show you based on your past interactions with our services.</p>
            <h2>Why do our services use these technologies?</h2>
            <p style={{fontSize: "12pt"}}>Our services use these technologies to deliver, measure, and improve our services in various ways. These uses generally fall into one of the following categories:</p>
            <ul>
                <li><b>Authentication and security:</b></li>
                <ul>
                    <li>To log you into Best Basket.</li>
                    <li>To let you to view certain content.</li>
                    <li>For example, these technologies help authenticate your access to Best Basket and prevent unauthorized parties from accessing your account.</li>
                </ul>
            </ul>
            <ul>
                <li><b>Preferences:</b></li>
                <ul>
                    <li>To remember information about your browser and your preferences.</li>
                    <li>For example, cookies help to remember your cookie preferences and the colour scheme affecting the layout of the site for the next time your access Best Basket.</li>
                </ul>
            </ul>
            <h2>Where are these technologies used?</h2>
            <p style={{fontSize: "12pt"}}>These cookies are only used within the Best Basket website and are not shared outside your local machine.</p>
            <br/>
            <br/>
            <br/>
         </div>
            );
    }
}
 
export default Cookies;