import * as R from 'rambda';

const DEFAULT_COEFFICIENT = 1;

export type CoefficientMap = Record<number, number>;

export function createCoefficientMap<T>(
  entities: T[],
  idProperty: keyof T,
  coefficientPath: string
) {
  return entities.reduce((map, entity) => {
    map[entity[idProperty] as unknown as number] = R.path(
      coefficientPath,
      entity
    ) as number;
    return map;
  }, {} as CoefficientMap);
}

export function getCoefficient(coefficientMap: CoefficientMap, id: number) {
  return coefficientMap[id] === undefined
    ? DEFAULT_COEFFICIENT
    : coefficientMap[id];
}

export function calcTotalOutcomes(
  coefficientMap: CoefficientMap,
  ids: number[]
) {
  return ids.reduce((sum, id) => sum + getCoefficient(coefficientMap, id), 0);
}

export function calcProbability(
  coefficientMap: CoefficientMap,
  ids: number[],
  id: number
) {
  return (
    Math.round(
      (getCoefficient(coefficientMap, id) * 10000) /
        calcTotalOutcomes(coefficientMap, ids)
    ) / 100
  );
}
