import React, {useState} from 'react'

function NewGoal (props) {
    const [status, setStatus] = useState("Active");

    function statusValue(e) {
        setStatus(e.target.value);
    }

    function onFormSubmit(e) {
        e.preventDefault();
        const goal = {
            title: e.target.title.value,
            description: e.target.description.value,
            status: status
        }
        props.onAddGoal(goal);
    }
    
    return (
        <div class="container newGoal">
            <h2>Create a New Goal</h2>
            <form onSubmit={onFormSubmit}>
                <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" placeholder="Title" id="title" />
                    </div>
                    <div class="col">
                        <select class="form-select" id="status" as="select" onChange={statusValue}>
                            <option selected>Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Complete">Completed</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <textarea class="form-control" id="description" rows="7" placeholder="Description"></textarea>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>
    )
};

export default NewGoal;