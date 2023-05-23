'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const DBAbstraction = require('./DBAbstraction');

const db = new DBAbstraction('./data/software.sqlite');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('lifetrack/build'));

app.post('/newUser', async (req, res) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;

        await db.insertUser(firstName, lastName, email, password);

        res.json({"firstName" : firstName});
    }
    catch (err) {
        res.json(err);
    }
});

app.post('/validate', async (req, res) => {
    try {
        const credientials = await db.getCredentials(req.body.email, req.body.password);
        if(credientials == undefined) {
            res.json({result : false});
        } else {
            res.json(credientials);
        }
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/displayAllGoals', async (req, res) => {
    try {
        const allGoals = await db.getAllGoals(req.body.email);
        res.json(allGoals);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/activeGoals', async (req, res) => {
    try {
        const activeGoals = await db.getActiveGoals(req.body.email);
        res.json(activeGoals);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/inactiveGoals', async (req, res) => {
    try {
        const inactiveGoals = await db.getInactiveGoals(req.body.email);
        res.json(inactiveGoals);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/completeGoals', async (req, res) => {
    try {
        const completedGoals = await db.getCompleteGoals(req.body.email);
        res.json(completedGoals);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/getGoal', async (req, res) => {
    try {
        const goal = await db.getSpecificGoal(req.body.id);
        res.json(goal);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/newGoal', async (req, res) => {
    try {
        const userID = await db.getUserID(req.body.email);

        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
            
        const goalID = await db.insertGoal(title, description, status);

        await db.insertCollaborator(userID.id, goalID);
        const goals = await db.getAllGoals(req.body.email);

        res.json(goals);  
    }
    catch (err) {
        res.json(err);
    }
});

app.post('/getSteps', async(req, res) => {
    try {
        const steps = await db.getSteps(req.body.id);
        res.json(steps);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/getStep', async(req, res) => {
    try {
        const step = await db.getSpecificStep(req.body.id);
        res.json(step);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/getContacts', async(req, res) => {
    try {
        const goal = await db.getContacts(req.body.id);
        res.json(goal);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/getContact', async(req, res) => {
    try {
        const contact = await db.getSpecificContact(req.body.id);
        res.json(contact);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/updateGoal', async(req, res) => {
    try {
        await db.updateGoal(req.body.id, req.body.title, req.body.description, req.body.status);
        const goal = await db.getSpecificGoal(req.body.id);
        res.json(goal);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/updateStep', async(req, res) => {
    try {
        await db.updateStep(req.body.id, req.body.title, req.body.stepNum, req.body.status, req.body.notes);
        const steps = await db.getSteps(req.body.goalID);
        res.json(steps);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/updateContact', async(req, res) => {
    try {
        await db.updateContact(req.body.id, req.body.firstName, req.body.lastName, req.body.phoneNum, req.body.email);
        const contacts = await db.getContacts(req.body.goalID);
        res.json(contacts);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/stepsToUpdate', async(req, res) => {
    try {
        const stepsToUpdate = await db.getFollowingSteps(req.body.stepID, req.body.goalID);
        res.json(stepsToUpdate);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/updateStepNum', async(req, res) => {
    try {
        await db.updateStepNum(req.body.id);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/deleteStep', async(req, res) => {
    try {
        await db.deleteStep(req.body.stepID);
        const steps = await db.getSteps(req.body.goalID);
        res.json(steps);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/deleteContact', async(req, res) => {
    try {
        await db.deleteGoalContact(req.body.id);
        await db.deleteContact(req.body.id);
        const contacts = await db.getContacts(req.body.goalID);
        res.json(contacts);
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/deleteGoalSteps', async(req, res) => {
    try {
        await db.deleteGoalSteps(req.body.id);
        res.json({"finished" : "done"});
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/deleteSharedGoals', async(req, res) => {
    try {
        await db.deleteSharedGoal(req.body.id);
        res.json({"finished" : "done"});
    }
    catch(err) {
        res.json(err);
    }
});

app.post('/deleteGoal', async(req, res) => {
    try {
        await db.deleteGoal(req.body.id);
        console.log(req.body.email);
        const goals = await db.getAllGoals(req.body.email);
        res.json(goals);
    }
    catch(err) {
        res.json(err);
    }
});

// app.post('/newDetail', async (req, res) => {
//     try {
//         const goalID = await db.getGoalID(req.body.goalTitle);
//         if(goalID)
//         {
//             const title = req.body.title;
//             const description = req.body.description;
//             const goal_id = goalID.id;

//             await db.insertDetail(title, description, goal_id);
//             res.json({"result" : "success"});
//         } else {
//             res.json({"goal results" : "none"});
//         }
//     }
//     catch (err) {
//         res.json(err);
//     }
// });

app.post('/addContact', async (req, res) => {
    try {
        const contactID = await db.insertContact(req.body.firstName, req.body.lastName, req.body.phoneNum, req.body.email);
        await db.insertGoalContact(req.body.id, contactID);

        const contacts = await db.getContacts(req.body.id)
        res.json(contacts);
    }
    catch (err) {
        res.json(err);
    }
});

// app.post('/updateDescription', async (req, res) => {
//     try {
//         const goalID = await db.getGoalID(req.body.goalTitle);
//         const description = req.body.description;

//         await db.insertDescription(description, goalID.id);

//         res.json({"results" : "success"});
//     }
//     catch(err) {
//         res.json(err);
//     }
// });

app.post ('/addStep', async (req, res) => {
    try {
        await db.insertStep(req.body.title, req.body.stepNum, req.body.status, req.body.notes, req.body.id);
        const steps = await db.getSteps(req.body.id);
        res.json(steps);
    }
    catch (err) {
        res.json(err);
    }
    
});

// app.post ('/newAttribute', async (req, res) => {
//     try {
//         const stepID = await db.getStepID(req.body.stepTitle);

//         const title = req.body.title;
//         const description = req.body.description;

//         await db.insertAttribute(title, description, stepID.id);
//         res.json({"results" : "success"});
//     }
//     catch (err) {
//         res.json(err);
//     }
// });

// app.post ('/newNote', async (req, res) => {
//     const stepID = await db.getStepID(req.body.stepTitle);
//     try {
//         const description = req.body.description;

//         await db.insertNote(description, stepID.id);
//         res.json({"results" : "success"});
//     }
//     catch (err) {
//         res.json(err);
//     }
// });

// app.get('/searchByUser', async (req, res) => {
//     const firstName = req.body.firstName;
//     try {
//         const users = await db.getUser(firstName);
//         res.json(users)
//     }
//     catch (err) {
//         res.json(err);
//     }
// });

// app.post ('/addCollaborator', async (req, res) => {
//     try {
//         const userID = await db.getUserID(req.body.email);
//         const goalID = await db.getGoalID(req.body.goalTitle);

//         await db.insertCollaborator(userID.id, goalID.id);
//         res.json({"results" : "success"});
//     }
//     catch(err) {
//         res.json(err);
//     }
// });

// app.post ('/newCategory', async(req, res) => {
//     const categoryName = req.body.categoryName;
//     try {
//         await db.insertCategory(categoryName);
//         res.json({"results" : "success"});
//     }
//     catch(err) {
//         res.json(err);
//     }
// });

// app.get('/displayUserGoals', async (req, res) => {
//     try {
//         const userID = await db.getUserID(req.body.email);
//         const UserGoals = await db.getUserGoals(userID.id);
//         res.json(UserGoals);
//     }
//     catch(err) {
//         res.json(err);
//     }
// });

// app.get('/displaySharedGoals', async (req, res) => {
//     try {
//         const userID = await db.getUserID(req.body.email);
//         const sharedGoals = await db.getSharedGoals(userID.id);
//         res.json(sharedGoals);
//     }
//     catch(err) {
//         res.json(err);
//     }
// });

// app.get('/completedGoals', async (req, res) => {
//     try {
//         let completedGoals = [];
//         const userGoals = await db.getAllGoals(req.body.email);
//         for(let i = 0; i < userGoals.length; i++) {
//             const stepsAndStatus = await db.getStepsAndStatus(userGoals[i]["title"]);
//             let retVal = true;
//             for(let j = 0; j < stepsAndStatus.length; j++) {
//                 if(stepsAndStatus[j]["status"]  === "incomplete") {
//                     retVal = false;
//                     break;
//                 }
//             }
//             if(retVal === true) {
//                 completedGoals.push(userGoals[i]);
//             }
//         }
//         res.json(completedGoals);
//     }
//     catch (err) {
//         res.json(err);
//     }
// });

// app.get('/filterCategory', async(req, res) => {
//     try {
//         const categoryGoals = await db.getByCategory(req.body.email, req.body.category);
//         res.json(categoryGoals);
//     }
//     catch(err){
//         res.json(err);
//     }
// });

// app.get('/search', async(req, res) => {
//     try {
//         const searchResults = await db.getBySearchGoal(req.body.email, req.body.title);
//         res.json(searchResults);
//     }
//     catch(err) {
//         res.json(err);
//     }
// });

// app.get('/contact', async (req, res) => {
//     try {
//         const goalContact = await db.getContact(req.body.goalTitle);
//         res.json(goalContact);
//     }
//     catch(err) {
//         res.json(err);
//     }
// });

// get goal and step data

// app.post('/reset-password', async (req, res) => {
//     try {
//         await db.resetPassword(req.body.oldPassword, req.body.newPassword);
//         res.json({"result" : "success"});
//     }
//     catch(err) {
//         res.json(err);
//     }
// });

app.use((req,res) => {
    res.status(404).json({badRequest: `${req.url} cannot be found here`});
});

db.init()
    .then(() => {
        app.listen(53140, () => console.log('The server is up and running...'));
    })
    .catch(err => {
        console.log('Problem setting up the database');
        console.log(err);
    });