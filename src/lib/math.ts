import convert from 'convert-units';

export const addStringValue = (
  otherValue1: string = '',
  otherValue2: string = ''
) => {
  return (parseInt(otherValue1) + parseInt(otherValue2)).toString();
};

export const convertSecond = (second: string = '') => {
  const minute: number = convert(parseInt(second)).from('s').to('min');
  const tmpResult: string = (
    minute >= 60 ? convert(minute).from('min').to('h') : minute
  ).toString();
  const isHour = minute >= 60;
  let result = '';
  if (tmpResult.includes('.')) {
    const resultArr = tmpResult.split('.');
    const pointUpper = isHour ? resultArr[0] + '시간' : resultArr[0] + '분';
    const pointBelow = isHour
      ? `${convert(Number(`0.${resultArr[1]}`))
        .from('h')
        .to('min')
        .toFixed(0)}분`
      : `${convert(Number(`0.${resultArr[1]}`))
        .from('min')
        .to('s')
        .toFixed(0)}초`;
    result = `${pointUpper} ${pointBelow}`;
  } else {
    result = isHour ? `${tmpResult} 시간` : `${tmpResult} 분`;
  }
  return result;
};

export const addUnitToMoney = (money: string = '') => {
  return money + '원';
};

export const convertDistance = (distance: string = '') => {
  return distance.length >= 4
    ? `${convert(parseInt(distance)).from('m').to('km').toString()}km`
    : `${distance}m`;
};
