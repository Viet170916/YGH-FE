import React, { useState } from 'react'
import { FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material'
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import "./MultilineRadio.scss"

interface IProps {
    optionList: {
        id: number;
        label: JSX.Element;
        value: string;
    }[]
    name?: string
    value?: string
    onChange?: Function
}

export default function MultilineRadio(props: IProps) {
    var searchValue = null
    if (typeof props.value === 'string') {
        searchValue = props.optionList.filter(option => props.value?.startsWith(option.value))[0]
    }

    const selectedId = searchValue?.id || 0
    // const [selectedId, setSelectedId] = useState(searchValue?.id || 0);

    return (
        <RadioGroup
            aria-labelledby="radio-buttons-group-label"
            name="radio-buttons-group"
            style={{
                width: '100%'
            }}
        >
            <Stack spacing={1.5} display="flex" maxWidth="100%">
                {props.optionList.map(option => (
                    <FormControlLabel className='multiline-radio'
                        key={option.id}
                        value={option.value}
                        name={props.name}
                        control={<Radio
                            checkedIcon={<TripOriginIcon />}
                            sx={{
                                '&.Mui-checked': {
                                    color: 'black',
                                }
                            }}
                        />}
                        checked={selectedId === option.id}
                        label={option.label}
                        onChange={(event) => props.onChange && props.onChange(event)}
                        // onClick={(event) => setSelectedId(option.id)}
                        sx={{
                            '&.MuiFormControlLabel-root': {
                                outline: selectedId === option.id ? '3px solid black' : '1px solid lightgray'
                            },
                        }}
                    />
                ))}
            </Stack>
        </RadioGroup>
    )
}
