import React, { useState } from 'react'
import css from './common-input-field.module.scss'
import NumberFormat from 'react-number-format'

interface Props {
  label: string
  type?: string
  className?: string
  name: string
  value: any
  onChange: (event: any) => void
  error?: string
}

export default function CommonInput({
  label,
  type = 'text',
  className,
  name,
  value,
  onChange,
  error,
}: Props) {
  const [isFocused, setFocus] = useState<boolean>(false)

  const ChooseInputField = () => {
    switch (type) {
      case 'number': {
        return (
          <NumberFormat
            name={name}
            value={value}
            onValueChange={(values) => {
              const convertedValue = values.value ? +values.value : null
              const event = {
                target: {
                  value: convertedValue,
                  name: name,
                },
              }
              onChange(event)
            }}
            decimalScale={2}
            thousandSeparator={true}
            prefix={'€'}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        )
      }
      case 'textarea': {
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          ></textarea>
        )
      }
      case 'password': {
        return (
          <input
            name={name}
            value={value}
            type="password"
            onChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        )
      }
      default: {
        return (
          <input
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        )
      }
    }
  }

  return (
    <div className={[css.inputFieldContainer, className].join(' ')}>
      <div className={css.label}>{label}</div>
      <div className={[css.inputField, isFocused ? css.focused : ''].join(' ')}>
        {ChooseInputField()}
      </div>
      {error && error !== '' ? <div className={css.inputError}>{error}</div> : null}
    </div>
  )
}
