import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

const Button = props => {

    const bg = props.bg ? "bg-" + props.bg : 'bg-main' ;

    const size = props.size ? 'btn-' + props.size : ''

    const animation = props.animation ? 'btn-animation' : ''


  return (
    <button className= {`btn ${bg} ${animation}` }
    onClick={props.onClick ? props.onClick : null}
    >
        <span className={`btn-text ${size}`}>{props.children}</span>
        {
            props.icon ? (
                <span className="btn-icon">
                    {props.icon}
                </span>
            ) : null
        }

    </button>
  )
}

Button.propTypes = {
    icon: PropTypes.object,
    onClick: PropTypes.func,
    bg: PropTypes.string,
    animation: PropTypes.bool,
    size : PropTypes.string

}

export default Button