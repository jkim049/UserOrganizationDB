import React, { Component } from "react";
import axios from "axios";

export default class DeleteOrgUser extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            id: '',
            orgs: [],
            users: [],
        }
    }

    componentDidMount(){
        axios.get("http://localhost:50000/organizations/")
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    orgs: res.data.map(org => org.name),
                })
            }
        })

        axios.get("http://localhost:50000/organizations/" + this.props.match.params.id)
        .then(res => {
            this.setState({
                
            })
        })

        axios.get("http://localhost:50000/users/")
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    
                    users: res.data.map(user => user.firstName + " " + user.lastName),
                })
            }
        })
    }

    onChangeName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        var name = this.state.firstName;
        var res = name.split(" ");
        const user = {
            firstName: res[0],
            lastName: res[1]
        }
        axios.post("http://localhost:50000/organizations/deleteUser/" + this.props.match.params.id, user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response));
        
        //window.location = "/Organizations";
    }
    
    render(){
        return(
            <div>
                <h1>Remove Users</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Organization: </label>
                        <select ref="userInput" required className="form-control" value={this.state.name} onChange={this.onChangeId}>{
                                this.state.orgs.map(function(org) {
                                    return <option key={org} value={org}> {org} </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Users: </label>
                        <select ref="userInput" required className="form-control" value={this.state.firstName} onChange={this.onChangeName}>{
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}> {user} </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}