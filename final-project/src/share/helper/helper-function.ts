export const convertFromStringToDate = (responseDate: string) => {
  const dateComponents = responseDate.replace('Z', '').split('T');
  const datePieces = dateComponents[0].split('-');
  const timePieces = dateComponents[1].split(':');
  return `${datePieces[2]}/0${parseInt(datePieces[1])}/${datePieces[0]} ${timePieces[0]}:${
    timePieces[1]
  } EST`;
};