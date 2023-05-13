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
        <div>
            <form class="container" onSubmit={onFormSubmit}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">First Name</label>
                    <input class="form-control" id="firstName" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Last Name</label>
                    <input class="form-control" id="lastName" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email Address</label>
                    <input class="form-control" id="email" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Password</label>
                    <input class="form-control" id="password"/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Register;