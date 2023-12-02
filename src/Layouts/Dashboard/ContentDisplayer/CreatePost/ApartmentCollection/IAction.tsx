import { IApartment } from "./Apartment.tsx";

export default interface IAction{
  type: string;
  field?: keyof IApartment | string;
  value?: any;
}
