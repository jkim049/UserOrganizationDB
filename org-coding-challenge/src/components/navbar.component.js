import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {

    render(){
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg" style={{display: 'flex', alignItems: 'center' }} >
                <Link to="/" className="navbar-brand">CameraIQ Project</Link>
                <div className="column" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div className="collpase navbar-collapse" >
                      <ul className="navbar-nav mr-auto" style={{display: 'flex', flex: 1, flexDirection: 'row' }}>
                          <li className="navbar-item">
                              <Link to="/Organizations" className="nav-link">Organizations</Link>
                          </li>
                          <li className="navbar-item">
                              <Link to="/CreateOrganization" className="nav-link">Create Organization</Link>
                          </li>
                      </ul>
                  </div>

                  <div className="collpase navbar-collapse" >
                      <ul className="navbar-nav mr-auto" style={{display: 'flex', flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                          <li className="navbar-item">
                              <Link to="/Users" className="nav-link">Users</Link>
                          </li>
                          <li className="navbar-item">
                              <Link to="/CreateUser" className="nav-link">Create User</Link>
                          </li>
                      </ul>
                  </div>
                </div>
            </nav>
        )
    }

}