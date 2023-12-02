import AddIcon from '@mui/icons-material/Add';
import { Button, Container, Stack } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { ApartmentDTO } from "../CreatePost";
import { CreatePostProps } from "../index";
import Apartment, { CollapsedApartment } from "./Apartment";

function ApartmentsCollection( props: CreatePostProps ){
  const [ apartments, setApartments ] = useState<ApartmentDTO[]>( [] );
  const [ apartmentCollapsed, setCollapsed ] = useState<number>( 0);
  useEffect( () => {
    axios.get( "/api/apartment/get-draft", {
      params: {
        id: props.post?.[0]?.id,
      },
    } ).then( ( response: AxiosResponse<ApartmentDTO[]> ) => {
      setApartments( response.data );
    } ).catch( ( error ) => {
    } );
  }, [] );
  console.log( "apr", apartments );
  return (
    <Container maxWidth = { 'xl' }>
      <h1 className = "new-post-title">What type of rooms can you offers</h1>
      <Button
        variant = "outlined" startIcon = { <AddIcon /> } className = "add-image-button" onClick = { () => {
        setApartments( [ ...apartments, { accommodationId: props.post?.[0].id } ] );
        setCollapsed( apartments.length );
      } }
      >
        Add More
      </Button>
      <Stack flex = "true" flexDirection = "column" gap = "30px" marginTop = "20px">
        { apartments?.map( ( apartment: ApartmentDTO, index ) => {
          if( apartmentCollapsed === index )
            return (
              <Apartment apartmentState = { [ apartments, setApartments ] } apartment = { apartment } onChange = { () => {} } key = { apartment?.["id"] + "" + index } />);
          return <CollapsedApartment apartment = { apartment } setCollapsed = { setCollapsed } index = { index } />;
        } ) }
      </Stack>
    </Container>
  );
}
export default ApartmentsCollection;
