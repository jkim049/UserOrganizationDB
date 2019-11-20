import express from "express";
import User from "../models/user.model";

const router = express.Router();

//Get all Users
router.route("/").get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

//Add user to database.
//No functionality to add orgs directly to user profile.
router.route("/createUser").post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const address = req.body.address;
    const phone = Number(req.body.phone);

    const newUser = new User({
        firstName, lastName, email, address, phone
    });

    newUser.save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Get user by ID
router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

//Delete User
router.route("/:id").delete((req, res) =>{
    User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User Deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Update User Info
router.route("/update/:id").post((req, res) =>{
    User.findById(req.params.id)
    .then(user => {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.address = req.body.address;
        user.phone = Number(req.body.phone);

        user.save()
        .then(() => res.json("User updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));

    
});

//Update User Org affiliations
router.route("/addOrg/:id").post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        const orgAdd = req.body.organization;
        console.log(orgAdd);
        if(orgAdd && !user.organizations.includes(orgAdd)){
            user.organizations.push(orgAdd);
            user.save()
            .then(() => res.json("Organization added to user profile!"))
            .catch(err => res.status(400).json("Error: " + err));
        }else{
            if(!orgAdd){
                res.json("Organization provided is undefined!");
            }else{
                res.json("Organization affiliation already exists!");
            }
        }
    })
    .catch(err => res.status(400).json("Error: "+ err));
});

//Return list of user orgs
router.route("/getUserOrgs/:id").get((req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user.organizations))
    .catch(err => res.status(400).json("Error: " + err));
});

//Delete the org from the user profilee
router.route("/deleteOrg/:id").post((req, res) => {
    User.findById(req.params.id)
    .then(user => {
        var removeOrg = req.body.organization;
        //If the array doesn't contain the org return
        if(!user.organizations.includes(removeOrg)){
            res.json("User is not affiliated to the Organization!");
            return;
        }
        //Remove the org from the array
        user.organizations.splice(user.organizations.indexOf(removeOrg), 1);

        user.save()
        .then(() => res.json("Organization deleted from user profile!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

export default router;