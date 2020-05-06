import React, { Component } from 'react' ;
import ReactDOM from 'react-dom' ;
import classNames from 'classnames' ;

const DEFAULT_PLACEHOLDER_STRING = 'Select...'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    let val = this.parseValue(props.value, props.options) 
    this.state = {
      selected:  val || (typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder ) ,
      isOpen: false
    }
    this.mounted = true
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  //Used to change selected value - like set "custom" when select a date in Reports
  componentWillReceiveProps(props){
    if(props.value){
      this.setState({selected :props.value , isOpen :false });
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount () {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleMouseDown (event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen)
    }
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  parseValue (value, options) {
    let option

    if (typeof value === 'string') {
      for (var i = 0, num = options.length; i < num; i++) {
        if (options[i].type === 'group') {
          const match = options[i].items.filter(item => item.value === value)
          if (match.length) {
            option = match[0]
          }
        } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
          option = options[i]
        }
      }
    }

    return option || value
  }

  setValue (option) {
    let newState = {
      selected: option,
      isOpen: false
    }

    this.fireChangeEvent(newState)
    this.setState(setStateOption(option , false)) ;
  }

  fireChangeEvent (newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected)
    }
  }

  renderOption (option , isCustomized) {
    let value = option.value 
    let name = option.name ? option.name : "Webshot"
    if (typeof value === 'undefined') {
      value = option.label || option
    }
    let label = option.label || option.value || option
    let isSelected = value === this.state.selected.value || value === this.state.selected

    const classes = {
      [`${this.props.baseClassName}-option`]: true,
      [option.className]: !!option.className,
      'is-selected': isSelected
    }

    const optionClass = classNames(classes) + " item"

    let menuOption  = label ;
    
    return (
      <div
        key={value}
        className={optionClass} 
        onMouseDown={this.setValue.bind(this, option)}
        onClick={this.setValue.bind(this, option)}
        role='option'
        aria-selected={isSelected ? 'true' : 'false'}>
        {menuOption} 
      </div>
    )
  }

  buildMenu () {
    let { options, baseClassName , isCustomized} = this.props
    let ops = options.map((option) => {
      if (option.type === 'group') {
        let groupTitle = (<div className={`${baseClassName}-title`}>
          {option.name}
        </div>)
        let _options = option.items.map((item) => this.renderOption(item , isCustomized))

        return (
          <div className={`${baseClassName}-group`} key={option.name} role='listbox' tabIndex='-1'>
            {groupTitle}
            {_options}
          </div>
        )
      } else {
        return this.renderOption(option , isCustomized)
      }
    })

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>
                                No options found
    </div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false })
        }
      }
    }
  }

  isValueSelected () {
    return typeof this.state.selected === 'string' || this.state.selected.value !== ''
  }

  render () {
    const { baseClassName, controlClassName, placeholderClassName, menuClassName, arrowClassName, arrowClosed, arrowOpen, className , isCustomized } = this.props

    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : ''
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label 

    const dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      [className]: !!className,
      'is-open': this.state.isOpen
    })
    const controlClass = classNames({
      [controlClassName]: !!controlClassName,
      [disabledClass]: !!disabledClass
    })
    const placeholderClass = classNames({
      [`${baseClassName}-placeholder`]: true,
      [placeholderClassName]: !!placeholderClassName,
      'is-selected': this.isValueSelected()
    })
    const menuClass = classNames({
      [`${baseClassName}-menu`]: true,
      [menuClassName]: !!menuClassName
    })
    const arrowClass = classNames({
      [`${baseClassName}-arrow`]: true,
      [arrowClassName]: !!arrowClassName
    })

    const value = (<div className={placeholderClass}>
          {placeHolderValue}
      </div>) 


    const menu = this.state.isOpen ? <div className={menuClass} aria-expanded='true'>
      {this.buildMenu()}
    </div> : null

    return (
      <div className={dropdownClass}>
        <div className={controlClass} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)} aria-haspopup='listbox'>
          {value}
          <div className={`${baseClassName}-arrow-wrapper`}>
            {arrowOpen && arrowClosed
              ? this.state.isOpen ? arrowOpen : arrowClosed
              : <span className={arrowClass} />}
          </div>
        </div>
        {menu}
      </div>
    )
  }
}

function setStateOption(option , isOpen){
    return (previousState, currentProps) => {
        return { selected : option , isOpen: isOpen };
    };
}

Dropdown.defaultProps = { baseClassName: 'Dropdown' }
export default Dropdown
