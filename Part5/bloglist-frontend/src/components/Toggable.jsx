import { useState, forwardRef,useImperativeHandle } from 'react'

const Toggable=forwardRef((props,refs)=>{
    const [visible,setVisible]=useState(false)

    const whenHideDisplayStyle={display:visible?'none':''}
    const whenShowDisplayStyle={display:visible?'':'none'}

    const toggleVisible=()=>{
        setVisible(!visible)
    }

    useImperativeHandle(refs,()=>{
        return{toggleVisible}
    })

    return(
        <div>
            <div style={whenHideDisplayStyle}>
                <button onClick={toggleVisible}>{props.buttonLable}</button>
            </div>
            <div style={whenShowDisplayStyle}>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
})

export default Toggable