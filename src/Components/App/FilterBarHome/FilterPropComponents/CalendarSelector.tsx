  import { JSX, useEffect, useState } from "react";
  import { BsCalendar2Day } from "react-icons/bs";
  import { useClickOutsideElement } from "../../../../Common/Hooks/EventHook";
  import Calendar from "../../../Common/Calendar";
  import "../FilterBar.scss";

  interface IProps{
    getSelectedDate: ( range: { since: Date|string, to?: Date|string } ) => void;
  }
  function CalendarSelector( props: IProps ): JSX.Element{
  //config
  //hooks
    const calendarSelector = useClickOutsideElement( () => {calendarSelector?.current?.classList?.remove( "expand-y" );} );
    const [ selectedDate, setSelectedDate ] = useState<{ since: Date; to?: Date }>( { since: new Date() } );
    useEffect( () => {props.getSelectedDate( selectedDate );}, [ selectedDate ] );
  //handler functions
    const toggleSelector =()=>{
      if( calendarSelector?.current?.classList?.contains( "expand-y" ) ){
        calendarSelector?.current?.classList?.remove( "expand-y" );
      }else{
        calendarSelector?.current?.classList?.add( "expand-y" );
      }
    }
  //render
    return (
      <div className = { "filter-prop calendar-filter" }>
        <button className = "filter-btn" onClick = { toggleSelector }>
          <div className = "filter-icon">
            <BsCalendar2Day className = { "btn-icon" } />
          </div>
          <span className = "filter-text">{ selectedDate?.since?.toDateString() + " - " + selectedDate?.to?.toDateString() }</span>
        </button>
        <div className={"calendar-filter-selector-wrapper can-be-hidden-wrapper"} ref = { calendarSelector }>
          <div className = { "calendar-filter-selector can-be-hidden" } >
            <Calendar
              isMultipleSelecting={true}
              dateRangeFilter = { ( range ) => {
                setSelectedDate( range );
              } }
            />
          </div>
        </div>

      </div>
    );
  }
  export default CalendarSelector;
             










  