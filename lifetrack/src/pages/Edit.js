import React, {useState, useRef} from 'react'
import CreateStep from './CreateStep';
import CreateContact from './CreateContact'

function Edit(props) {
    const newSteps = useRef([]);
    const deleteSteps = useRef([]);
    const newContacts = useRef([]);
    const deleteContacts = useRef([]);
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
        props.onDeleteSteps(deleteSteps);
        props.onDeleteContacts(deleteContacts);
    }

    function onRowClick(e) {
        e.preventDefault();
        const stepID = {
            id: e.target.buttonEdit.value
        }
        props.onGetStep(stepID);
    }

    function onRowClickDelete(e) {
        e.preventDefault();
        deleteSteps.current.push(e.target.buttonRemove.value[0]);

        let pos;
        for(let i = 0; i < steps.length; i++) {
            if(steps[i].id == e.target.buttonRemove.value[0]) {
                pos = i;
                break;
            }
        }
        steps.splice(pos, 1);
        console.log(steps);
        for(let j = 0; j < steps.length; j++) {
            steps[j].stepNum = j+1;
        }
        setSteps([...steps]);
    }

    function onContactClick(e) {
        e.preventDefault();
        const contactID = {
            id: e.target.buttonCEdit.value
        }
        props.onGetContact(contactID);
    }

    function onRowContactDelete(e) {
        e.preventDefault();
        deleteContacts.current.push(e.target.buttonCRemove.value);
        let pos;
        for(let i = 0; i < contacts.length; i++) {
            if(contacts[i].id == e.target.buttonCRemove.value) {
                pos = i;
                break;
            }
        }
        contacts.splice(pos, 1);
        setContacts([...contacts]);
    }
    
    return (
        <div class="container edit">
            <form onSubmit={onFormSubmit}>
                <button type="submit" class="btn btn-edit">Save</button>
                <h3>Edit Your Goal</h3>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Title" id="title" defaultValue={props.goal.title}/>
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
                                <form onSubmit={onRowClickDelete}>
                                    <button type="submit" id="buttonRemove" class="btn" value={[step.id, step.stepNum]}><i class="bi bi-x-square"></i></button>
                                </form>
                            </div>
                        )
                    })}
                </div>
                <CreateStep onAddStep={setNewStep}/>
                <h5>Contacts</h5>
                <div>
                    {contacts.map((contact) => {
                        return (
                            <div class="d-flex flex-row mb-3 steps">
                                <form class="d-flex flex-row mb-3 edit-steps" key={contact.id} onSubmit={onContactClick}>
                                        <div>{contact.firstName}</div>
                                        <div>{contact.lastName}</div>
                                        <div>{contact.phoneNum}</div>
                                        <div>{contact.email}</div>
                                        <button class="btn" type="submit" id="buttonCEdit" value={contact.id}><i class="bi bi-pencil-square edit-pencil-square"></i></button>
                                </form>
                                <form onSubmit={onRowContactDelete}>
                                    <button type="submit" id="buttonCRemove" class="btn" value={contact.id}><i class="bi bi-x-square"></i></button>
                                </form>
                            </div>
                        )
                    })}
                </div>
            <CreateContact onAddContact={setNewContact} />
        </div>
    )
}

export default Edit;