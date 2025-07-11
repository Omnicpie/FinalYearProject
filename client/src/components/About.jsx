import React, { Component } from 'react';

class About extends Component {
    constructor() {
        super();
        this.state = { 
            lastupdate: []
        }
    }
    callAPI(){
        fetch("https://eshopapi.ddns.net/api/shops")
            .then(res => res.json())
            .then(res => res.map((item)=> [item.shop, item.date.toString()]))
            .then(res => this.setState({ lastupdate: res }));
    }

    componentDidMount(){
        this.callAPI();
    }
    render() { 
        const {lastupdate} = this.state;
        const shopUpdates = lastupdate.map((shop) => {
            let date = new Date(shop[1]);
            let shop1 = shop[0];
            return <li key={shop[0]}><b>{shop1}</b>: {date.toLocaleDateString()} @ {date.toLocaleTimeString()} </li>;
        });
        return ( 
            <div>
                <h1 style={{marginTop: "10pt"}}>About this system.</h1>
                <hr/>
                <p style={{textAlign: "center"}}>A system for comparing supermarkets in the UK, with individual product searching or entire basket searching to find the best deals.</p>

                <h3 style={{textAlign: "center"}}>What we currently offer</h3>
                <ul style={{textAlign: "center", listStyle: "none"}}>
                    <li className="shopList"><a href="https://www.asda.com/"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Asda_logo.svg/300px-Asda_logo.svg.png" alt="Asda" className="ShopIcon" style={{color: "var(--text-1)", marginRight:"15pt", height: "25px"}}/></a></li>
                    <li className="shopList"><a href="https://aldi.co.uk/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/AldiWorldwideLogo.svg/500px-AldiWorldwideLogo.svg.png" alt="Aldi" className="ShopIcon" style={{color: "var(--text-1)", marginRight:"15pt", height: "55px"}}/></a></li>
                    <li className="shopList"><a href="https://tesco.co.uk/"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Tesco_Logo.svg/200px-Tesco_Logo.svg.png" alt="Tesco" className="ShopIcon" style={{color: "var(--text-1)", marginRight:"15pt", height: "25px"}}/></a></li>
                    <li className="shopList"><a href="https://sainsburys.co.uk/"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Sainsbury%27s_Logo.svg" alt="Sainsburys" className="ShopIcon" style={{color: "var(--text-1)", marginRight:"15pt", height: "25px"}}/></a></li>
                    <li className="shopList"><a href="https://coop.co.uk/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/The_Co-Operative_clover_leaf_logo.svg/500px-The_Co-Operative_clover_leaf_logo.svg.png" alt="CO-OP" className="ShopIcon" style={{color: "var(--text-1)", marginRight:"15pt", height: "35px"}}/></a></li>
                </ul>
                <p style={{width: "90%", margin: "auto"}}>We update our prices regularly to keep our information as accurate as possible.<br/>Below are the most recent updates for each shop:</p>
                <ul style={{textAlign: 'center'}}>{shopUpdates}</ul>
                <div style={{width: "95%", margin: "auto"}}> 
                    <h2>Delivery Information</h2>
                    <p>All providers have their delivery information on their own systems, we try to keep ours as accurate but it may not always be perfect, currently we have the following for shop delivery information that we use when finding the Best Basket</p>
                    <ul style={{width: "max-content", margin: "auto"}}>
                        <li>Asda</li>
                        <ul>
                            <li>£3 on baskets under £40</li>
                        </ul>
                        <li>Co-op</li>
                        <ul>
                            <li>Minimum Spend £15</li>
                            <li>Free Standard Delivery</li>
                        </ul>
                        <li>Tesco</li>
                        <ul>
                            <li>£5.50 Flat Standard Delivery</li>
                        </ul>
                        <li>Aldi</li>
                        <ul>
                            <li>Free over £30</li>
                            <li>£2.95 on baskets under £30</li>
                        </ul>
                        <li>Sainsburys</li>
                        <ul>
                            <li>Minimum Spend £25</li>
                            <li>£7 for baskets under £40</li>
                        </ul>
                    </ul>
                </div>
            </div>
         );
    }
}
 

export default About;
