import React from 'react'
// import {Link} from 'react-router-dom'

function Login(props) {
    function onFormSubmit(e) { 
        e.preventDefault(); 
        const user = { 
            email: e.target.email.value, 
            password: e.target.password.value,  
        };
         
        props.onValidate(user); 
        props.onDisplayGoals();
    } 
    
    return (
    <div className="login-card">
      <h1 className="title">Sign In</h1>
      <p className="subtitle">
        Please log in using your username and password!
      </p>
      <form onSubmit={onFormSubmit} class="needs-validation" novalidate>
        <div className="inputs_container" >
          <input
            type="text"
            placeholder="Email"
            id="email"
        required/>
          <input
            type="password"
            placeholder="Password"
            id="password"
        required/>
        </div>
        <button type="submit" className="login_button">Log In</button>
      </form>
      {/* <div className="link_container">
        <a href="#" className="small">
        </a>
      </div> */}
    </div>
        
        
        
        
        
        
        
        // <div class="container">
        //     <form onSubmit={onFormSubmit}>
        //         <div class="mb-3">
        //             <label for="exampleInputEmail1" class="form-label">Email Address</label>
        //             <input class="form-control" id="email" />
        //         </div>
        //         <div class="mb-3">
        //             <label for="exampleInputPassword1" class="form-label">Password</label>
        //             <input type="password" class="form-control" id="password" />
        //         </div>
        //         <button href="/dashboard" type="submit" class="btn btn-primary">Login</button>
        //     </form>
        //     <Link to="/register" class="btn btn-success">Register</Link>
        // </div>
    );
}

export default Login;