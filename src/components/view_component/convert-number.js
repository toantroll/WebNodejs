'use strict';

export default function convertNumber(number){
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
