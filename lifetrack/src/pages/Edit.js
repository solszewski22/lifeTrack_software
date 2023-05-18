import React, {useState, useRef} from 'react'
import CreateStep from './CreateStep';
import CreateContact from './CreateContact'

function Edit(props) {
    const newSteps = useRef([]);
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
    }
    
    return (
        <div class="container">
            <h3>Edit Your Goal</h3>
            <form onSubmit={onFormSubmit}>
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
                    <textarea class="form-control" id="description" rows="5">{props.goal.description}</textarea>
                </div>
                <h5>Steps</h5>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {steps.map((step) => {
                            return (
                                <tr key={step.stepNum}>
                                    <td>{step.stepNum}</td>
                                    <td>{step.title}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <h5>Contacts</h5>
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
                </table>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <CreateStep onAddStep={setNewStep}/>
            <CreateContact onAddContact={setNewContact} />
        </div>
    )
}

export default Edit;