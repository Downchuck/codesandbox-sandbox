import JsonMarkdownTable from "./JsonMarkdownTable";

const Logic = (
  [count, updateCount], // = React.useState(0),
  Decrement = () => updateCount(c => c - 1),
  Increment = () => updateCount(c => c + 1)
) => ({ count, Increment, Decrement });

export default Logic;

// import Markdown from 'markdown-to-jsx';
Logic.examples = `
\`\`\`
Scenario Outline: Increment and Decrement
  Given <Logic /> starts with count 0
  When I run <actions>
  Then I should have a count <count>
\`\`\`

Examples

| count   | actions |
 ---      | --- 
|  0      | noop
|  1      | Increment
| -1      | Decrement
|  2      | Increment, Increment
|  0      | Increment, Decrement
`;

// Display tests in a markdown table
Logic.runReport = () =>
  (({ total, pass, fail, cols, rows }) => `
Tests ${total} Pass ${pass} Fail ${fail}

${cols.join("|")}
${cols.map(a => " --- ").join("|")}
${rows.join("|\n|")}
`)(Logic.spec());

// Spec runner
Logic.spec = ([keys, output] = JsonMarkdownTable(Logic.examples)) => {
  const cols = [...keys, "output", "status"];

  const mockState = (defaultState, state = defaultState) => [
    { valueOf: () => state },
    fn => (state = fn(state))
  ];
  const LogicFactory = () => Logic(mockState(0));

  const rows = output
    .map(sample => {
      var instance = LogicFactory();
      var expect = Number(sample.count);
      var actions = sample.actions
        .trim()
        .split(",")
        .map(a => a.trim());
      actions.forEach(fn => (fn in instance ? instance[fn]() : null));
      return [
        instance.count.valueOf() === expect,
        instance.count.valueOf(),
        expect,
        actions
      ];
    })
    .map(a => [a[2], a[3].join(", "), a[1], a[0] ? "PASS" : "FAIL"].join("|"));

  var [total, pass, fail] = [
    rows.length,
    rows.filter(a => a[0] === "PASS").length,
    rows.filter(a => a[0] === "FAIL").length
  ];

  return { cols, rows, total, pass, fail };
};
