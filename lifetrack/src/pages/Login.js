import React from 'react'

function Login(props) {
    function onFormSubmit(e) { 
        e.preventDefault(); 
        const user = { 
            email: e.target.email.value, 
            password: e.target.password.value,  
        };
         
        props.onValidate(user); 
    } 
    
    return (
      <div className="login">
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
      </div>
      </div>
    );
}

export default Login;