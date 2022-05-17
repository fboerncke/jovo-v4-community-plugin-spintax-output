import { processSpintaxExpression } from "../src/SpintaxOutputProcessor";
import { SpintaxOutputPlugin } from "../src/SpintaxOutputPlugin";
import { Jovo } from "@jovotech/framework";

test("test 01", () => {
  const jovo = { $output: [{ message: "alpha", reprompt: "beta" }] };
  new SpintaxOutputPlugin().processSpintaxExpressionsInOutput(jovo as Jovo);
  expect(jovo.$output[0].message).toBe("alpha");
  expect(jovo.$output[0].reprompt).toBe("beta");
});

test("test 02", () => {
  const jovo = {
    $output: [
      { message: "alpha", reprompt: "beta" },
      { message: "gamma", reprompt: "delta" },
    ],
  };
  new SpintaxOutputPlugin().processSpintaxExpressionsInOutput(jovo as Jovo);
  expect(jovo.$output[0].message).toBe("alpha");
  expect(jovo.$output[0].reprompt).toBe("beta");
  expect(jovo.$output[1].message).toBe("gamma");
  expect(jovo.$output[1].reprompt).toBe("delta");
});

test("test empty string", () => {
  const expression = "";
  expect(processSpintaxExpression(expression)).toBe("");
});

test("test whitespace", () => {
  const expression = "    \t   ";
  expect(processSpintaxExpression(expression)).toBe("");
});

test("test empty expression", () => {
  const expression = " [  ] ";
  expect(processSpintaxExpression(expression)).toBe("");
});

test("test empty alternation", () => {
  const expression = " [ | ] ";
  expect(processSpintaxExpression(expression)).toBe("");
});

test("test empty multiple alternation", () => {
  const expression = " [ | | | | ] ";
  expect(processSpintaxExpression(expression)).toBe("");
});

test("test nested empty alternations", () => {
  const expression = " [ | [ [ ] | [ ] ] ] ";
  expect(processSpintaxExpression(expression)).toBe("");
});

test("test alternation", () => {
  const expression = " [ alpha | beta ] ";
  expect(["alpha", "beta"]).toContain(processSpintaxExpression(expression));
});

test("test triple alternation", () => {
  const expression = " [ alpha | beta | gamma ] ";
  expect(["alpha", "beta", "gamma"]).toContain(
    processSpintaxExpression(expression)
  );
});

test("test nested alternation", () => {
  const expression = " [ alpha | [beta |      gamma  ] ] ";
  expect(["alpha", "beta", "gamma"]).toContain(
    processSpintaxExpression(expression)
  );
});

test("test greeting", () => {
  const expression = "hello [again|frank]";
  expect(["hello again", "hello frank"]).toContain(
    processSpintaxExpression(expression)
  );
});

test("test greeting whitespace", () => {
  const expression = "   hello   [         again    |      frank          ]     ";
  expect(["hello again", "hello frank"]).toContain(
    processSpintaxExpression(expression)
  );
});
