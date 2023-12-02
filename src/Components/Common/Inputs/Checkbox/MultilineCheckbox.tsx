import { Checkbox, FormControlLabel, FormGroup, Grid, Stack } from '@mui/material';
import React from 'react';
import "./MultilineCheckbox.scss";

interface IOption{
  id: number;
  label: JSX.Element;
  value: string;
  uncheckedIcon?: JSX.Element;
  checkedIcon?: JSX.Element;
}
interface IProps{
  selectedAmenitiesIDs: number[];
  setSelectedAmenitiesIDs: Function;
  optionList: IOption[];
  name?: string;
  onChange?: Function;
  column?: number;
  display: 'grid' | 'stack';
  flexDirection?: 'row' | 'column';
}
export default function MultilineCheckbox( props: IProps ){
  // const [selectedIds, setSelectedIds] = useState(props.optionList.map(option => ({
  //     id: option.id,
  //     checked: false
  // })));
  const optionListMapElements = props.optionList.map( ( option, index ) => {
    return props.display === 'stack' ?
      <FormControlLabel
        className = "multiline-checkbox"
        key = { option.id }
        value = { option.value }
        name = { props.name }
        control = {
          < Checkbox
            id = { `${ option.id }` }
            icon = { option.uncheckedIcon }
            checkedIcon = { option.checkedIcon }
            checked = { !props.selectedAmenitiesIDs ? false : props.selectedAmenitiesIDs?.some( selectedIds => selectedIds === option.id ) }
            sx = { {
              '&.Mui-checked': {
                color: 'black',
              },
            } }
          />
        }
        label = { option.label }
        onChange = { ( event ) => {
          // setSelectedIds(oldSelectedIds =>
          //     oldSelectedIds.map(item => { return item.id === option.id ? { ...item, checked: !item.checked } : item }
          //     )
          // )
          props.onChange && props.onChange( event );
        } }
        labelPlacement = "bottom"
        sx = { {
          '&.MuiFormControlLabel-root': {
            margin: 0,
            outline: props.selectedAmenitiesIDs?.some( selectedIds => selectedIds === option.id ) ? '3px solid black' : '1px solid lightgray',
          },
        } }
      />
      :
      <Grid item xs = { 12 / (props.column || 1) } key = { option.id }>
        <FormControlLabel
          className = "multiline-checkbox"
          key = { option.id }
          value = { option.value }
          name = { props.name }
          control = {
            < Checkbox
              id = { `${ option.id }` }
              icon = { option.uncheckedIcon }
              checkedIcon = { option.checkedIcon }
              checked = { !props.selectedAmenitiesIDs ? false : props.selectedAmenitiesIDs?.some( selectedIds => selectedIds === option.id ) }
              sx = { {
                '&.Mui-checked': {
                  color: 'black',
                },
              } }
            />
          }
          label = { option.label }
          onChange = { ( event ) => {
            // setSelectedIds(oldSelectedIds =>
            //     oldSelectedIds.map(item => { return item.id === option.id ? { ...item, checked: !item.checked } : item }
            //     )
            // )
            props.onChange && props.onChange( event );
          } }
          labelPlacement = "bottom"
          sx = { {
            width: '100%',
            '&.MuiFormControlLabel-root': {
              margin: 0,
              outline: props.selectedAmenitiesIDs?.some( selectedIds => selectedIds === option.id ) ? '3px solid black' : '1px solid lightgray'
              , 'div': {
                fontSize: '14px',
                fontFamily: 'Quicksand, sans-serif',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }, 'svg': {
                height: '24px',
                width: '24px',
              },
            },
          } }
        />
      </Grid>;
  } );
  return (
    <FormGroup
      aria-labelledby = "checkbox-buttons-group-label"
      style = { {
        width: '100%',
      } }
    >
      { props.display === 'stack' ?
        <Stack spacing = { 1.5 } display = "flex" maxWidth = "100%" flexDirection = { props.flexDirection } flexWrap = "wrap" gap = "15px">
          { optionListMapElements }
        </Stack>
        :
        <Grid container spacing = { 2 }>
          { optionListMapElements }
        </Grid>
      }
    </FormGroup>
  );
}
