import React, {useState} from 'react'
import AddStep from './ShowAddStep';

function Edit(props) {
    const [mode, setMode] = useState("Edit");
    function setPageMode() {
        if(mode === "Edit") {
            setMode("Save");
        }
        else {
            setMode("Edit");
        }
    };

    return (
        <div class="container edit" onClick={setPageMode}>
            <button type="click" class="btn btn-success">{mode}</button>
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
            <AddStep mode={mode}>
                <a type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                + Add Step
                </a>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="First name" aria-label="First name" />
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </AddStep>




            {/* <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Accordion Item #2
                </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
                </div>
            </div> */}
        </div>
    )
};

export default Edit;