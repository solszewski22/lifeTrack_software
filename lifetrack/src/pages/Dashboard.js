import React from 'react'

function Dashboard(props) {
    return (
        <div class="container">
            <hr/>
            <table class="table">
            <thead>
                <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                </tr>
            </thead>
            <tbody>
            {props.goals.map((goal) => { 
                    return ( 
                        <tr key={goal.id}> 
                            <td>{goal.title}</td> 
                            <td>{goal.description}</td>                                                     
                        </tr> 
                    ); 
                })} 
            </tbody>
            </table>
        </div>
    )
};

export default Dashboard;