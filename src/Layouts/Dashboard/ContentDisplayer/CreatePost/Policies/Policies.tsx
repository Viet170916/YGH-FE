import { Container, FormLabel, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MultilineRadio from '../../../../../Components/Common/Inputs/Radio/MultilineRadio';
import { CreatePostProps } from "../index";
import './Policies.scss';
import { CancelationPoliciesOptions, PaymentPoliciesOptions } from './PolicyList';

export interface AllPolicies{
  checkinPreferHoursFrom?: string;
  checkinPreferHoursTo?: string;
  checkoutPreferHoursFrom?: string;
  checkoutPreferHoursTo?: string;
  cancellation?: string;
  payment?: string;
  // other: string[]
}
function Policies( props: CreatePostProps ){
  const [ post, setPost ] = props.post;
  const [ policies, setPolicies ] = useState<AllPolicies>();
  useEffect( () => {
    if( policies?.payment || policies?.cancellation )
      setPolicy();
  }, [ policies ] );
  function setPolicy(){
    setPost( {
               ...post,
               policies: (policies?.cancellation&&`<p><h5><strong>Cancelation: </strong></h5>${ policies?.cancellation }</p><br/>`)+(policies?.payment&&`<p><h5><strong>Payment: </strong></h5> ${ policies?.payment }</p>`),
             } );
  }
  return (
    <Container maxWidth = { "md" }>
      <h1 className = "new-post-title">Let the tenants know more about your service</h1>
      <br />
      <div>
        <Stack spacing = { 3 }>
          <div>
            <FormLabel>1. Check-in preferred hour</FormLabel>
            <br />
            <Stack direction = "row" justifyContent = "space-around" alignItems = "center" spacing = { 5 } style = { { marginTop: '10px' } }>
              <span>From</span>
              <input
                type = "time"
                onChange = { ( event ) => {setPolicies( { ...policies, checkinPreferHoursFrom: event.target.value } );} }
                value = { policies?.checkinPreferHoursFrom }
                name = "checkinPreferHoursFrom"
                style = { {} }
              />
              <span>To</span>
              <input
                type = "time"
                onChange = { ( event ) => {setPolicies( { ...policies, checkinPreferHoursTo: event.target.value } );} }
                value = { policies?.checkinPreferHoursTo }
                name = "checkinPreferHoursTo"
              />
            </Stack>
          </div>
          <div>
            <FormLabel>2. Check-out preferred hour</FormLabel>
            <br />
            <Stack direction = "row" justifyContent = "space-around" alignItems = "center" spacing = { 5 } style = { { marginTop: '10px' } }>
              <span>From</span>
              <input type = "time" onChange = { ( event ) => {setPolicies( { ...policies, checkoutPreferHoursFrom: event.target.value } );} } value = { policies?.checkoutPreferHoursFrom } name = "checkoutPreferHoursFrom" />
              <span>To</span>
              <input type = "time" onChange = { ( event ) => {setPolicies( { ...policies, checkoutPreferHoursTo: event.target.value } );} } value = { policies?.checkoutPreferHoursTo } name = "checkoutPreferHoursTo" />
            </Stack>
          </div>
          <div>
            <FormLabel>3. Cancelation Policy</FormLabel>
            <br />
            <br />
            <MultilineRadio optionList = { CancelationPoliciesOptions } value = { policies?.cancellation ?? "" } name = "cancelation" onChange = { ( event ) => {setPolicies( { ...policies, cancellation: event.target.value } );} } />
          </div>
          <div>
            <FormLabel>4. Payment Policy</FormLabel>
            <br />
            <br />
            <MultilineRadio optionList = { PaymentPoliciesOptions } value = { policies?.payment } name = "payment" onChange = { ( event ) => {setPolicies( { ...policies, payment: event.target.value } );} } />
          </div>
          {/* <div>
						<FormLabel>5. Other Policy</FormLabel>
						<br />
						<br />
						<MultilineCheckbox optionList={OtherPoliciesOptions} name='other' onChange={setPolicy} display='stack' />
					</div> */ }
        </Stack>
      </div>
    </Container>
  );
}
export default Policies;
// const CreateNewAccommodationDTO = {//add image here and parse it before the mapping to model of accommodation
//   Id: accommodationID,
//   OwnerId: userID,
//   EstateTypesId: formData.ESTATE_TYPE.estateTypeId,
//   Title: formData.TITLE_AND_DESC.title,
//   Description: formData.TITLE_AND_DESC.description,
//   Quality: 0,
//   Policies: `,
//   Expiration: formData.EXPIRATION.expiration,
//   Longitude: formData.ADDRESS.position.lng,
//   Latitude: formData.ADDRESS.position.lat,
//   Address: undefined,
//   Status: 0,
// }
