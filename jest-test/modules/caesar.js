export default (() => {
  
  function ord(character) {
    return character.charCodeAt(0);
  }

  function shiftCharacter(character, shift) {
    const charVal = ord(character);
    if (charVal >= ord('a') && charVal <= ord('z')) {
      return String.fromCharCode(((charVal - ord('a') + shift) % 26) + ord('a'));
    } else if (charVal >= ord('A') && charVal <= ord('Z')) {
      return String.fromCharCode(((charVal - ord('A') + shift) % 26) + ord('A'));
    }
    return character;
  }
  
  const encrypt = (string, shift) => {
    return string.split('')
                 .map((character) => shiftCharacter(character, shift))
                 .join('');
  } 

  return { encrypt }
})();