import React from 'react'

function Contact(props) {

    function addContact(e) {
        e.preventDefault();
        const contactInfo = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            phoneNum: e.target.phoneNum.value,
            email: e.target.email.value
        }

        e.target.firstName.value = "";
        e.target.lastName.value = "";
        e.target.phoneNum.value = "";
        e.target.email.value = "";

        props.onAddContact(contactInfo);
    }

    return (
        <form onSubmit={addContact} class="editStep">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <p class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseTwo">
                        + Add Contact
                    </p>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="First Name" id="firstName" />
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Last Name" id="lastName" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Phone Number" id="phoneNum" />
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Email" id="email" />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-editStep">Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Contact;