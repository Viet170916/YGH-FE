import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import MultilineCheckbox from '../../../../../Components/Common/Inputs/Checkbox/MultilineCheckbox';
import { AllAmenitiesOptions } from './AmenitiesList';
import React from 'react';

interface IProps{
  selectedIDs: number[];
  setSelectedAmenitiesIDs: ( inputValue: number[] ) => void;
}
const Amenities = ( props: IProps ) => {
  // const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [ expanded, setExpanded ] = React.useState<number>( -1 );
  const amenitiesListSummary: string[] = [ "Room Amenities", "Furniture Amenities", "Facility Amenities", "Room Offer Amenities", "Payment Amenities", "Safety Amenities", "Policies Amenities" ];
  const handleChange = ( listIndex: number ) => setExpanded( prevExpanded => prevExpanded === listIndex ? -1 : listIndex );
  function handleAmenitiesChange( event: React.ChangeEvent ){
    const elementId = Number( event.target.id );
    // console.log(event.target)
    if( !props.selectedIDs?.find( id => id === elementId ) ){
      props.setSelectedAmenitiesIDs(  [ ...(props?.selectedIDs ?? []), elementId ] );
    }else{
      props.setSelectedAmenitiesIDs( props.selectedIDs.filter( id => id !== elementId ) );
    }
  }
  return (
    <Stack height = "100%" display = "flex" flexDirection = "column">
      { AllAmenitiesOptions.map( ( AmenitiesOptions, index ) => (
        <Accordion disableGutters expanded = { expanded === index } onChange = { () => handleChange( index ) } key = { index }>
          <AccordionSummary
            expandIcon = { <ExpandMoreIcon /> }
            aria-controls = "panel1bh-content"
            id = "panel1bh-header"
          >
            <Typography sx = { { width: '33%', flexShrink: 0 } }>
              { amenitiesListSummary[index] }
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */ }
          </AccordionSummary>
          <AccordionDetails style = { { overflowY: 'scroll' } }>
            <MultilineCheckbox
              display = "grid" column = { 6 }
              optionList = { AmenitiesOptions }
              selectedAmenitiesIDs = { props.selectedIDs }
              setSelectedAmenitiesIDs = { props.setSelectedAmenitiesIDs }
              onChange = { handleAmenitiesChange }
            />
          </AccordionDetails>
        </Accordion>
      ) ) }
    </Stack>
  );
};
export default Amenities;
