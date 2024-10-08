// type of enums as i dont know what to use else
type Enums = any;

// Returns the name of the enum value
export function enumToName(enums: Enums, value: number) {
  return enums[value];
}

// Returns the string keys of the enum
export function enumToStringArray(enums: Enums) {
  return Object.values(enums).filter(v => Number.isNaN(Number(v))) as string[];
}

// Returns the values of the enum
export function enumToNumberArray(enums: Enums) {
  return Object.values(enums).filter(v => !Number.isNaN(Number(v))) as number[];
}

export function getLowestEnumValue(enums: Enums) {
  let lowest = Number.MAX_VALUE;
  for (let val of enumToNumberArray(enums)) {
    if (val < lowest) {
      lowest = val;
    }
  }
  return lowest;

}
export function getHighestEnumValue(enums: Enums) {
  let highest = Number.MIN_VALUE;
  for (let val of enumToNumberArray(enums)) {
    if (val > highest) {
      highest = val;
    }
  }
  return highest;
}
