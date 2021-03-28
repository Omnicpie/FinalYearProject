import React, { Component } from 'react';
import { FaDownload, FaTimes } from 'react-icons/fa';
import Select from 'react-select';

class Modal extends Component {
    state = { 
        isSearchable: false,
     }

    render() { 
        const showClass = (this.props.show) ? "modal showModal" : "modal hideModal";
        let x = this.props.overwrite;
        const found = this.props.userBaskets.find(element => element.value == x);

        const styles = {
            select: base => ({
                ...base,
                border: `0px`
            }),
            option: (provided, state) => {
                const background = "var(--background-1)"; 
                return {...provided, background};
            }
        };
        return ( 
            <div className={showClass}>
                <section className="modal-main" style={{padding: "20pt"}}>
                    <div className="modal-top">
                        <FaDownload style={{margin: "auto 0", height: "1.75rem", width: "1.75rem"}}/>
                        <h3 style={{margin: "auto 0", marginLeft: "5pt"}}>Save Basket</h3>
                        <div className="modal-close"><button className="button" style={{background: "none", border: "none"}} type="button"onClick={this.props.handleClose}><FaTimes/></button></div>
                    </div>
                    <div className="modal-content">
                        <form id="save" onSubmit={this.props.saveBasket}>
                            <h4 style={{fontSize: "1.2rem"}}>Create New Save</h4><hr style={{backgroundColor: "var(--text-1)"}}/>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" defaultChecked id="new" name="savetype" value="new"/>
                                <label className="form-check-label" htmlFor="new" style={{fontSize: "0.9rem"}}>Create New Save</label>
                            </div>
                            <input type="text" name="savename" className="form-control save-name-input" placeholder="Input Save Name..." /><br/><br/>
                            <h4 style={{fontSize: "1.2rem"}}>Overwrite an Existing Save</h4><hr style={{backgroundColor: "var(--text-1)"}}/>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" id="overwrite" name="savetype" value="ow"/>
                                <label className="form-check-label" htmlFor="overwrite" style={{fontSize: "0.9rem"}}>Overwrite</label>
                            </div>
                            <Select options={this.props.userBaskets} value={found} styles={styles} onChange={this.props.handleSelect} isSearchable={false} theme={theme => ({...theme, borderRadius: "10px", colors: {...theme.colors, primary: "var(--accent-1)", primary25: "var(--background-1)", primary50: "var(--text-1)", primary75: "var(--text-1)", neutral0: "var(--background-2)", neutral80: "var(--text-1)"}})}/>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className="" style={{height: "min-content"}}><button className="button b-save" style={{height: "min-content"}} type="submit" form="save">Save</button></div>
                        <div className=""><button className="button b-close" style={{background: "none"}} type="button"onClick={this.props.handleClose}>Close</button></div>
                    </div>
                </section>
            </div>
        );
    }
}
 
export default Modal;