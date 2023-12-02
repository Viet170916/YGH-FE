import { useEffect, useRef } from "react";

export function useClickOutsideElement<T>( outSideClickHandler: Function ){
  const listElement = useRef<any|Node>(null);
  useEffect( () => {
      const clickOut =
        ( event: MouseEvent ) => {
          if( listElement?.current && !listElement?.current?.contains( event?.target as Node ) ){
            outSideClickHandler( event );
          }
        };
      document.addEventListener( "mouseup", clickOut );

      return () => {
        document.removeEventListener( 'mouseup', clickOut );
      };
    },
    [] );
  return listElement;
}

