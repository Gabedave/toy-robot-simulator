import Robot from "../../src/robot/Robot";

describe("Robot", () => {
  let robot: Robot;

  beforeEach(() => {
    robot = new Robot();
  });

  describe("inputCommand", () => {
    it("should return 'You should start with PLACE command' first command is not PLACE", () => {
      expect(robot.inputCommand(["LEFT"])).toBe(
        "You should start with PLACE command"
      );
    });

    describe("PLACE command", () => {
      it("should set tableIsActive to true and update position and direction", () => {
        robot.inputCommand(["PLACE", "2,3,EAST"]);
        expect(robot.tableIsActive).toBe(true);
        expect(robot.position).toEqual([2, 3]);
        expect(robot.direction).toBe("EAST");
      });

      it("should throw an error for invalid argument", () => {
        expect(() => {
          robot.inputCommand(["PLACE", "2,INVALID,EAST"]);
        }).toThrowError(
          "Invalid argument for PLACE command. Example PLACE 0,0,NORTH"
        );
        expect(() => {
          robot.inputCommand(["PLACE", "2,3,INVALID"]);
        }).toThrowError(
          "Invalid argument for PLACE command. Example PLACE 0,0,NORTH"
        );
      });

      it("should throw an error for position out of table limit", () => {
        expect(() => {
          robot.inputCommand(["PLACE", "-1,3,NORTH"]);
        }).toThrowError(
          "Position out of Table. Table limit is 0 <= x < 5, 0 <= y < 5"
        );
      });
    });

    describe("LEFT command", () => {
      it("should rotate the direction anti-clockwise", () => {
        robot.inputCommand(["PLACE", "0,0,NORTH"]);
        robot.inputCommand(["LEFT"]);
        expect(robot.direction).toBe("WEST");
      });
    });

    describe("RIGHT command", () => {
      it("should rotate the direction clockwise", () => {
        robot.inputCommand(["PLACE", "0,0,NORTH"]);
        robot.inputCommand(["RIGHT"]);
        expect(robot.direction).toBe("EAST");
      });
    });

    describe("MOVE command", () => {
      it("should move the robot up when direction is NORTH", () => {
        robot.inputCommand(["PLACE", "2,3,NORTH"]);
        robot.inputCommand(["MOVE"]);
        expect(robot.position).toEqual([2, 4]);
      });

      it("should move the robot right when direction is EAST", () => {
        robot.inputCommand(["PLACE", "2,3,EAST"]);
        robot.inputCommand(["MOVE"]);
        expect(robot.position).toEqual([3, 3]);
      });

      it("should move the robot down when direction is SOUTH", () => {
        robot.inputCommand(["PLACE", "2,3,SOUTH"]);
        robot.inputCommand(["MOVE"]);
        expect(robot.position).toEqual([2, 2]);
      });

      it("should move the robot left when direction is WEST", () => {
        robot.inputCommand(["PLACE", "2,3,WEST"]);
        robot.inputCommand(["MOVE"]);
        expect(robot.position).toEqual([1, 3]);
      });

      it("should not move the robot out of table limit", () => {
        robot.inputCommand(["PLACE", "2,4,NORTH"]);
        robot.inputCommand(["MOVE"]);
        expect(robot.position).toEqual([2, 4]);
      });
    });

    describe("REPORT command", () => {
      beforeEach(() => {
        robot.inputCommand(["PLACE", "2,3,EAST"]);
      });

      it("should return the current position and direction of the robot", () => {
        expect(robot.inputCommand(["REPORT"])).toBe("2, 3, EAST");
      });

      it("should return the current position and direction of the robot after LEFT", () => {
        robot.inputCommand(["LEFT"]);
        expect(robot.inputCommand(["REPORT"])).toBe("2, 3, NORTH");
      });

      it("should return the current position and direction of the robot after RIGHT", () => {
        robot.inputCommand(["RIGHT"]);
        expect(robot.inputCommand(["REPORT"])).toBe("2, 3, SOUTH");
      });

      it("should return the current position and direction of the robot after MOVE", () => {
        robot.inputCommand(["MOVE"]);
        expect(robot.inputCommand(["REPORT"])).toBe("3, 3, EAST");
      });
    });
  });
});
