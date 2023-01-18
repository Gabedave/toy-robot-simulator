const positionIsValid = (position: [number, number]) => {
  for (let i = 0; i < position.length; i++) {
    const x = position[i];
    if (x < 0 || x >= 5) {
      return false;
    }
  }
  return true;
};

export default positionIsValid;
