function leftPad(number: number, targetLength: number) {
  let output = Math.abs(number).toString();
  while (output.length < Math.abs(targetLength)) {
    output = '0' + output;
  }
  return output;
}

export default leftPad;
