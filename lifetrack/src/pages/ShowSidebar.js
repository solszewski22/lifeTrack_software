import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';

const ShowSidebar = ({children}) => {
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(false);
    useEffect(()=> {
        if(location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/" || location.pathname === "/about"){
            setShowSidebar(false);
        } else {
            setShowSidebar(true);
        }
    }, [location])
    
    return (
        <div>{showSidebar && children}</div>
    )
}

export default ShowSidebar;