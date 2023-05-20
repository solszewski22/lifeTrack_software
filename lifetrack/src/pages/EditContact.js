import React from 'react'

function EditContact(props) {

    function onFormSubmit(e) {
        e.preventDefault();
        const edits = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            phoneNum: e.target.phoneNum.value,
            email: e.target.email.value
        }
        props.onAddContactEdits(edits);
    }
    
    return (
        <div class="container editStepPage">
            <form onSubmit={onFormSubmit}>
            <h3>Edit Your Contact</h3>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="First Name" id="firstName" value={props.contact.firstName}/>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Last Name" id="lastName" value={props.contact.lastName}/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Phone Number" id="phoneNum" value={props.contact.phoneNum} />
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Email" id="email" value={props.contact.email} />
                    </div>
                </div>
                <button type="submit" class="btn btn-editStep">Save</button>
            </form>
        </div>
    )   
};

export default EditContact;