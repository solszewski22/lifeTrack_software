import React from 'react'
import {Link} from 'react-router-dom'

function Dashboard(props) {

    function onRowClick(e){
        e.preventDefault();
        const goalID = {
            id: e.target.button.value
        };
        props.onGetGoal(goalID);
    }
    
    return (
        <div class="container dashboard">
            <Link to="/createGoal" ><i class="bi bi-plus-circle"></i></Link>
            <div class="goal-display">
                {props.goals.map((goal) => {
                    return (
                        <form class="card" key={goal.id} onSubmit={onRowClick}>
                            <div class="card-body">
                                <p class="card-status" id="status">{goal.status}</p>
                                <h5 class="card-title" id="title">{goal.title}</h5>
                                <p id="description" class="card-descrip" >{goal.description}</p>
                                <button id="button" value={goal.id} type="submit" class="btn card-link">Details</button>
                            </div>
                        </form>
                    )
                })}
            </div>
        </div>
    )
};

export default Dashboard;