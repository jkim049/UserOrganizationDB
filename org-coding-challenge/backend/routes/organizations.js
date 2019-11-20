import express from "express";
import Organization from "../models/organization.model";

const router = express.Router();

//Get all Organizations
router.route('/').get((req, res) =>{
    Organization.find()
    .then(organization => res.json(organization))
    .catch(err => res.status(400).json("Error: " + err));
});

//Add organization
router.route('/createOrg').post((req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const phone = Number(req.body.phone);

    const newOrganization = new Organization({
        name, address, phone
    });

    newOrganization.save()
    .then(() => res.json("Organization added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Get Organization by ID
router.route('/:id').get((req, res) => {
    Organization.findById(req.params.id)
    .then(organization => res.json(organization))
    .catch(err => res.status(400).json("Error: " + err));
});

//Delete Organization
router.route('/:id').delete((req, res) => {
    Organization.findByIdAndDelete(req.params.id)
    .then(() => res.json("Organization Deleted!"))
    .catch(err => res.status(err).json("Error: " + err));
})

//Add user to Organization affiliation list
router.route('/addUser/:id').post((req, res) => {
    Organization.findById(req.params.id)
    .then(organization => {
        var username = req.body.firstName + " " + req.body.lastName;
        if(username === undefined || username == null || username.length <= 0){
            res.json("Null being added");
            return;
        }
        if(!organization.users.includes(username)){
            organization.users.push(username);
            organization.save()
            .then(() => res.json(username + " added to " + organization.name))
            .catch(err => res.status(400).json("Error: " + err));
        }else{
            res.json("User already afilliated!");
        }
    })
    .catch(err => res.status(400).json("Error: " + err));
})

//Update Organization description / Information
router.route('/update/:id').post((req, res) => {
    Organization.findById(req.params.id)
    .then(organization => {
        organization.name = req.body.name;
        organization.address = req.body.address;
        organization.phone = Number(req.body.phone);

        organization.save()
        .then(() => res.json("Organization updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//Delete the user from the organization profile
router.route("/deleteUser/:id").post((req, res) => {
    Organization.findById(req.params.id)
    .then(organization => {
        const removeUser = req.body.firstName + " " + req.body.lastName;
        if(organization.users.includes(removeUser)){
            //Remove the user from the organization
            organization.users.splice(organization.users.indexOf(removeUser), 1);
            organization.save()
            .then(() => res.json("User deleted from organization profile!"))
            .catch(err => res.status(400).json("Error: " + err));
        }else{
            //If the array doesn't contain the user return
            res.json("User is not affiliated!");
        }
        
    })
    .catch(err => res.status(400).json("Error: " + err));
});

//Return list of user orgs
router.route("/getOrgUsers/:id").get((req, res) => {
    Organization.findById(req.params.id)
    .then(organization => res.json(organization.users))
    .catch(err => res.status(400).json("Error: " + err));
});

export default router;