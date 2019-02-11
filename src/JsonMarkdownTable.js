// may be able to get this import from "markdown-to-jsx"
export default examples => {
  var a = examples.split("\n");
  var prior = null;
  var keys = [];
  var output = [];
  a.forEach(a => {
    a = a.trim();
    if (a.length < 2) return;
    if (a.indexOf("|") === -1) return;
    if (a.indexOf("---") != -1) {
      if (keys.length || prior == null) return; // malformat.
      prior
        .split("|")
        .filter(a => a.trim().length)
        .map(a => keys.push(a.trim()));
    } else if (keys.length) {
      var row = {};
      a.split("|")
        .filter(a => a.trim().length)
        .map((a, idx) => (row[keys[idx]] = a.trim()));
      output.push(row);
    } else prior = a;
  });
  return [keys, output];
};
