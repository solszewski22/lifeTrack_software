import React from 'react'
import { useNavigate } from 'react-router-dom';

// module for steps open on submit of details (assign and get step id), button within module to edit (toggle between views of view and edit of goal)

function View(props) {
    const navigate = useNavigate();
    
    function goToEdit() {
        navigate('/edit');
    };

    return (
        <div class="container edit" onClick={goToEdit}>
            <button type="click" class="btn btn-success">Edit</button>
            <h2>{props.goal.title}</h2>
            <p>Status: {props.goal.status}</p>
            <p>Desrciption:<br/>{props.goal.description}</p>
            <h5>Steps</h5>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scopre="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.steps.map((step) => {
                        return (
                            <tr key={step.id}>
                                <td>{step.stepNum}</td>
                                <td>{step.title}</td>
                                <td><button type="submit" class="btn btn-success">Details</button></td>
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
                    {props.contacts.map((contact) => {
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
        </div>
    )
};

export default View;