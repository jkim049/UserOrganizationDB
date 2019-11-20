import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Organization = props => (
    <tr>
        <td>{props.org.name}</td>
        <td>{props.org.address}</td>
        <td>{props.org.phone}</td>
        <td>{props.org.users + ""} </td>
        <td>
            <Link to={"/EditOrganization/" + props.org._id}>Edit </Link> |
            <a href="#" onClick={() => { props.deleteOrganization(props.org._id)}}> Delete </a> | 
            <Link to={'/AddOrgUser/' + props.org._id}> Add User </Link> | 
            <Link to={'/DeleteOrgUser/' + props.org._id}> Remove User </Link> 
        </td>
    </tr>
)

export default class OrgList extends Component {
    constructor(props){
        super(props);

        this.deleteOrganization = this.deleteOrganization.bind(this);
        this.state = { 
            organizations: [], 
            users: []

        };
    }

    componentDidMount() {
        axios.get("http://localhost:50000/organizations/")
        .then(res => {
            this.setState({ organizations: res.data });
        })
        .catch(err => console.log(err.response));
    }

    deleteOrganization(id){

        axios.delete("http://localhost:50000/organizations/" + id)
        .then(res => console.log(res.data));

        this.setState({
            organizations: this.state.organizations.filter(element => element._id !== id)
        })
    }

    organizationList() {
        return this.state.organizations.map(currentOrg => {
            return <Organization org = {currentOrg} deleteOrganization={this.deleteOrganization} key={currentOrg._id}/>;
        })
    }

    render(){
        return (
            <div>
                <h3>Organization</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Users List</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.organizationList() }
                    </tbody>
                </table>
            </div>
        )
    }
} 

