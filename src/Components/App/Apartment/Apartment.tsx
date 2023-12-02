import axios, { AxiosResponse } from "axios";
import classNames from "classnames";
import parse from "html-react-parser";
import React, { JSX, useEffect, useMemo, useState } from "react";
import { MdGrid4X4 } from "react-icons/md";
import { TfiMore } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useClickOutsideElement } from "../../../Common/Hooks/EventHook";
import { getFirstParagraph } from "../../../Common/Utils/String";
import { ApartmentDetail, RoomType } from "../../../Models/PostDetail";
import ReservationRequest from "../../../Models/ReservationRequest";
import Calendar from "../../Common/Calendar";
import { AmenityIcon, BedTypeForPost, FormatPrice, IconWrapper } from "../Icons/Icon";
import ImageSlide from "../ShowImagesRow/Images";
import "./Apartment.scss";

interface IProps{
  apartment: ApartmentDetail;
  index?: number;
  isShownByUrl?: boolean;
  unhirable?: boolean;
}
export interface Selected{
  roomType: RoomType;
  rangeDate?: { since: Date | string; to: Date | string };
  apartmentId?: number;
}
function Apartment( props: IProps ): JSX.Element{
  const redirectTo = useNavigate();
  const imagesWillDisplayOnTheLeft = (props.index ?? 0) % 2 === 0;
  const overlap = useClickOutsideElement( () => {
    overlap.current.parentNode.classList.remove( "show" );
  } );
  const [ scrollDisabled, setScrollDisabled ] = useState( false );
  const [ selected, setSelected ] = useState<Selected>( {
                                                          roomType: props.apartment.bedTypes[0],
                                                        } );
  const totalPrice = useMemo( () => {
    const price = (selected?.roomType?.price ?? 0) *
      (1 + ((selected.rangeDate?.to as Date) - (selected.rangeDate?.since as Date)) / (1000 * 60 * 60 * 24));
    return Number.isNaN( price ) ? 0 : price;
  }, [ selected ] );
  const disableScroll = () => {
    if( !scrollDisabled ){
      document.body.style.overflow = "hidden";
      setScrollDisabled( true );
    }
  };
  const enableScroll = () => {
    if( scrollDisabled ){
      document.body.style.overflow = "auto";
      setScrollDisabled( false );
    }
  };
  function openOverlap(){
    overlap.current.parentNode.classList.add( "show" );
  }
  function selectRoomType( room: RoomType ){
    setSelected( { ...selected, roomType: room } );
  }
  function selectDate( date: { since: Date | string; to: Date | string } ){
    setSelected( { ...selected, rangeDate: date } );
  }
  function createReservation(){
    if(
      localStorage["email"] == null ||
      localStorage["userName"] == null ||
      localStorage["role"] == null ||
      localStorage["KeyHeaderToken"] == null
    ){
      localStorage.clear();
      window.location.href = "/login";
    }else{
      const data: ReservationRequest = {
        apartmentId: props.apartment.id,
        fromDate: selected.rangeDate?.since,
        toDate: selected.rangeDate?.to,
        bedType: selected.roomType.type,
        createAt: new Date(),
      } as ReservationRequest;
      axios
      .post( "api/booking/create", { ...data } )
      .then( ( response: AxiosResponse<any> ) => {
        if( response.data?.["data"]?.["id"] ){
          window.location.replace(
            `/booking/${ response.data?.["data"]?.["id"] }`,
          );
        }else{
          Swal.fire(
            "failed",
            "Maybe you have missed required fields in your reservation, please try again",
            "warning",
          );
        }
      } )
      .catch( ( error ) => {
        Swal.fire( {
                     title: "Failed",
                     text: error.response.data.message,
                     icon: "error",
                     customClass: "top-z-index",
                   } );
      } );
    }
  }
  useEffect( () => {
    console.log( selected );
  }, [] );
  //config
  return (
    <div className = { "apartment-wrapper" }>
      <div
        className = { classNames(
          "apartments",
          imagesWillDisplayOnTheLeft ? "ImagesOnLeft" : "ImagesOnRight",
        ) }
      >
        { imagesWillDisplayOnTheLeft && (
          <ImageSlide
            images = { props.apartment.images }
            className = { "apartment-image-wrapper" }
            isLeft = { true }
          />
        ) }
        <div className = { "apartment-behavior" } onClick = { openOverlap }>
          <div className = { "apartment-content" }>
            <div className = { "left-apartment-content" }>
              <h2 className = { "apartment-title" }>{ props.apartment.name }</h2>
              <div
                className = { "apartment-description border-bottom-light-color" }
              >
                <section className = { "apartment-description-content" }>
                  { parse(
                    (getFirstParagraph(
                      props.apartment.description,
                    ) as string) ??
                    props.apartment.description ??
                    "",
                  ) }
                </section>
                <div className = "see-more">Show more</div>
              </div>
              <div className = { "area-below-main" }>
                <div className = { "left-content" }>
                  <span>Where you sleep</span>
                  <span
                    className = {
                      "bed-type-pre-show-wrapper overflow-x-auto-wrapper"
                    }
                  >
                    <span
                      className = { "bed-type-pre-show inside-overflow-x-auto" }
                    >
                      { props.apartment.bedTypes?.map( ( value, index: number ) => {
                        if( index < 2 )
                          return (
                            <BedTypeForPost id = { value.type } key = { value.id } />
                          );
                        if( index == 2 )
                          return (
                            <IconWrapper key = { value.id }>
                              { <TfiMore /> }
                            </IconWrapper>
                          );
                      } ) }
                    </span>
                  </span>
                  <span>Area</span>
                  <span className = { "overflow-x-auto-wrapper" }>
                    <span className = { "inside-overflow-x-auto" }>
                      <IconWrapper
                        title = {
                          <span className = { "value" }>
                            { " " }
                            { props.apartment.area }
                            <span>
                              m<sup>2</sup>
                            </span>
                          </span>
                        }
                      >
                        <MdGrid4X4 />
                      </IconWrapper>
                    </span>
                  </span>
                </div>
                <div className = { "right-content" }>
                  <span>Payment</span>
                  <div className = { "payment-benefit overflow-x-auto-wrapper" }>
                    <div
                      className = {
                        "payment-benefit-content inside-overflow-x-auto"
                      }
                    >
                      { props.apartment.amenitiesPayment?.map(
                        ( value, index: number ) => {
                          if( index < 2 )
                            return (
                              <IconWrapper key = { value.id } title = { value.name }>
                                { <AmenityIcon id = { value.id } /> }
                              </IconWrapper>
                            );
                          if( index == 2 )
                            return (
                              <IconWrapper key = { value.id }>
                                <TfiMore />{ " " }
                              </IconWrapper>
                            );
                        },
                      ) }
                    </div>
                  </div>
                  <span>Amenities</span>
                  <div className = { "payment-benefit overflow-x-auto-wrapper" }>
                    <div
                      className = {
                        "payment-benefit-content inside-overflow-x-auto"
                      }
                    >
                      { props.apartment.amenities?.map(
                        ( value, index: number ) => {
                          if( index < 2 )
                            return (
                              <IconWrapper key = { value.id } title = { value.name }>
                                { <AmenityIcon id = { value.id } /> }
                              </IconWrapper>
                            );
                          if( index == 2 )
                            return (
                              <IconWrapper key = { value.id }>
                                { " " }
                                <TfiMore />{ " " }
                              </IconWrapper>
                            );
                        },
                      ) }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className = "right-apartment-content">
              <div
                className = { "total-reservations" }
                style = { { gridArea: "right-upper" } }
              >
                <span className = { "number-of" }>
                  { props.apartment.numberOfReservation ?? 0 }
                </span>
                <span className = { "unit" } style = { { paddingLeft: "10px" } }>
                  { props.apartment.numberOfReservation > 1
                    ? "Renters"
                    : "Renter" }{ " " }
                </span>
              </div>
              <span
                className = { "available-room-displayed" }
                style = { { gridArea: "left", marginBottom: "5px" } }
              >
                <span className = { "number-of" }>
                  { props.apartment.available ?? 0 }
                </span>
                <span className = { "unit" } style = { { paddingLeft: "10px" } }>
                  { (props.apartment.available ?? 0) > 1 ? "Rooms" : "Room" }
                </span>
              </span>
              <span
                className = { "price-displayed" }
                style = { { gridArea: "right-under" } }
              >
                {
                  <>
                    { props.apartment.bedTypes.length > 1 ? "from " : "" }
                    <FormatPrice
                      number = { Math.min(
                        ...props.apartment.bedTypes.map( ( bed ) => bed.price ),
                      ) }
                    />
                    VND
                  </>
                }
              </span>
            </div>
          </div>
          <div className = "apartment-control"></div>
        </div>
        { !imagesWillDisplayOnTheLeft && (
          <ImageSlide
            images = { props.apartment.images }
            className = { "apartment-image-wrapper" }
            isLeft = { false }
          />
        ) }
      </div>
      <div
        className = { classNames(
          "apartment-overlay overlay-element ",
          "background-blur",
          props.isShownByUrl ? "show" : "",
        ) }
        onMouseEnter = { disableScroll }
        onMouseLeave = { enableScroll }
      >
        <div
          className = { classNames(
            "apartments",
            "an-overlay",
            "base-border-radius",
          ) }
          ref = { overlap }
        >
          <ImageSlide
            images = { props.apartment.images }
            className = { "apartment-image-wrapper" }
            isLeft = { true }
          />
          <div className = { "apartment-behavior" }>
            <div className = { "apartment-content border-bottom-light-color" }>
              <div className = { "left-apartment-content" }>
                <h2 className = { "apartment-title no-wrap in-3-line" }>
                  { props.apartment.name }
                </h2>
                <div
                  className = { "apartment-description border-bottom-light-color" }
                >
                  <section className = { "apartment-description-content" }>
                    { parse( props.apartment.description as string ) }
                  </section>
                </div>
                <div className = { "area-below-main" }>
                  <div className = { "amenities" }>
                    <span>Area</span>
                    <span className = { "overflow-x-auto-wrapper" }>
                      <span className = { "inside-overflow-x-auto" }>
                        <IconWrapper
                          title = {
                            <span className = { "value" }>
                              { " " }
                              { props.apartment.area }
                              <span>
                                m<sup>2</sup>
                              </span>
                            </span>
                          }
                        >
                          <MdGrid4X4 />
                        </IconWrapper>
                      </span>
                    </span>
                    <span>Amenities</span>
                    <div className = { "payment-benefit overflow-x-auto-wrapper" }>
                      <div
                        className = {
                          "payment-benefit-content inside-overflow-x-auto"
                        }
                      >
                        { props.apartment.amenities?.map( ( value ) => {
                          return (
                            <IconWrapper key = { value.id } title = { value.name }>
                              { <AmenityIcon id = { value.id } /> }
                            </IconWrapper>
                          );
                        } ) }
                      </div>
                    </div>
                    <span>Payment</span>
                    <div className = { "payment-benefit overflow-x-auto-wrapper" }>
                      <div
                        className = {
                          "payment-benefit-content inside-overflow-x-auto"
                        }
                      >
                        { props.apartment.amenitiesPayment?.map( ( value ) => {
                          return (
                            <IconWrapper key = { value.id } title = { value.name }>
                              <AmenityIcon id = { value.id } />
                            </IconWrapper>
                          );
                        } ) }
                      </div>
                    </div>
                  </div>
                  <div className = { "selection" }>
                    <span>Where you sleep</span>
                    <span
                      className = {
                        "bed-type-pre-show-wrapper overflow-x-auto-wrapper"
                      }
                    >
                      <span
                        className = { "bed-type-pre-show inside-overflow-x-auto" }
                      >
                        { props.apartment.bedTypes?.map( ( value ) => {
                          return (
                            <div
                              onClick = { () => selectRoomType( value ) }
                              key = { value.id }
                              className = { classNames(
                                selected.roomType.type === value.type
                                  ? "selected"
                                  : "",
                              ) }
                            >
                              <BedTypeForPost id = { value.type } key = { value.id } />
                            </div>
                          );
                        } ) }
                      </span>
                    </span>
                    <span>Select checkin and checkout</span>
                    <div className = { "calendar-selector" }>
                      <Calendar
                        isMultipleSelecting = { true }
                        dateRangeFilter = { ( date ) => {
                          selectDate( { since: date.since, to: date.to } );
                        } }
                        unavailableDateRanges = {
                          selected?.roomType?.unAvailableDates
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className = "right-apartment-content">
                <div
                  className = { "total-reservations" }
                  style = { { gridArea: "right-upper" } }
                >
                  <span className = { "number-of" }>
                    { props.apartment.numberOfReservation ?? 0 }
                  </span>
                  <span className = { "unit" } style = { { paddingLeft: "10px" } }>
                    { props.apartment.numberOfReservation > 1
                      ? "Renters"
                      : "Renter" }{ " " }
                  </span>
                </div>
                <span
                  className = { "available-room-displayed" }
                  style = { { gridArea: "left", marginBottom: "5px" } }
                >
                  <span className = { "number-of" }>
                    { selected?.roomType?.quantity ?? 0 }
                  </span>
                  <span className = { "unit" } style = { { paddingLeft: "10px" } }>
                    { (selected?.roomType?.quantity ?? 0) > 1
                      ? "Rooms for this type"
                      : "Room for this type" }
                  </span>
                </span>
                <span
                  className = { "price-displayed" }
                  style = { { gridArea: "right-under" } }
                >
                  {
                    <>
                      <FormatPrice
                        number = {
                          // separateDigitsOfANumber(
                          totalPrice
                          // )
                        }
                      />
                      VND
                    </>
                  }
                </span>
              </div>
            </div>
            <div className = "apartment-control ">
              { !props.unhirable && (
                <button
                  className = { "submit-button base-border-radius" }
                  onClick = { createReservation }
                >
                  Hire
                </button>
              ) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Apartment;

