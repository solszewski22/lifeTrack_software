import React from 'react';

function Sidebar(props) {
    function onAll (e) {
        e.preventDefault();
        props.onAllGoals();
    }
    
    function onActive (e) {
        e.preventDefault();
        props.onActiveGoals();
    }

    function onComplete (e) {
        e.preventDefault();
        props.onCompleteGoals();
    }

    function onInactive (e) {
        e.preventDefault();
        props.onInactiveGoals();
    }

    return (
        <div class="sidebar">
            <h3>Hello, {props.firstName}</h3>
            <hr></hr>
            <div>
                <i class="bi bi-list-ul"></i>
                <a href="/dashboard" onClick={onAll}>All Goals</a>
            </div>
            <div>
                <i class="bi bi-dash-circle"></i>
                <a href="/active" onClick={onActive}>Active</a>
            </div>
            <div>
                <i class="bi bi-dash-circle"></i>
                <a href="/inactive" onClick={onInactive}>Inactive</a>
            </div>
            <div>
                <i class="bi bi-check2-circle"></i>
                <a href="/complete" onClick={onComplete}>Completed</a>
            </div>
        </div>
    )
}

export default Sidebar;