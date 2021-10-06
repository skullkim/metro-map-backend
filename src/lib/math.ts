export const addStringValue = (
  otherValue1: string = '',
  otherValue2: string = ''
) => {
  return (parseInt(otherValue1) + parseInt(otherValue2)).toString();
};
