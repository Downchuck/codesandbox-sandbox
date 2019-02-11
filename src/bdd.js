import BDD from "./GivenWhen";

// executable spec
const CAD_4218 = {
  AC_2: `If a customer has insufficient credits, they should get an error message informing of them of this when they attempt to run an action.`,
  TS_2: `
    Given a customer subscription with no available credits on their account
    When they try to run an epitope prediction action on their PDB
    Then the they receive the notification "User does not have sufficient credits to complete the transaction"`,
  TCMS_3: `
    <Billing credits={0} />
    <Actions><Action model="mockAction" status="FAIL" /></Actions>
    <LoggingService warning="User does not have sufficient credits to complete the transaction" />
   `
};

// expose the test results
const attrs = { figure: null, title: null, result: null, error: null };
const describe = (str, fn) => {
  attrs.figure = str;
  fn();
};
const it = (str, fn) => {
  attrs.title = str;
  try {
    attrs.result = fn()[0];
  } catch (e) {
    attrs.error = e.result.join("\n\n----------------\n\n");
  }
};
export default attrs;

const { AC_2, TS_2, TCMS_3 } = CAD_4218;

describe(AC_2, () => {
  const [Story, TestScenario, Expected] = [AC_2, TS_2, TCMS_3];
  const { latest, Given, Then, End } = BDD({
    Story,
    TestScenario,
    Expected
  });

  const RunAnyAction = ({ any }) => {
    // any is always EpitopePrediction
    // <EpitopePrediction {...{onMessage}} />.click();
  };

  Given("no available credits", () => `<Billing credits={0} />`);
  Then(
    "run :any action",
    ({ any }) =>
      `<Actions><Action model="mockAction" status="FAIL" /></Actions>`
  );
  Then(
    'notification ":message"',
    ({ message }) => `<LoggingService warning="${message}" />`
  );
  End();
  latest.result.push(TestScenario);
  it(latest.result[2].join("\n"), () => {
    if (latest.result[0] != latest.result[1])
      throw { message: "No good", result: latest.result };
    return latest.result;
  });
});
