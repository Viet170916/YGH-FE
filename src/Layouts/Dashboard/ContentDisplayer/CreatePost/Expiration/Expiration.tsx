import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PaymentsIcon from '@mui/icons-material/Payments';
import PercentIcon from '@mui/icons-material/Percent';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import { Container, Grid, Stack } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useState } from "react";
import { CreatePostProps } from "../index";

function Expiration( props: CreatePostProps ){
  const [ post, setPost ] = props.post;
  dayjs.extend( duration );
  dayjs.extend( relativeTime );
  // const { expiration, setExpiration } = useState(Date.now());
  const [ expiration, setExpiration ] = useState<Dayjs>( post?.expiration ? dayjs( post?.expiration ) : dayjs().add( 10, 'day' ) );
  const [ dayDuration, setDayDuration ] = useState( 0 );
  const moneyFormat = new Intl.NumberFormat( 'vi-VN', { style: 'currency', currency: 'VND' } );
  function isExpirationSuccess(){
    return true;
  }
  useEffect( () => {
    // props?.setCompleted?.((prevCompletedArray: boolean[]) => prevCompletedArray.map(
    //     (prevCompleted, index) => index === props.currentStage ? isExpirationSuccess() : prevCompleted)
    // )
    setDayDuration( Math.round( dayjs.duration( expiration?.diff( dayjs() ) )?.asDays() ));
    setPost( { ...post, expiration: expiration.toDate() } );
  }, [ expiration ] );
  return (
    <>
      <h1 className = "new-post-title">How many day would you want the post to active</h1>
      <Stack spacing = { 2 } flex = "true" flexDirection = "row">
        <Stack>
          <div>
            <LocalizationProvider dateAdapter = { AdapterDayjs }>
              <Container>
                <DateCalendar
                  value = { expiration }
                  onChange = { ( newValue ) => {setExpiration( newValue );} }
                  autoFocus disablePast
                />
              </Container>
            </LocalizationProvider>
          </div>
          <div>From { dayjs()?.format( "DD-MM-YYYY" ) } to { expiration?.format( "DD-MM-YYYY" ) }.</div>
          <strong>Totals: { dayDuration } { dayDuration > 1 ? "days" : "day" }</strong>
        </Stack>
        <Grid container border = "2px dashed black" padding = "10px">
          <Grid container>
            <Grid item xs = { 2 }>
              <TimelapseIcon />
            </Grid>
            <Grid item xs>
              Durations:
            </Grid>
            <Grid item xs = { 3 }>
              { dayDuration }
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs = { 2 }>
              <LocalOfferIcon />
            </Grid>
            <Grid item xs>
              Price per Day:
            </Grid>
            <Grid item xs = { 3 }>
              { moneyFormat.format( 20000 ) }
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs = { 2 }>
              <PaymentsIcon />
            </Grid>
            <Grid item xs>
              Subtotal:
            </Grid>
            <Grid item xs = { 3 }>
              { moneyFormat.format( dayDuration * 20000 ) }
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs = { 2 }>
              <PercentIcon />
            </Grid>
            <Grid item xs>
              Discount:
            </Grid>
            <Grid item xs = { 3 }>
              0%
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs = { 2 }>
              <AttachMoneyIcon />
            </Grid>
            <Grid item xs>
              Total:
            </Grid>
            <Grid item xs = { 3 }>
              { moneyFormat.format( dayDuration * 20000 ) }
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
export default Expiration;
