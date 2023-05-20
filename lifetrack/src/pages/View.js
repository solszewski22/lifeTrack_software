import React from 'react'
import { useNavigate } from 'react-router-dom';

function View(props) {
    const navigate = useNavigate();
    
    function goToEdit() {
        navigate('/edit');
    };

    return (
        <div class="container view" onClick={goToEdit}>
            <div type="click"><i class="bi bi-pencil-square view-pencil-square"></i></div>
            <h2>{props.goal.title}</h2>
            <p>Status: {props.goal.status}</p>
            <p>Desrciption:<br/>{props.goal.description}</p>
            <h5>Steps</h5>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Title</th>
                    <th scopre="col">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {props.steps.map((step) => {
                        return (
                                <tr key={step.id}>
                                    <td>{step.stepNum}</td>
                                    <td>{step.status}</td>
                                    <td>{step.title}</td>
                                    <td>{step.notes}</td>
                                </tr>
                        );
                    })}
                </tbody>
            </table>
            <h5>Contacts</h5>
            <table class="table table-striped">
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