'use strict'

import { asStyleData } from 'the-component-util'

function SliderStyleData({
                           dominantColor,
                           handlePaddingRate,
                           sliderBarHeight,
                           sliderHandleSize,
                           sliderPadding,
                         }){
  return asStyleData({
    '.the-input-slider': {
      height: `${sliderHandleSize + 2}px`,
      position: 'relative',
    },
    '.the-input-slider-bar': {
      height: `${sliderBarHeight + sliderPadding}px`,
      left: 0,
      position: 'absolute',
      right: 0,
      top: `${sliderHandleSize / 2 - sliderPadding}px`,
    },
    '.the-input-slider-bar-bg': {
      backgroundColor: '#CCC',
      border: '1px solid #BBB',
      borderRadius: sliderBarHeight / 2,
      height: `${sliderBarHeight}px`,
      left: 0,
      position: 'absolute',
      right: 0,
      top: `${sliderPadding}px`,
    },
    '.the-input-slider-bar-highlight': {
      backgroundColor: dominantColor,
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: sliderBarHeight / 2,
      height: sliderBarHeight,
      maxWidth: '100%',
      position: 'absolute',
      top: sliderPadding,
    },
    '.the-input-slider-bar-tap': {
      bottom: -8,
      display: 'block',
      left: 0,
      position: 'absolute',
      right: 0,
      top: -8,
      zIndex: 1,
    },
    '.the-input-slider-bar-wrap': {
      boxSizing: 'border-box',
      display: 'block',
      position: 'relative',
      width: '100%',
    },
    '.the-input-slider-handle': {
      '.the-input-slider-handle-area': {
        bottom: `${handlePaddingRate}%`,
        color: 'transparent',
        display: 'inline-block',
        left: `${handlePaddingRate}%`,
        opacity: 0,
        position: 'absolute',
        right: `${handlePaddingRate}%`,
        top: `${handlePaddingRate}%`,
      },
      '.the-input-slider-handle-icon': {
        '.the-input-slider-label': {
          boxSizing: 'border-box',
          display: 'inline-block',
          fontSize: '14px',
          lineHeight: `${sliderHandleSize}px`,
          minWidth: '24px',
          padding: '2px 4px',
          textAlign: 'right',
        },
        '&:hover': {
          boxShadow: '1px 1px 3px rgba(0,0,0,0.5)',
        },
        backgroundColor: 'white',
        border: '1px solid #DDD',
        borderRadius: '50%',
        boxShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        display: 'inline-block',
        height: `${sliderHandleSize}px`,
        position: 'relative',
        width: `${sliderHandleSize}px`,
        zIndex: 3,
      },
      '&:active': {
        backgroundColor: '#FCFCFC',
        cursor: '-webkit-grabbing',
      },
      borderRadius: '50%',
      cursor: '-webkit-grab',
      display: 'inline-block',
      position: 'relative',
      zIndex: 4,
    },
    '.the-input-slider-inner': {
      display: 'flex',
      margin: '2px 0',
    },
  })
}

export default SliderStyleData
