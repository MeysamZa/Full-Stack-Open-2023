import { useState, forwardRef,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggable=forwardRef((props,refs) => {
  const [visible,setVisible]=useState(false)

  const whenHideDisplayStyle={ display:visible?'none':'' }
  const whenShowDisplayStyle={ display:visible?'':'none' }

  const toggleVisible=() => {
    setVisible(!visible)
  }

  useImperativeHandle(refs,() => {
    return{ toggleVisible }
  })

  return(
    <div>
      <div style={whenHideDisplayStyle}>
        <Button id='toggle-visible-button'  variant='primary' onClick={toggleVisible}>{props.buttonLable}</Button>
      </div>
      <div style={whenShowDisplayStyle}>
        {props.children}
        <Button id='toggle-cancel-button'  variant='primary' onClick={toggleVisible}>cancel</Button>
      </div>
    </div>
  )
})

Toggable.propTypes = {
  buttonLable: PropTypes.string.isRequired
}

Toggable.displayName = 'Togglable'

export default Toggable