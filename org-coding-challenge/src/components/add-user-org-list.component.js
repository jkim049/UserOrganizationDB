import React, { Component } from "react";
import axios from "axios";

export default class AddUserOrg extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            id: '',
            orgs: [],
            users: [],
        }
    }

    componentDidMount(){
        axios.get("http://localhost:50000/users/")
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    users: res.data.map(user => user.firstName + " " + user.lastName),
                })
            }
        })

        axios.get("http://localhost:50000/users/" + this.props.match.params.id)
        .then(res => {
            this.setState({
            
            })
        })

        axios.get("http://localhost:50000/organizations/")
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    orgs: res.data.map(org => org.name),
                })
            }
        })
        
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const organization = {
            organization: this.state.name
        }
        console.log(this.state.name);
        console.log(organization);
        axios.post("http://localhost:50000/users/addOrg/" + this.props.match.params.id, organization)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response));
        
        //window.location = "/Users";
    }
    
    render(){
        return(
            <div>
                <h1>Add Organizations</h1>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Users: </label>
                        <select ref="userInput" required className="form-control" value={this.state.userName} onChange={this.onChangeName}>{
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}> {user} </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Organizations: </label>
                        <select ref="userInput" required className="form-control" value={this.state.name} onChange={this.onChangeName}>{
                                this.state.orgs.map(function(org) {
                                    return <option key={org} value={org}> {org} </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}