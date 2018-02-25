'use strict'

import { clone } from 'asobj'
import c from 'classnames'
import React from 'react'
import { TheIcon } from 'the-icon'
import TheInputText from './TheInputText'

class TheInputSearch extends React.PureComponent {
  constructor (props) {
    super(props)
    const s = this
    let {open = false} = props
    s.state = {
      open,
    }
    s._focusTimer = -1
  }

  componentWillUnmount () {
    const s = this
    clearTimeout(s._focusTimer)
  }

  handleFocus (e) {
    const s = this
    const {props} = s
    let {onFocus} = props
    onFocus && onFocus(e)
    s.toggleOpen(true)
  }

  render () {
    const s = this
    const {props, state} = s
    let {value} = props
    let {open} = state
    return (
      <TheInputText {...props}
                    className={c('the-input-search', {
                      'the-input-search-open': open || !!value,
                    })}
                    inputRef={(input) => { s.input = input }}
                    onFocus={(e) => s.handleFocus()}
                    type='search'
      >
        {!value && (
          <a className={c('the-input-search-toggle')}
             onClick={() => s.toggleOpen()}
             tabIndex={-1}
          >
            <TheIcon className={TheInputSearch.SEARCH_ICON}/>
          </a>
        )}
      </TheInputText>
    )
  }

  toggleOpen (open) {
    const s = this
    if (typeof open === 'undefined') {
      open = !s.state.open
    }
    if (open === s.state.open) {
      return
    }
    s.setState({open})
    clearTimeout(s._focusTimer)
    s._focusTimer = setTimeout(() => {
      if (open && s.input) {
        s.input.focus()
      }
    })
  }
}

TheInputSearch.SEARCH_ICON = 'fa fa-search'
TheInputSearch.propTypes = clone(TheInputText.propTypes, {without: ['type']})
TheInputSearch.defaultProps = clone(TheInputText.defaultProps, {without: ['type']})
TheInputSearch.displayName = 'TheInputSearch'

export default TheInputSearch
