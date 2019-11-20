import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";

import CreateOrg from "./components/create-organization.component.js";
import EditOrg from "./components/edit-organization.component.js";
import OrgList from "./components/organization-list.component.js";
import AddOrgUser from "./components/add-org-user-list.component.js";
import DeleteOrgUser from "./components/delete-org-user-list.component.js";

import CreateUser from "./components/create-user.component.js";
import EditUser from "./components/edit-user.component.js";
import UserList from "./components/user-list.component.js";
import AddUserOrg from "./components/add-user-org-list.component.js";
import DeleteUserOrg from "./components/delete-user-org-list.component.js";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/CreateOrganization" exact component={CreateOrg} />
        <Route path="/EditOrganization/:id" exact component={EditOrg} />
        <Route path="/Organizations" exact component={OrgList} />
        <Route path="/AddOrgUser/:id" exact component={AddOrgUser} />
        <Route path="/DeleteOrgUser/:id" exact component={DeleteOrgUser} />

        <Route path="/CreateUser" exact component={CreateUser} />
        <Route path="/EditUser/:id" exact component={EditUser} />
        <Route path="/Users" exact component={UserList} />
        <Route path="/AddUserOrg/:id" exact component={AddUserOrg} />
        <Route path="/DeleteUserOrg/:id" exact component={DeleteUserOrg} />
      </div>
    </Router>
  );
}

export default App;
