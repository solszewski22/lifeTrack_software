import React , {useState} from 'react'

function EditStep(props) {
    const [status, setStatus] = useState("Active");

    function statusValue(e) {
        setStatus(e.target.value);
    }

    function onFormSubmit(e) {
        e.preventDefault();
        const edits = {
            stepNum: e.target.stepNum.value,
            title: e.target.title.value,
            status: status,
            notes: e.target.notes.value
        }
        props.onAddStepEdits(edits);
    }
    
    return (
        <div class="container editStepPage">
            <form onSubmit={onFormSubmit}>
                <h3>Edit Your Step</h3>
                <div class="row">
                    <div class="col-2">
                        <input type="number" class="form-control" placeholder="Step Number" id="stepNum" value={props.step.stepNum}/>
                    </div>
                    <div class="col-3">
                        <select class="form-select" id="status" as="select" onChange={statusValue}>
                            <option selected value={props.step.status}>{props.step.status}</option>
                            <option value="Complete">Working</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Title" id="title" value={props.step.title}/>
                    </div>
                </div>
                <div class="mb-3">
                    <textarea class="form-control" id="notes" rows="3" placeholder="Notes">{props.step.notes}</textarea>
                </div>
                <button type="submit" class="btn btn-editStep">Save</button>
            </form>
        </div>
    )   
};

export default EditStep;