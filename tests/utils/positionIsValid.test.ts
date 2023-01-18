import { describe, expect, it } from "@jest/globals";
import positionIsValid from "../../src/utils/positionIsValid";

describe("positionIsValid", () => {
  it("should return true for a valid position", () => {
    expect(positionIsValid([3, 2])).toBe(true);
  });

  it("should return false for an invalid position", () => {
    expect(positionIsValid([-1, 2])).toBe(false);
    expect(positionIsValid([3, 5])).toBe(false);
  });
});
