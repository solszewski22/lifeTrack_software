import React from 'react'

function Register(props) {
    function onFormSubmit (e) {
        e.preventDefault();
        const newUser = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value
        };

        props.onAddUser(newUser);
    }
    
    return (
        <div className='form-container'>
        <div className='form-content-left'>
          <img className='form-img' src='imgs/stickynote.png' alt="sticky"/>
        </div>
        <div className='form-content-right'>
        <form  className='form needs-validation' novalidate onSubmit={onFormSubmit}>
            <h1>
            Get started with us today! Create your account by filling out the
            information below.
            </h1>
            <div className='form-inputs'>
            <label for="firstName" className='form-label'>First Name</label>
            <input
                className='form-input'
                type='text'
                id="firstName"
                placeholder='Enter Your First Name'
            required />
            <div class="invalid-feedback">
                Enter a first name.
            </div>
            </div>
            <div className='form-inputs'>
            <label for="lastName" className='form-label'>Last Name</label>
            <input
                className='form-input'
                type='text'
                id="lastName"
                placeholder='Enter Your Last Name'
            required/>
            <div class="invalid-feedback">
                Enter a last name.
            </div>
            </div>
            <div className='form-inputs'>
            <label for="email" className='form-label'>Email</label>
            <input
                className='form-input'
                type='text'
                id='email'
                placeholder='Enter Your Password'
            required/>
            <div class="invalid-feedback">
                Enter a valid email.
            </div>
            </div>
            <div className='form-inputs'>
            <label for="password" className='form-label'>Password</label>
            <input
                className='form-input'
                type='password'
                id='password'
                placeholder='Enter Your Password'
            required/>
            <div class="invalid-feedback">
                Enter a valid password.
            </div>
            </div>
            <button className='form-input-btn' type='submit'>
            Sign up
            </button>
            <span className='form-input-login'>
            Already have an account? Login <a href='/login'>here</a>
            </span>
        </form>
        </div>
    </div>
    );
}

export default Register;