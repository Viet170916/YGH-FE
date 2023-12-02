import React, { useRef } from "react"

interface IProps {
    labelText?: string
    maxLength?: number
    rows?: number
    name?: string
    textValue?: string
    onChange?: Function
}

function TextareaInput(props: IProps) {
    return (
        <>
            <div>
                <label htmlFor="textarea">{props.labelText}</label>
                <textarea
                    id="textarea"
                    name={props.name}
                    maxLength={props.maxLength}
                    rows={props.rows}
                    value={props.textValue}
                    onChange={(event) => {
                        props.onChange?.(event)
                    }}
                    style={{
                        width: '600px',
                        minWidth: '100%',
                        resize: 'none'
                    }}
                />
                {props.textValue && <div>{`${props.textValue?.length}/${props.maxLength}`}</div>}
            </div>
        </>
    )
}

export default TextareaInput