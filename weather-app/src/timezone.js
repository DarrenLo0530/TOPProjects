function getUTC() {
  const date = new Date();
  const localOffset = date.getTimezoneOffset() * -60000;
  return date.getTime() - localOffset;
}

function localTime(offset) {
  return new Date(getUTC() + offset);
}

export default localTime;
