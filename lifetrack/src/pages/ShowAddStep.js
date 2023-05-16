import React, {useEffect, useState} from 'react'

function AddStep (props) {
    const [show, setShow] = useState(false);
    useEffect(()=> {
        if(props.mode === "Edit"){
            setShow(false);
        } else {
            setShow(true);
        }
    }, [props.mode])
    
    return (
        <div>{show && props.children}</div>
    )
};

export default AddStep;