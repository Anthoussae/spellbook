//checks to see if an object is present in an array, returns true if the object is present.

export function checkDuplicates(array, object) {
  return array.some((element) => {
    return JSON.stringify(element) === JSON.stringify(object);
  });
}
