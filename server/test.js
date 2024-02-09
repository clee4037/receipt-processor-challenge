const {
  calculatePoints,
  countAlphanumericChars,
  isRoundDoller,
  isMultipleOfQuarter,
  countEveryTwoItems,
  itemDescriptionPoints,
  isOddDay,
  isBetweenTimes,
} = require("./middleware");
const morning = require("../examples/morning-receipt.json");
const simple = require("../examples/simple-receipt.json");
const mm = require("../examples/m&m-receipt.json");

describe("countAlphanumericChars", () => {
  test("Counts alphanumeric characters correctly", () => {
    const result = countAlphanumericChars("Target");
    expect(result).toBe(6);
  });

  test("Excludes non-alphanumeric characters", () => {
    const result = countAlphanumericChars("Target / % & * ^");
    expect(result).toBe(6);
  });

  test("Handles empty string", () => {
    const result = countAlphanumericChars("");
    expect(result).toBe(0);
  });
});

describe("isRoundDoller", () => {
  test("Return 1 for round dollar amount", () => {
    const result = isRoundDoller("10.00");
    expect(result).toBe(1);
  });

  test("Returns 0 for non-round dollar amount", () => {
    const result = isRoundDoller("5.25");
    expect(result).toBe(0);
  });

  test("Handles dollar amount as float", () => {
    const result = isRoundDoller(5.25);
    expect(result).toBe(0);
  });

  test("Handles dollar amount as integer", () => {
    const result = isRoundDoller(5);
    expect(result).toBe(1);
  });
});

describe("isMultipleOfQuarter", () => {
  test("Returns 1 for dollar amount that's a multiple of 1/4", () => {
    const result = isMultipleOfQuarter("10.00");
    expect(result).toBe(1);
  });

  test("Returns 0 for dollar amount that's not a multiple of 1/4", () => {
    const result = isMultipleOfQuarter("5.15");
    expect(result).toBe(0);
  });

  test("Handles dollar amount as float", () => {
    const result = isMultipleOfQuarter(5.15);
    expect(result).toBe(0);
  });

  test("Handles dollar amount as integer", () => {
    const result = isMultipleOfQuarter(5);
    expect(result).toBe(1);
  });
});

describe("countEveryTwoItems", () => {
  const example1 = [
    { shortDescription: "Pepsi - 12-oz", price: "1.25" },
    { shortDescription: "Dasani", price: "1.40" },
  ];
  test("Handles even numbers correctly", () => {
    const result = countEveryTwoItems(example1);
    expect(result).toBe(1);
  });

  const example2 = [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }];
  test("Handles odd numbers correctly", () => {
    const result = countEveryTwoItems(example2);
    expect(result).toBe(0);
  });
});

describe("itemDescriptionPoints", () => {
  const example1 = [
    { shortDescription: "Pepsi - 12-oz", price: "1.25" },
    { shortDescription: "Dasani", price: "1.40" },
  ];
  test("Handles trimmed length that's a multiple of 3", () => {
    const result = itemDescriptionPoints(example1);
    expect(result).toBe(1);
  });

  const example2 = [{ shortDescription: "Pepsi - 12-oz", price: "1.25" }];
  test("Returns 0 for trimmed length not a multiple of 3", () => {
    const result = itemDescriptionPoints(example2);
    expect(result).toBe(0);
  });
});

describe("isOddDay", () => {
  test("Returns 1 for odd day", () => {
    const result = isOddDay("2022-01-01");
    expect(result).toBe(1);
  });

  test("Returns 0 for even day", () => {
    const result = isOddDay("2022-01-02");
    expect(result).toBe(0);
  });
});

describe("isBetweenTimes", () => {
  test("Returns 1 for purchase between 2pm and 4pm", () => {
    const result = isBetweenTimes("14:30");
    expect(result).toBe(1);
  });
  test("Returns 0 for purchase at  2pm", () => {
    const result = isBetweenTimes("14:00");
    expect(result).toBe(0);
  });
  test("Returns 0 for purchase at 4pm", () => {
    const result = isBetweenTimes("16:00");
    expect(result).toBe(0);
  });
});

describe("calculatePoints", () => {
  test("Calculates morning-receipt.json correctly", () => {
    const result = calculatePoints(morning);
    expect(result).toBe(15);
  });
  test("Calculates simple-receipt.json correctly", () => {
    const result = calculatePoints(simple);
    expect(result).toBe(28);
  });
  test("Calculates mm-receipt.json correctly", () => {
    const result = calculatePoints(mm);
    expect(result).toBe(109);
  });
});
