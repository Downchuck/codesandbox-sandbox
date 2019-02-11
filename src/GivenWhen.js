const BDD = ({ TestScenario, Expected }) => {
  const latest = { result: [] };
  const routes = [];
  const tests = [];
  const Route = (strPattern, fn) => {
    const keys = (strPattern.match(/:(\w*)/g) || []).map(a => a.substr(1));
    // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    const re = new RegExp(
      strPattern
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replace(/:(\w*)/g, "(.*?)")
    );
    routes.push({ re, strPattern, fn, keys });
  };
  const Given = (strPattern, fn) => {
    if (routes.length) {
      const rules = routes.splice(0, routes.length);
      tests.push(rules);
    }
    if (strPattern) Route(strPattern, fn);
  };
  const Then = Route;
  const When = Route;
  const End = () => {
    Given();

    const LineTrim = str =>
      str
        .split("\n")
        .map(a => a.trim())
        .filter(a => a.length);
    const Spec = LineTrim(TestScenario);
    var rootTests = tests.filter(a => null !== a[0].re.exec(Spec[0]));
    const history = [];
    const highlight = rootTests[0].map((test, step) => {
      if (step > Spec.length) return;
      var parts = test.re.exec(Spec[step]);
      if (parts === null) return Spec[step];
      var matched =
        parts.input.substr(0, parts.index) +
        "<match>" +
        parts[0] +
        "</match>" +
        parts.input.substr(parts[0].length + parts.index);
      const pieces = test.keys.reduce(
        (arr, key, i) => ({ [key]: parts[i + 1], ...arr }),
        {}
      );
      const output = [matched, test.fn(pieces)];
      return output;
    });

    const output = LineTrim(highlight.map(a => a[1]).join("\n")).join("");
    const testExpects = LineTrim(Expected).join("");
    latest.result = [testExpects, output, highlight.map(a => a[0])];
  };
  return { latest, Given, Then, End };
};
export default BDD;
