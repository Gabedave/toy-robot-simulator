export type IDirection = "NORTH" | "EAST" | "WEST" | "SOUTH";

export function rotate(direction: IDirection, clockwise: boolean): IDirection {
  const turns = {
    NORTH: {
      clockwise: "EAST",
      antiClockwise: "WEST",
    },
    EAST: {
      clockwise: "SOUTH",
      antiClockwise: "NORTH",
    },
    SOUTH: {
      clockwise: "WEST",
      antiClockwise: "EAST",
    },
    WEST: {
      clockwise: "NORTH",
      antiClockwise: "SOUTH",
    },
  };

  return turns[direction][
    clockwise ? "clockwise" : "antiClockwise"
  ] as IDirection;
}
