import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = props => (
    <tr>
        <td>{props.user.firstName}</td>
        <td>{props.user.lastName}</td>
        <td>{props.user.email}</td>
        <td>{props.user.address}</td>
        <td>{props.user.phone}</td>
        <td>{props.user.organizations + ""}</td>
        <td>
            <Link to={"/EditUser/" + props.user._id}>Edit </Link> |
            <a href="#" onClick={() => { props.deleteUser(props.user._id)}}> Delete</a> | 
            <Link to={'/AddUserOrg/' + props.user._id}> Add Org </Link> | 
            <Link to={'/DeleteUserOrg/' + props.user._id}> Remove Org </Link> 
        </td>
    </tr>
)

export default class UserList extends Component {
    constructor(props){
        super(props);

        this.deleteUser = this.deleteUser.bind(this);
        this.state = { users: [] };
    }

    componentDidMount() {
        axios.get("http://localhost:50000/users/")
        .then(res => {
            this.setState({ users: res.data });
        })
        .catch(err => console.log(err.response));
    }

    deleteUser(id){
        axios.delete("http://localhost:50000/users/" + id)
        .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(element => element._id !== id)
        })
    }

    userList() {
        return this.state.users.map(currentUser=> {
            return <User user = {currentUser} deleteUser={this.deleteUser} key={currentUser._id}/>;
        })
    }

    render(){
        return (
            <div>
                <h3>Users</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Organizations List</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        )
    }
} 

