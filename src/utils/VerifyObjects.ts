export const containsStringInObject = (object: { [key: string]: any }, stringsToCheck: string[]): boolean => {
    return Object.values(object).some(value => 
      stringsToCheck.includes(value)
    );
  }