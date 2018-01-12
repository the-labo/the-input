/**
 * Input of the-components
 * @module the-input
 */
'use strict'

const _d = (m) => 'default' in m ? m.default : m

const TheInput = _d(require('./TheInput'))
const TheInputCheckbox = _d(require('./TheInputCheckbox'))
const TheInputPassword = _d(require('./TheInputPassword'))
const TheInputRadio = _d(require('./TheInputRadio'))
const TheInputRange = _d(require('./TheInputRange'))
const TheInputSearch = _d(require('./TheInputSearch'))
const TheInputSelect = _d(require('./TheInputSelect'))
const TheInputSlider = _d(require('./TheInputSlider'))
const TheInputStyle = _d(require('./TheInputStyle'))
const TheInputTag = _d(require('./TheInputTag'))
const TheInputText = _d(require('./TheInputText'))
const TheInputTextArea = _d(require('./TheInputTextArea'))
const TheInputToggle = _d(require('./TheInputToggle'))
const TheInputUpload = _d(require('./TheInputUpload'))
const helpers = _d(require('./helpers'))
const patterns = _d(require('./patterns'))

module.exports = {
  TheInput,
  TheInputCheckbox,
  TheInputPassword,
  TheInputRadio,
  TheInputRange,
  TheInputSearch,
  TheInputSelect,
  TheInputSlider,
  TheInputStyle,
  TheInputTag,
  TheInputText,
  TheInputTextArea,
  TheInputToggle,
  TheInputUpload,
  helpers,
  patterns,
}
