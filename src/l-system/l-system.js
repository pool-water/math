export function lsystem(state, production, iteration) {
  if (iteration == 0) {
    return state;
  }

  let result = "";

  state.split("").forEach(ch => {
    let val = production[ch];
    result += val != undefined ? val : ch;
  });

  return lsystem(result, production, iteration-1);
}
