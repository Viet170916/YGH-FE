export class Location{

  private _place_id: number;
  private _licence: string;
  private _osm_type: string;
  get place_id(): number{
    return this._place_id;
  }
  set place_id( value: number ){
    this._place_id = value;
  }
  get licence(): string{
    return this._licence;
  }
  set licence( value: string ){
    this._licence = value;
  }
  get osm_type(): string{
    return this._osm_type;
  }
  set osm_type( value: string ){
    this._osm_type = value;
  }
  get osm_id(): number{
    return this._osm_id;
  }
  set osm_id( value: number ){
    this._osm_id = value;
  }
  get lat(): string{
    return this._lat;
  }
  set lat( value: string ){
    this._lat = value;
  }
  get lon(): string{
    return this._lon;
  }
  set lon( value: string ){
    this._lon = value;
  }
  get class(): string{
    return this._class;
  }
  set class( value: string ){
    this._class = value;
  }
  get type(): string{
    return this._type;
  }
  set type( value: string ){
    this._type = value;
  }
  get place_rank(): number{
    return this._place_rank;
  }
  set place_rank( value: number ){
    this._place_rank = value;
  }
  get importance(): number{
    return this._importance;
  }
  set importance( value: number ){
    this._importance = value;
  }
  get addresstype(): string{
    return this._addresstype;
  }
  set addresstype( value: string ){
    this._addresstype = value;
  }
  get name(): string{
    return this._name;
  }
  set name( value: string ){
    this._name = value;
  }
  get display_name(): string{
    return this._display_name;
  }
  set display_name( value: string ){
    this._display_name = value;
  }
  get address(): Address{
    return this._address;
  }
  set address( value: Address ){
    this._address = value;
  }
  get boundingbox(): string[]{
    return this._boundingbox;
  }
  set boundingbox( value: string[] ){
    this._boundingbox = value;
  }
  private _osm_id: number;
  private _lat: string;
  private _lon: string;
  private _class: string;
  private _type: string;
  private _place_rank: number;
  private _importance: number;
  private _addresstype: string;
  private _name: string;
  private _display_name: string;
  private _address: Address;
  private _boundingbox: string[]

}
class Address{
  private _amenity: string;
  private _road: string;
  private _suburb: string;
  private _city_district: string;
  get amenity(): string{
    return this._amenity;
  }
  set amenity( value: string ){
    this._amenity = value;
  }
  get road(): string{
    return this._road;
  }
  set road( value: string ){
    this._road = value;
  }
  get suburb(): string{
    return this._suburb;
  }
  set suburb( value: string ){
    this._suburb = value;
  }
  get city_district(): string{
    return this._city_district;
  }
  set city_district( value: string ){
    this._city_district = value;
  }
  get city(): string{
    return this._city;
  }
  set city( value: string ){
    this._city = value;
  }
  get "ISO3166-2-lvl4"(): string{
    return this["_ISO3166-2-lvl4"];
  }
  set "ISO3166-2-lvl4"( value: string ){
    this["_ISO3166-2-lvl4"] = value;
  }
  get country(): string{
    return this._country;
  }
  set country( value: string ){
    this._country = value;
  }
  get country_code(): string{
    return this._country_code;
  }
  set country_code( value: string ){
    this._country_code = value;
  }
  private _city: string;
  private "_ISO3166-2-lvl4": string;
  private _country: string;
  private _country_code: string
}
