import React from 'react'
import './Aler.css'
const Alert = ({ children }) => {
    return (
        <div className='alert quiz-alert'>
            {children}
        </div>
    )
}

export default Alert