import { rotate } from "../../src/utils/rotate";

describe("rotate", () => {
  it("should rotate NORTH clockwise to EAST", () => {
    expect(rotate("NORTH", true)).toBe("EAST");
  });

  it("should rotate EAST anti-clockwise to NORTH", () => {
    expect(rotate("EAST", false)).toBe("NORTH");
  });

  it("should rotate SOUTH clockwise to WEST", () => {
    expect(rotate("SOUTH", true)).toBe("WEST");
  });

  it("should rotate WEST anti-clockwise to SOUTH", () => {
    expect(rotate("WEST", false)).toBe("SOUTH");
  });
});
