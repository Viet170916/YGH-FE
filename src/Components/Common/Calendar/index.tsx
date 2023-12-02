import classNames from "classnames";
import { JSX, useEffect, useState } from "react";
import { BiSolidChevronLeftSquare, BiSolidChevronRightSquare } from "react-icons/bi";
import "./Calendar.scss";

interface IProps{
  dateRangeFilter: ( range: { since?: Date; to?: Date } ) => void;
  unavailableDateRanges?: { since: Date | string; to: Date | string }[];
  initRage?: { since: Date, to: Date };
  isMultipleSelecting?: boolean;
}
function Calendar( props: IProps ): JSX.Element{
  const now = new Date();
  now.setHours( 0, 0, 0, 0 );
  const unavailableDates: { since: Date; to: Date }[] = props.unavailableDateRanges?.map( ( date ) => {
    return {
      since: typeof date.since == "string" ? new Date( new Date( date.since ).toDateString() ) : date.since,
      to: typeof date.to == "string" ? new Date( new Date( date.to ).toDateString() ) : date.to,
    };
  } );
//config
  const [ currentDate, setCurrentDate ] = useState( new Date() );
  const [ currentSelected, setCurrentSelected ] = useState();
  const [ dateRange, setRange ] = useState<{ since?: Date, to?: Date }>( props.initRage ?? {} );
//hooks
  useEffect( () => {
    if( dateRange.to && dateRange.since ){
      const newDateSince = new Date( dateRange.since );
      newDateSince.setDate( dateRange.since.getDate() + 1 );
      const newDateTo = new Date( dateRange.to );
      newDateTo.setDate( dateRange.to.getDate() + 1 );
      props.dateRangeFilter( { since: newDateSince, to: newDateTo } );
    }
  }, [ dateRange ] );
//handler functions
  const getNextMonth = () => {
    const newDate = new Date( currentDate );
    newDate.setMonth( newDate.getMonth() + 1 );
    setCurrentDate( newDate );
  };
  const getPreviousMonth = () => {
    const newDate = new Date( currentDate );
    newDate.setMonth( newDate.getMonth() - 1 );
    if( (newDate.getMonth() < now.getMonth()) && (newDate.getFullYear() === now.getFullYear()) ){
    }else{
      setCurrentDate( newDate );
    }
  };
  const getDaysInMonth = ( year:number, month:number ) => {
    return new Date( year, month + 1, 0 ).getDate();
  };
  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const daysToAdd = (firstDayOfMonth.getDay() + 6) % 7; // Số ngày cần thêm để bắt đầu từ thứ 2
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1 - daysToAdd,
  );
  const allDays = [];
  for( let i = 0; i < 42; i++ ){
    const currentDay = new Date( startDate );
    currentDay.setDate( startDate.getDate() + i );
    allDays.push( currentDay );
  }
  function isAnyOverlap( existingRanges, newRange ){
    for( const range of existingRanges ){
      if(
        (newRange.since > range.since && newRange.since < range.to) ||
        (newRange.to > range.since && newRange.to < range.to) ||
        (newRange.since < range.since && newRange.to > range.to)
      ){
        return true;
      }
    }
    return false;
  }
  function selectDate( date: Date ){
    if( date >= now ){
      if( !checkIsAvailableDate( date ) ) return;
      else if( dateRange?.to || !dateRange?.since ){
        setRange( { since: date } );
      }else if( date > dateRange.since ){
        if( isAnyOverlap( unavailableDates, { ...dateRange, to: date } ) ) return;
        setRange( { ...dateRange, to: date } );
      }else if( date.toDateString() === dateRange.since.toDateString() ){
        setRange( { ...dateRange, to: date } );
      }
    }
  }
  function checkIsAvailableDate( date: Date ): boolean{
    if( !unavailableDates ){return true;}
    return unavailableDates.find( ( unavailable ) => unavailable.since <= date && unavailable.to >= date ) === undefined;
  }
//render
  return (
    <div className = "calendar-container">
      <div className = "current-date-time">
        <div className = "current-date">
          <h1>{ currentDate.toDateString() }</h1>
          <div className = { "buttons-wrapper" }>
            <button className = { `previous-button ${ (now.getMonth() + "" + now.getFullYear()) === (currentDate.getMonth() + "" + currentDate.getFullYear()) && "inactive" }` } onClick = { getPreviousMonth }><BiSolidChevronLeftSquare /></button>
            <button className = { "next-button" } onClick = { getNextMonth }><BiSolidChevronRightSquare /></button>
          </div>
        </div>
        <div className = "current-month">
          <ul className = "week-days">
            <li>MON</li>
            <li>TUE</li>
            <li>WED</li>
            <li>THU</li>
            <li>FRI</li>
            <li>SAT</li>
            <li>SUN</li>
          </ul>
          <div className = "calendar-board">
            { allDays.map( ( date: Date ) => (
              <span
                className = { classNames( "date-in-month",
                                          (date.toDateString() === now.toDateString()) && "active",
                                          date.getMonth() !== currentDate.getMonth() && "not-in-current-month",
                                          date < now && "over",
                                          ((date >= dateRange?.since && date <= dateRange?.to) || date?.toDateString() === dateRange?.since?.toDateString()) && "selected",
                                          !checkIsAvailableDate( date ) && "over is-overlap",
                ) }
                key = { date.toLocaleDateString() }
                onClick = { () => {selectDate( date );} }
              >{ date.getDate() }
                { (date.toDateString() === dateRange.since?.toDateString() && props.isMultipleSelecting) &&
                  <div className = { "popup-date-selected start" }>Start</div> }
                { (date.toDateString() === dateRange.to?.toDateString() && props.isMultipleSelecting) &&
                  <div className = { "popup-date-selected end" }>End</div> }

              </span>
            ) ) }
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calendar;

