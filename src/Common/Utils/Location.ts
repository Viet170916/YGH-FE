import axios, { AxiosResponse } from "axios";
import IYGLocation from "../../Models/YG_Location";

async function yG_Location( latitude: number, longitude: number ): Promise<AxiosResponse<IYGLocation>>{
  const suburb = await axios.get( `/reverse`, {
    baseURL: "https://nominatim.openstreetmap.org",
    params: {
      format: "json",
      lat: latitude,
      lon: longitude,
      zoom: 18,
      addressdetails: 1,
    },
  } );

  return axios.get( "/api/location/search-exact", { params: { q: suburb.data?.["address"]?.["suburb"] ?? suburb.data?.["address"]?.['county'] } } );
}
export default yG_Location;
export async function openStreetLocation( latitude: number, longitude: number ): Promise<string>{
  const data = await axios.get( `/reverse`, {
    baseURL: "https://nominatim.openstreetmap.org",
    params: {
      format: "json",
      lat: latitude,
      lon: longitude,
      zoom: 18,
      addressdetails: 1,
    },
  } );
  return data.data?.display_name;
}
