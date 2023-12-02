export function ConvertQualityToStar( quality: number|undefined ): number[]{
  if( typeof quality !== "number" ){
    return [];
  }else{
    let a: number[] = [];
    const last: number = quality - Math.round( quality );
    for( let i: number = 1; i < quality; i++ ){
      a.push( 1 );
    }
    if( last != 0 ){
      a.push( last );
    }
    return a;
  }
}
