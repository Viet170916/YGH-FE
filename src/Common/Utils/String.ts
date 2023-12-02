import { CheerioAPI } from "cheerio";
import * as cheerio from 'cheerio';
import qs from "qs";

export function urlParamsStringify( object: object ): string{
  return "?" + qs.stringify( object, { skipNulls: true } );
}
export function separateDigitsOfANumber( number: number |string| undefined ): string{
  if( typeof number === "string" ){
    number = parseInt( number );
  }
  const reversedString = String( number ).split( "" ).reverse().join( "" );
  let formattedString = "";
  for( let i = 0; i < reversedString.length; i++ ){
    formattedString += reversedString[i];
    if( (i + 1) % 3 === 0 && i !== reversedString.length - 1 ){
      formattedString += ",";
    }
  }
  return formattedString.split( "" ).reverse().join( "" );
}
export function formatPhoneNumber( phoneNumber: string | undefined ){
  if( phoneNumber?.charAt( 0 ) !== '0' ){
    phoneNumber = '0' + phoneNumber;
  }
  const numericString = phoneNumber?.replace( /\D/g, "" );
  let formattedNumber = "";
  if( numericString?.length >= 10 ){
    formattedNumber += numericString?.slice( 0, 4 ) + " ";
    formattedNumber += numericString?.slice( 4, 7 ) + " ";
    formattedNumber += numericString?.slice( 7 );
  }
  return formattedNumber?.trim();
}
export function getFirstParagraph(text:string = ""): string|null{
  const $:CheerioAPI = cheerio.load( text );
  return $( 'p' as any).first().html();
}
function extractHost(url: string): string | null {
  try {
    const uri = new URL(url);
    return uri.hostname;
  } catch (error) {
    return null;
  }
}
