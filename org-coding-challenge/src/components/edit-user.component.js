import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            phone: 1234567890,
            organizations: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:50000/users/" + this.props.match.params.id)
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    users: res.data.map(user => user.firstName),
                })
            }
        })
        axios.get("http://localhost:50000/users/" + this.props.match.params.id)
        .then(res => {
            this.setState({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                address: res.data.email,
                phone: res.data.phone
            })
        })
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
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

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone
        }

        console.log(user);
        axios.post("http://localhost:50000/users/update/" + this.props.match.params.id, user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response));

        window.location = "/Users";
        
    }

    render(){
        return(
            <div>
                <h1>Edit User Information</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User First Name: </label>
                        <input type="text" required className="form-control" value={this.state.firstName} onChange={this.onChangeFirstName} />
                    </div>
                    <div className="form-group">
                        <label>User Last Name: </label>
                        <input type="text" required className="form-control" value={this.state.lastName} onChange={this.onChangeLastName} />
                    </div>
                    <div className="form-group">
                        <label>User Email: </label>
                        <input type="text" required className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label>User Address: </label>
                        <input type="text" required className="form-control" value={this.state.address} onChange={this.onChangeAddress} />
                    </div>
                    <div className="form-group">
                        <label>User Phone Number: </label>
                        <input type="text" required className="form-control" value={this.state.phone} onChange={this.onChangePhone} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
} 