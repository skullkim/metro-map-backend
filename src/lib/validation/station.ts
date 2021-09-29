import { StationFromTo } from '../../entity/stationFromTo';

export enum StationKr {
  FROM = '출발점',
  STOPOVER = '경유지',
  TO = '도착지',
}

export const checkEmpty = (station: string, stationName: StationKr) => {
  if(!station && station !== undefined) {
    return `${stationName}이(가) 존재하지 않습니다`;
  }
  return '';
}

export const involveChar = (station: string, stationName: StationKr) => {
  if(station === undefined) return;
  const numRegx = /^[0-9]*$/;
  if(station.length >= 5 || !station.match(numRegx)) {
    return `존재하지 않는 ${stationName} 입니다`;
  }
  return '';
}

export const isSameStation = (station1: string, station2: string, stationName1: StationKr, stationName2: StationKr) => {
  if(station1 === undefined || station2 === undefined) return;
  return station1 == station2 ? `${stationName1} 와 ${stationName2}가 같을 수 없습니다` : '';
}

export const hasStation = async (station: string, stationName: StationKr) => {
  try {
    if(station === undefined) return;
    const target = await StationFromTo.hasStation(station);
    return !target ? `존재하지 않는 ${stationName}입니다` : '';
  }
  catch(err) {
    throw err;
  }
}