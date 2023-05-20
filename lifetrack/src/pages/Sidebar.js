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
            <div class="user">
                <h3>Hello, {props.firstName}</h3>
            </div>
            <div class="links">
                <a href="/dashboard" onClick={onAll}>
                    <p><i class="bi bi-list-ul"></i>All Goals</p>
                </a>
            </div>
            <div class="links">
                <a href="/active" onClick={onActive}>
                    <p><i class="bi bi-dash-circle"></i>Active</p>
                </a>
            </div>
            <div class="links">
                <a href="/inactive" onClick={onInactive}>
                    <p><i class="bi bi-dash-circle"></i>Inactive</p>
                </a>
            </div>
            <div class="links">
                <a href="/complete" onClick={onComplete}>
                    <p><i class="bi bi-check2-circle"></i>All Goals</p>
                </a>
            </div>
        </div>
    )
}

export default Sidebar;