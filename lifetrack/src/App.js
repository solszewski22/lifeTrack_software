import React, {useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './pages/Navbar';
import ShowNavbar from './pages/ShowNavbar';
import ShowSidebar from './pages/ShowSidebar';
import Sidebar from './pages/Sidebar';
import NewGoalOverview from './pages/CreateGoal';
import View from './pages/View';
import Edit from './pages/Edit';
import EditStep from './pages/EditStep';
import EditContact from './pages/EditContact';

function App() {
    const [firstName, setfirstName] = useState();
    const [email, setEmail] = useState();

    const [goals, setGoals] = useState([]);
    const [currGoal, setCurrGoal] = useState([]);
    const [currSteps, setCurrSteps] = useState([]);
    const [currStep, setCurrStep] = useState([]);
    const [currGoalID, setCurrGoalID] = useState();
    const [currStepID, setCurrStepID] = useState();
    const [currContacts, setCurrContacts] = useState([]);
    const [currContact, setCurrContact] = useState([]);
    const [currContactID, setCurrContactID] = useState();

    const [status, setStatus] = useState("Login");
    const navigate = useNavigate();

    async function displayName (user) { 
      try {
          const userData = { 
              email: user.email,
              password: user.password
          }; 
          setEmail(userData.email);

          const fetchConfigData = { 
              method: "POST", 
              body: JSON.stringify(userData),  
              headers: { 
                  "Content-Type": "application/json" 
              } 
          }; 
    
          const response = await fetch("/validate", fetchConfigData); 
    
          if(response.ok) { 
              const first = await response.json();
              setfirstName(first.firstName);
              setStatus("Logout");
              displayAllGoals();
          } else { 
              console.log("Error with the response data"); 
          } 
    
      } catch (err) { 
          console.log(`Error: ${err}`); 
      } 
    };

    async function addUser (user) { 
      try {
          const userData = { 
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
          }; 
          setEmail(userData.email);
          const fetchConfigData = { 
              method: "POST", 
              body: JSON.stringify(userData),  
              headers: { 
                  "Content-Type": "application/json" 
              } 
          }; 
    
          const response = await fetch("/newUser", fetchConfigData); 
    
          if(response.ok) { 
              const user = await response.json();
              setfirstName(user.firstName);
              setStatus("Logout");
              displayAllGoals();
              navigate('/dashboard');
          } else { 
              console.log("Error with the response data"); 
          } 
    
      } catch (err) { 
          console.log(`Error: ${err}`); 
      } 
    };

    async function displayAllGoals () { 
      try { 
        const userData = { 
            email: email
          }; 
          console.log(userData.email);
          const fetchConfigData = { 
              method: "POST", 
              body: JSON.stringify(userData),  
              headers: { 
                  "Content-Type": "application/json" 
              } 
          }; 
        
        const response = await fetch('/displayAllGoals', fetchConfigData); 
 
        if(response.ok) { 
            const goalsToDisplay = await response.json();
            setGoals(goalsToDisplay);
            navigate('/dashboard');
        } else { 
            console.log("Error with the response data"); 
        } 
 
        } catch(err) { 
            console.log(`Error getting goals: ${err}`); 
        }
    };

    async function displayActiveGoals () { 
        try { 
          const userData = { 
              email: email
            }; 
      
            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(userData),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            }; 
          
          const response = await fetch('/activeGoals', fetchConfigData); 
   
          if(response.ok) { 
              const goalsToDisplay = await response.json();
              setGoals(goalsToDisplay);
              navigate('/active');
          } else { 
              console.log("Error with the response data"); 
          } 
   
          } catch(err) { 
              console.log(`Error getting goals: ${err}`); 
          }
      };

      async function displayInactiveGoals () { 
        try { 
          const userData = { 
              email: email
            }; 
      
            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(userData),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            }; 
          
          const response = await fetch('/inactiveGoals', fetchConfigData); 
   
          if(response.ok) { 
              const goalsToDisplay = await response.json();
              setGoals(goalsToDisplay);
              navigate('/inactive');
          } else { 
              console.log("Error with the response data"); 
          } 
   
          } catch(err) { 
              console.log(`Error getting goals: ${err}`); 
          }
      };

      async function displayCompleteGoals () { 
        try { 
          const userData = { 
              email: email
            }; 
      
            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(userData),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            }; 
          
          const response = await fetch('/completeGoals', fetchConfigData); 
   
          if(response.ok) { 
              const goalsToDisplay = await response.json();
              setGoals(goalsToDisplay);
              navigate('/complete');
          } else { 
              console.log("Error with the response data"); 
          } 
   
          } catch(err) { 
              console.log(`Error getting goals: ${err}`); 
          }
      };

      async function getSpecificGoal (goalID) { 
        try { 
          const userData = { 
              id: goalID.id
            }; 
            setCurrGoalID(goalID.id);
            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(userData),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            }; 
          
          const response = await fetch('/getGoal', fetchConfigData); 
   
          if(response.ok) { 
              const goalToDisplay = await response.json();
              setCurrGoal(goalToDisplay);

              const result = await  fetch('/getSteps', fetchConfigData);
              
              if(response.ok) {
                const stepsToSet = await result.json();
                setCurrSteps(stepsToSet);

                const conResult = await fetch('/getContacts', fetchConfigData);
                if(response.ok) {
                    const contactsToSet = await conResult.json();
                    setCurrContacts(contactsToSet);
                }
                else {
                    console.log("Error with the result data");
                }
              }
              else {
                console.log("Error with the result data");
              }
              navigate('/view');
          } else { 
              console.log("Error with the response data"); 
          } 
   
          } catch(err) { 
              console.log(`Error getting goals: ${err}`); 
          }
      };

      async function getSpecificStep(step) {
        try {
            const stepID = {
                id: step.id
            }
            setCurrStepID(step.id);
            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(stepID),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            };

            const response = await fetch('/getStep', fetchConfigData); 

            if(response.ok) {
                const stepToDisplay = await response.json();
                setCurrStep(stepToDisplay);
                navigate('/editStep');
            }
            else {
                console.log("Error with the result data");
            }

        } catch(err) {
            console.log(`Error getting goals: ${err}`);
        }
      };

      async function getSpecificContact(contact) {
        try {
            const contactID = {
                id: contact.id
            }
            setCurrContactID(contact.id);
            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(contactID),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            };

            const response = await fetch('/getContact', fetchConfigData); 

            if(response.ok) {
                const contactToDisplay = await response.json();
                setCurrContact(contactToDisplay);
                navigate('/editContact');
            }
            else {
                console.log("Error with the result data");
            }

        } catch(err) {
            console.log(`Error getting goals: ${err}`);
        }
      };

      async function addGoal (goal) { 
        try {
            const goalData = { 
              email: email,
              title: goal.title,
              description: goal.description,
              status: goal.status
            }; 

            // setGoalTitle(goalData.title);
            setCurrGoal(goalData);

            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(goalData),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            }; 
      
            const response = await fetch("/newGoal", fetchConfigData); 
      
            if(response.ok) { 
                const goals = await response.json();
                setGoals(goals);
                console.log(goals);
                navigate('/dashboard');
            } else { 
                console.log("Error with the response data"); 
            } 
      
        } catch (err) { 
            console.log(`Error: ${err}`); 
        } 
      };

      async function addEdits (edits) {
        try {
            const overview = {
                id: currGoalID,
                title: edits.title,
                status: edits.status,
                description: edits.description
            }

            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(overview), 
                headers: { 
                    "Content-Type": "application/json" 
                } 
            };

            const response = await fetch("/updateGoal", fetchConfigData); 
      
            if(response.ok) {
                const updatedGoal = await response.json();
                setCurrGoal(updatedGoal);

                for(let i = 0; i < edits.steps.current.length; i++)
                {
                    const step = {
                        id: currGoalID,
                        stepNum: edits.steps.current[i].stepNum,
                        title: edits.steps.current[i].title,
                        status: edits.steps.current[i].status,
                        notes: edits.steps.current[i].notes
                    }

                    const fetchConfigData = { 
                        method: "POST", 
                        body: JSON.stringify(step), 
                        headers: { 
                            "Content-Type": "application/json" 
                        } 
                    };

                    const response = await fetch("/addStep", fetchConfigData); 
                    if(response.ok) {
                        const stepsToDisplay = await response.json();
                        setCurrSteps(stepsToDisplay);
                    } else { 
                        console.log("Error with the response data"); 
                    } 
                }

                for(let i = 0; i < edits.contacts.current.length; i++)
                {
                    const contact = {
                        id: currGoalID,
                        firstName: edits.contacts.current[i].firstName,
                        lastName: edits.contacts.current[i].lastName,
                        phoneNum: edits.contacts.current[i].phoneNum,
                        email: edits.contacts.current[i].email
                    }

                    const fetchConfigData = { 
                        method: "POST", 
                        body: JSON.stringify(contact), 
                        headers: { 
                            "Content-Type": "application/json" 
                        } 
                    };

                    const response = await fetch("/addContact", fetchConfigData); 
                    if(response.ok) {
                        const contactsToDisplay = await response.json();
                        setCurrContacts(contactsToDisplay);
                    } else { 
                        console.log("Error with the response data"); 
                    } 
                }

                navigate('/view');
            } else { 
                console.log("Error with the response data"); 
            }

        }
        catch (err) { 
            console.log(`Error: ${err}`); 
        } 
      };

      async function addStepEdits(step) {
        try {
            const edits = {
                id: currStepID,
                stepNum: step.stepNum,
                title: step.title,
                status: step.status,
                notes: step.notes,
                goalID: currGoalID
            }

            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(edits),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            };

            const response = await fetch('/updateStep', fetchConfigData); 

            if(response.ok) {
                const stepsToDisplay = await response.json();
                setCurrSteps(stepsToDisplay);
                navigate('/edit');
            }
            else {
                console.log("Error with the result data");
            }

        } catch(err) {
            console.log(`Error getting goals: ${err}`);
        }
      }

      async function addContactEdits(contact) {
        try {
            const edits = {
                id: currContactID,
                firstName: contact.firstName,
                lastName: contact.lastName,
                phoneNum: contact.phoneNum,
                email: contact.email,
                goalID: currGoalID
            }

            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(edits),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            };

            const response = await fetch('/updateContact', fetchConfigData); 

            if(response.ok) {
                const contactsToDisplay = await response.json();
                console.log(contactsToDisplay);
                setCurrContacts(contactsToDisplay);
                console.log(currContacts);
                navigate('/edit');
            }
            else {
                console.log("Error with the result data");
            }

        } catch(err) {
            console.log(`Error getting goals: ${err}`);
        }
      }

      async function deleteSteps(steps) {
        try {
            for(let i = 0; i < steps.current.length; i++)
            {
                const stepID = {
                    stepID: steps.current[i],
                    goalID: currGoalID  
                }

                const fetchConfigData = { 
                    method: "POST", 
                    body: JSON.stringify(stepID),  
                    headers: { 
                        "Content-Type": "application/json" 
                    } 
                };
    
                const response = await fetch('/stepsToUpdate', fetchConfigData); 
    
                if(response.ok) {
                    const stepsToUpdate = await response.json();
                    for(let i = 0; i < stepsToUpdate.length; i++) {
                        const stepID = {
                            id: stepsToUpdate[i].id
                        };

                        const fetchConfigData = { 
                            method: "POST", 
                            body: JSON.stringify(stepID),  
                            headers: { 
                                "Content-Type": "application/json" 
                            } 
                        };
            
                        const response1 = await fetch('/updateStepNum', fetchConfigData);
                        if(!response1.ok) {
                            console.log("Error with the result data");
                        }
                    }
                    const fetchConfigData = { 
                        method: "POST", 
                        body: JSON.stringify(stepID),
                        headers: { 
                            "Content-Type": "application/json" 
                        } 
                    };
        
                    const response2 = await fetch('/deleteStep', fetchConfigData); 
        
                    if(response2.ok) {
                        const newSetSteps = await response2.json();
                        setCurrSteps(newSetSteps);
                        navigate('/edit');
                    } 
                    else {
                        console.log("Error with the result data");
                    }
                }
                else {
                    console.log("Error with the result data");
                }
            }

        } catch(err) {
            console.log(`Error getting goals: ${err}`);
        }
      }

      async function deleteContacts(contacts) {
        try {
            for(let i = 0; i < contacts.current.length; i++) {
                const contactID = {
                    id: contacts.current[i],
                    goalID: currGoalID
                }

                const fetchConfigData = { 
                    method: "POST", 
                    body: JSON.stringify(contactID),  
                    headers: { 
                        "Content-Type": "application/json" 
                    } 
                };

                const response = await fetch('/deleteContact', fetchConfigData); 

                if(response.ok) {
                    const contactsToDisplay = await response.json();
                    setCurrContacts(contactsToDisplay);
                }
                else {
                    console.log("Error with the result data");
                }
            }
            navigate('/view');

        } catch(err) {
            console.log(`Error getting goals: ${err}`);
        }
      }

      async function deleteGoal() {
        try {
           const goal = {
             id: currGoalID,
             email: email
           }
            const fetchConfigData = { 
                method: "POST", 
                body: JSON.stringify(goal),  
                headers: { 
                    "Content-Type": "application/json" 
                } 
            };

            const response = await fetch('/getContacts', fetchConfigData); 

            if(response.ok) {
                const contactsDelete = await response.json();
                for(let i = 0; i < contactsDelete.length; i++) {
                    const contact = {
                        id: contactsDelete[i].id,
                        goalID: currGoalID
                    }

                    const fetchConfigData = { 
                        method: "POST", 
                        body: JSON.stringify(contact),  
                        headers: { 
                            "Content-Type": "application/json" 
                        } 
                    };

                    const response1 = await fetch('/deleteContact', fetchConfigData);

                    if(response1.ok) {
                        const contactsToDisplay = await response.json();
                        setCurrContacts(contactsToDisplay);
                    }
                    else {
                        console.log("Error with the result data");
                    } 
                }
                const response2 = await fetch('/deleteGoalSteps', fetchConfigData);
                console.log('response ok');
                if(response2.ok) {
                    console.log('response 2 ok');
                    const response3 = await fetch('/deleteSharedGoals', fetchConfigData);
                    if(response3.ok) {
                        console.log('response 3 ok');
                        console.log(fetchConfigData);
                        const response4 = await fetch('/deleteGoal', fetchConfigData);
                        if(response4.ok) {
                            const updatedGoals = await response4.json();
                            console.log(updatedGoals);
                            setGoals(updatedGoals);
                            navigate('/dashboard');
                        }
                        else {
                            console.log("Error with the result data");
                        }
                    }
                    else {
                        console.log("Error with the result data");
                    }
                } else {
                    console.log("Error with the result data");
                }
            }
        } catch(err) {
            console.log(`Error getting goals: ${err}`);
        }
    }

    return ( 
    <>
        <ShowNavbar>
            <Navbar status={status} set={setStatus}/>
        </ShowNavbar>
        <ShowSidebar>
            <Sidebar 
            firstName={firstName}
            onAllGoals={displayAllGoals}
            onActiveGoals={displayActiveGoals} 
            onCompleteGoals={displayCompleteGoals}
            onInactiveGoals={displayInactiveGoals}
            />
        </ShowSidebar>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/register' element={<Register status={status} onAddUser={addUser}/>} />
            <Route path="/login" element={<Login onValidate={displayName} onDisplayGoals={displayAllGoals}/>} />
            <Route path="/dashboard" element={<Dashboard goals={goals} onGetGoal={getSpecificGoal} />} />
            <Route path="/active" element={<Dashboard goals={goals} onGetGoal={getSpecificGoal}/>} />
            <Route path="/inactive" element={<Dashboard goals={goals} onGetGoal={getSpecificGoal}/>} />
            <Route path="/complete" element={<Dashboard goals={goals} onGetGoal={getSpecificGoal}/>} />
            <Route path="/createGoal" element={<NewGoalOverview onAddGoal={addGoal} />} />
            <Route path="/view" element={<View goal={currGoal} steps={currSteps} contacts={currContacts} onDeleteGoal={deleteGoal}/>} />
            <Route path="/edit" element={<Edit 
                goal={currGoal} 
                steps={currSteps} 
                contacts={currContacts} 
                onAddEdits={addEdits} 
                onGetStep={getSpecificStep} 
                onGetContact={getSpecificContact} 
                onDeleteSteps={deleteSteps} 
                onDeleteContacts={deleteContacts} />} />
            <Route path="/editStep" element={<EditStep step={currStep} onAddStepEdits={addStepEdits}/>} />
            <Route path="/editContact" element={<EditContact contact={currContact} onAddContactEdits={addContactEdits}/> }/>
        </Routes>
    </>
    );
}

export default App;