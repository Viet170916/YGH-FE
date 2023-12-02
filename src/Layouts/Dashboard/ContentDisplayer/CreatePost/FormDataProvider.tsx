import dayjs, { Dayjs } from "dayjs";
import { nanoid } from "nanoid";
import React, { createContext, JSX, useContext, useReducer } from "react";
import { IPosition } from "./Address/Address.tsx";
import { IApartment } from "./ApartmentCollection/Apartment.tsx";
import { AllPolicies } from "./Policies/Policies.tsx";
import { Image } from "./PostImages/PostImages.tsx";

export const useFormStore = () => {
  const context = useContext( FormDataContext );
  if( context === undefined ){
    throw new Error( 'useFormStore must be used within a FormDataProvider' );
  }
  return context;
};
export const initImageCollection = () => Array( 5 ).fill( '' ).map( () => ({
  id: nanoid(),
  url: '',
  caption: '',
  data: '',
}) );
export const initApartment = (): IApartment => ({
  id: nanoid(),
  name: '',
  description: '',
  images: Array( 5 ).fill( '' ).map( () => ({
    id: nanoid(),
    url: '',
    caption: '',
    data: '',
  }) ),
  quantity: 0,
  maxOccupant: 0,
  area: 0,
  price: 0,
  typeOfBed: [ 'DOUBLE_BED' ],
  amenitiesIDs: [],
  completed: false,
});
export const initPolicies = (): AllPolicies => ({
  checkinPreferHoursFrom: "",
  checkinPreferHoursTo: "",
  checkoutPreferHoursFrom: "",
  checkoutPreferHoursTo: "",
  cancellation: "",
  payment: "",
  // other: []
});
interface IProps{
  children?: JSX.Element;
}
export enum EnumStage{
  ESTATE_TYPE = 0,
  ACCOM_IMAGE = 1,
  TITLE_AND_DESC = 2,
  POLICIES = 3,
  ADDRESS = 4,
  EXPIRATION = 5,
  APARTMENTS = 6,
}
interface FormData{
  ESTATE_TYPE: {
    estateTypeId: number
  };
  ACCOM_IMAGE: {
    accomImages: Image[]
  };
  TITLE_AND_DESC: {
    title: string
    description: string
  };
  POLICIES: AllPolicies;
  ADDRESS: {
    position: IPosition
  };
  EXPIRATION: {
    expiration: Dayjs
  };
  APARTMENTS: {
    apartments: IApartment[]
  };
}
interface FormAction{
  type: 'UPDATE_FIELD' | 'RESET_STAGE_FIELD';
  stage: keyof typeof EnumStage;
  field: 'estateTypeId' | 'accomImages' | 'title' | 'description' | 'policies' | 'position' | 'expiration' | 'apartments' | string;
  value: any;
}
function formReducer( state: FormData, action: FormAction ){
  switch( action.type ){
    case 'UPDATE_FIELD':
      return {
        ...state,
        [`${ action.stage }`]: {
          ...state[`${ action.stage }`],
          [`${ action.field }`]: action.value,
        },
      };
    default:
      throw new Error( "Reducer type is undefined" );
  }
}
const initialState: FormData = {
  ESTATE_TYPE: {
    estateTypeId: 1,
  },
  ACCOM_IMAGE: {
    accomImages: initImageCollection(),
  },
  TITLE_AND_DESC: {
    title: 'Set title here',
    description: 'Set description here',
  },
  POLICIES: { ...initPolicies() },
  ADDRESS: {
    position: {
      lat: 0,
      lng: 0,
    },
  },
  EXPIRATION: {
    expiration: dayjs().add( 10, 'day' ),
  },
  APARTMENTS: {
    apartments: [ initApartment() ],
  },
};
const FormDataContext = createContext<{ formData: FormData; dispatch: React.Dispatch<FormAction> } | undefined>( undefined );
function FormDataProvider( { children }: IProps ): JSX.Element{
  const [ formData, dispatch ] = useReducer( formReducer, initialState );
dispatch()
  return (
    <FormDataContext.Provider value = { { formData, dispatch } }>
      { children }
    </FormDataContext.Provider>
  );
}
export default FormDataProvider;

