import { validCommands, validDirection } from "../utils/constants";
import positionIsValid from "../utils/positionIsValid";
import { IDirection, rotate } from "../utils/rotate";

type IPosition = [number, number];

class Robot {
  public position: IPosition;
  public direction: IDirection;
  public tableIsActive: boolean;

  constructor() {
    this.position = [0, 0];
    this.direction = "NORTH";
    this.tableIsActive = false;
  }

  public inputCommand(command: string[]): void | string {
    if (!this.tableIsActive && command[0] !== "PLACE") {
      return "You should start with PLACE command";
    }
    switch (command[0]) {
      case "PLACE":
        return this.handlePlaceCommand(command[1]);
      case "LEFT":
        return this.handleLeftCommand();
      case "RIGHT":
        return this.handleRightCommand();
      case "MOVE":
        return this.handleMoveCommand();
      case "REPORT":
        return this.handleReportCommand();
    }
  }

  private handlePlaceCommand(position: string) {
    const [x, y, direction] = position.split(",");
    if (
      [Number(x), Number(y)].includes(NaN) ||
      !validDirection.includes(direction)
    ) {
      throw new Error(
        "Invalid argument for PLACE command. Example PLACE 0,0,NORTH"
      );
    }

    this.tableIsActive = true;

    const newPosition: IPosition = [Number(x), Number(y)];
    if (!positionIsValid(newPosition)) {
      throw new Error(
        "Position out of Table. Table limit is 0 <= x < 5, 0 <= y < 5"
      );
    }
    this.position = newPosition;

    this.direction = direction as IDirection;
  }

  private handleMoveCommand(): string | void {
    switch (this.direction) {
      case "NORTH":
        return this.moveUp();
      case "EAST":
        return this.moveRight();
      case "SOUTH":
        return this.moveDown();
      case "WEST":
        return this.moveLeft();
    }
  }

  private handleLeftCommand(): string | void {
    this.direction = rotate(this.direction, false);
  }

  private handleRightCommand(): string | void {
    this.direction = rotate(this.direction, true);
  }

  private handleReportCommand(): string | void {
    return `${this.position.join(", ")}, ${this.direction}`;
  }

  private moveUp() {
    const newPosition: IPosition = [this.position[0], this.position[1] + 1];
    if (positionIsValid(newPosition)) {
      this.position = [...newPosition];
    }
  }

  private moveRight() {
    const newPosition: IPosition = [this.position[0] + 1, this.position[1]];
    if (positionIsValid(newPosition)) {
      this.position = [...newPosition];
    }
  }

  private moveDown() {
    const newPosition: IPosition = [this.position[0], this.position[1] - 1];
    if (positionIsValid(newPosition)) {
      this.position = [...newPosition];
    }
  }

  private moveLeft() {
    const newPosition: IPosition = [this.position[0] - 1, this.position[1]];
    if (positionIsValid(newPosition)) {
      this.position = [...newPosition];
    }
  }
}

export default Robot;
