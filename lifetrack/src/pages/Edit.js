import React, {useState, useRef} from 'react'
import CreateStep from './CreateStep';
import CreateContact from './CreateContact'

function Edit(props) {
    const newSteps = useRef([]);
    // const deleteSteps = useRef([]);
    const newContacts = useRef([]);
    const [steps, setSteps] = useState(props.steps);
    const [contacts, setContacts] = useState(props.contacts);

    const [status, setStatus] = useState("Active");

    function statusValue(e) {
        setStatus(e.target.value);
    }

    function setNewStep (step) {
        newSteps.current.push(step);
        props.steps.push(step);
        setSteps([...props.steps]);
    }

    function setNewContact (contact) {
        newContacts.current.push(contact);
        props.contacts.push(contact);
        setContacts([...props.contacts]);
    }

    function onFormSubmit (e) {
        e.preventDefault();
        const edits = {
            title: e.target.title.value,
            status: status,
            description: e.target.description.value,
            steps: newSteps,
            contacts: newContacts
        };
        props.onAddEdits(edits);
        // props.onDeleteSteps(deleteSteps);
    }

    function onRowClick(e) {
        e.preventDefault();
        const stepID = {
            id: e.target.buttonEdit.value
        }
        props.onGetStep(stepID);
    }

    // function onRowClickDelete(e) {
    //     e.preventDefault();
    //     const stepID = {
    //         id: e.target.buttonRemove.value
    //     };
    //     deleteSteps.current.push(stepID);
    // }

    function onContactClick(e) {
        e.preventDefault();
        const contactID = {
            id: e.target.buttonCEdit.value
        }
        props.onGetContact(contactID);
    }
    
    return (
        <div class="container edit">
            <form onSubmit={onFormSubmit}>
                <button type="submit" class="btn btn-edit">Save</button>
                <h3>Edit Your Goal</h3>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Title" id="title" value={props.goal.title}/>
                    </div>
                    <div class="col">
                        <select class="form-select" id="status" as="select" onChange={statusValue}>
                            <option selected value={props.goal.status}>{props.goal.status}</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Complete">Completed</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <textarea class="form-control" id="description" rows="5" placeholder="Description">{props.goal.description}</textarea>
                </div>
            </form>
                <h5>Steps</h5>
                <div>
                    {steps.map((step) => {
                        return ( 
                            <div class="d-flex flex-row mb-3 steps">
                                <form class="d-flex flex-row mb-3 edit-steps" key={step.id} onSubmit={onRowClick}>
                                    <div>{step.stepNum}</div>
                                    <div>{step.title}</div>
                                    <button class="btn" type="submit" id="buttonEdit" value={step.id}><i class="bi bi-pencil-square edit-pencil-square"></i></button>
                                </form>
                                {/* <form onSubmit={onRowClickDelete}>
                                    <button type="submit" id="buttonRemove" class="btn btn-danger" value={step.id}>Delete</button>
                                </form> */}
                            </div>
                        )
                    })}
                </div>
                <CreateStep onAddStep={setNewStep}/>
                {/* <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {steps.map((step) => {
                            return (
                                <tr key={step.id} onSubmit={onRowClick}>
                                    <td>{step.stepNum}</td>
                                    <td>{step.title}</td>
                                    <button type="submit" id="button" value={step.id}>Edit</button>
                                </tr>
                            );
                        })}
                    </tbody>
                </table> */}
                <h5>Contacts</h5>
                <div>
                    {contacts.map((contact) => {
                        return ( 
                            <form class="d-flex flex-row mb-3 edit-steps" key={contact.id} onSubmit={onContactClick}>
                                    <div>{contact.firstName}</div>
                                    <div>{contact.lastName}</div>
                                    <div>{contact.phoneNum}</div>
                                    <div>{contact.email}</div>
                                    <button class="btn" type="submit" id="buttonCEdit" value={contact.id}><i class="bi bi-pencil-square edit-pencil-square"></i></button>
                            </form>
                        )
                    })}
                </div>
                {/* <h5>Contacts</h5>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scopre="col">Phone Number</th>
                        <th scopre="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => {
                            return (
                                <tr key={contact.id}>
                                    <td>{contact.firstName}</td>
                                    <td>{contact.lastName}</td>
                                    <td>{contact.phoneNum}</td>
                                    <td>{contact.email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table> */}
            <CreateContact onAddContact={setNewContact} />
        </div>
    )
}

export default Edit;