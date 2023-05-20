import React, {useState} from 'react'

function Step(props) {
    const [status, setStatus] = useState("Working");

    function statusValue(e) {
        setStatus(e.target.value);
    }
    
    function addStep(e) {
        e.preventDefault();
        const stepInfo = {
            stepNum: e.target.stepNum.value,
            title: e.target.title.value,
            status: status,
            notes: e.target.notes.value
        }

        e.target.stepNum.value = "";
        e.target.title.value = "";
        e.target.notes.value = "";

        props.onAddStep(stepInfo);
    }

    return (
        <form onSubmit={addStep} class="editStep">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <p class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        + Add Step
                    </p>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-2">
                                <input type="number" class="form-control" placeholder="Step Number" id="stepNum" />
                            </div>
                            <div class="col-3">
                                <select class="form-select" id="status" as="select" onChange={statusValue}>
                                    <option selected >Working</option>
                                    <option value="Complete">Complete</option>
                                </select>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Title" id="title" />
                            </div>
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control" id="notes" rows="3" placeholder="Notes"></textarea>
                        </div>
                        <button type="submit" class="btn btn-editStep">Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Step;