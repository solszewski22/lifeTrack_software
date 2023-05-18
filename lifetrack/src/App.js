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

function App() {
    const [firstName, setfirstName] = useState();
    // const [goalTitle, setGoalTitle] = useState();
    const [email, setEmail] = useState();
    const [goals, setGoals] = useState([]);
    const [currGoal, setCurrGoal] = useState([]);
    const [currSteps, setCurrSteps] = useState([]);
    const [currGoalID, setCurrGoalID] = useState();
    const [currContacts, setCurrContacts] = useState([]);

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
            <Route path='/register' element={<Register onAddUser={addUser}/>} />
            <Route path="/login" element={<Login onValidate={displayName} onDisplayGoals={displayAllGoals}/>} />
            <Route path="/dashboard" element={<Dashboard goals={goals} onGetGoal={getSpecificGoal} />} />
            <Route path="/active" element={<Dashboard goals={goals} onGetGoal={getSpecificGoal}/>} />
            <Route path="/inactive" element={<Dashboard goals={goals} onGetGoal={getSpecificGoal}/>} />
            <Route path="/complete" element={<Dashboard goals={goals} onGetGoal={getSpecificGoal}/>} />
            <Route path="/createGoal" element={<NewGoalOverview onAddGoal={addGoal} />} />
            <Route path="/view" element={<View goal={currGoal} steps={currSteps} contacts={currContacts}/>} />
            <Route path="/edit" element={<Edit goal={currGoal} steps={currSteps} contacts={currContacts} onAddEdits={addEdits}/>} />
        </Routes>
    </>
    );
}

export default App;





// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {firstName: ""};
//   }

//   addUser = async (newUser) => {
//     try {
//       const userData = {
//         firstName: newUser.firstName,
//         lastName: newUser.lastName,
//         email: newUser.email,
//         password: newUser.password
//       };

//       const fetchConfigData = {
//         method: "POST",
//         body: JSON.stringify(userData),
//         headers: {
//           "Content-Type":"application/json"
//         }
//       };

//       const response = await fetch("/newUser", fetchConfigData);

//       if(response.ok){
//         const name = await response.json();
//         this.setState({firstName: name} , () => {
//           console.log(this.state.firstName);
//         })
//       } else {
//         console.log('Error with response data');
//       }
//     }
//     catch (err) {
//       console.log(`Error: ${err}`);
//     }
//   };

//   render() {
//       return (
//         <div>
//           <BrowserRouter>
//             <Routes>
//               <Route path='/' element={<Home />} />
//               <Route path='/about' element={<About />} />
//               <Route path='/register' element={<Register onAddUser={this.addUser}/>} />
//               <Route path='/login' element={<Login />} />
//               <Route path='/dashboard' element={<Dashboard name={this.state}/>} />
//             </Routes>
//           </BrowserRouter>
//         </div>
//       );
//     };
// }
