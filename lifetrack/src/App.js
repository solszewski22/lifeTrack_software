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

function App() {
    const [firstName, setfirstName] = useState();
    const [email, setEmail] = useState();
    const [goals, setGoals] = useState({});
    const [status, setStatus] = useState("Login");
    const navigate = useNavigate();

    async function displayName (user) { 
      try {
          const userData = { 
              email: user.email,
              password: user.password
          }; 
          setEmail(userData.email);
          console.log(email);

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
        console.log(email);
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
            console.log(goalsToDisplay);
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
            <Route path="/dashboard" element={<Dashboard goals={goals} />} />
            <Route path="/active" element={<Dashboard goals={goals} />} />
            <Route path="/inactive" element={<Dashboard goals={goals} />} />
            <Route path="/complete" element={<Dashboard goals={goals} />} />
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
