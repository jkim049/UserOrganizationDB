import React, { Component } from "react";
import axios from "axios";

export default class CreateOrganization extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            phone: 1234567890,
            users: []
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const organization = {
            name: this.state.name,
            address: this.state.address,
            phone: this.state.phone
        }

        console.log(organization);
        axios.post("http://localhost:50000/organizations/createOrg", organization)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response));
        
        this.setState = ({
            name: '',
            address: '',
            phone: 1234567890,
            users: []
        })
    }

    render(){
        return(
            <div>
                <h1>Create New Organization</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Organization Name: </label>
                        <input type="text" required className="form-control" value={this.state.name} onChange={this.onChangeName} />
                    </div>
                    <div className="form-group">
                        <label>Organization Address: </label>
                        <input type="text" required className="form-control" value={this.state.address} onChange={this.onChangeAddress} />
                    </div>
                    <div className="form-group">
                        <label>Organization Phone Number: </label>
                        <input type="text" required className="form-control" value={this.state.phone} onChange={this.onChangePhone} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Organization" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}