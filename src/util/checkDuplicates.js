//checks to see if an object is present in an array, returns true if the object is present.

// this may not be functioning as intended. I am not sure if the JSON.stringify is the best way to compare objects.
export function checkDuplicates(array, object) {
  if (array.length === 0) {
    return false;
  }

  // for (let i = 0; i < array.length; i++) {
  //   let item = array[i];
  //   for (let j = 0; j < array.length; j++) {
  //     if (i != j && item == replacementArray[j]) {
  //       return true;
  //     }
  //   }
  // }

  // return false;

  return array.some((element) => {
    return JSON.stringify(element) === JSON.stringify(object);
  });
}
