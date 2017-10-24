'use strict';

export default function convertNumber(number){
  if(number === undefined || number === null || number ===''){
    return '';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
