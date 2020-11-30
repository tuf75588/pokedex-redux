// basic shuffle function to randomize pokemon

export function shuffle(array: any[]): any[] {
  let counter = array.length;
  while (counter > 0) {
    // pick a random index;
    let index = Math.floor(Math.random() * counter);
    counter--;

    /* swap the last element with it  */
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}
