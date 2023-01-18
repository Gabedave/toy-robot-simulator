# mryum-interview
## Description 
### Toy Robot Simulator - EU Integrations
The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5
units x 5 units.

The app takes in commands in the form 
- PLACE X,Y,F 
- MOVE
- LEFT
- RIGHT
- REPORT

PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or
WEST.

The first valid command to the robot is a PLACE command, after that, any sequence of
commands may be issued, in any order, including another PLACE command. The application
should discard all commands in the sequence until a valid PLACE command has been
executed.

MOVE will move the toy robot one unit forward in the direction it is currently facing.

LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing
the position of the robot.

REPORT will announce the X,Y and F of the robot.

Commands can be passed through a file or by standard input.

Build app using the following command
```
tsc
```

Run the app using the following command
```
node ./dist/index.js
```

To run commands from a file "commands.txt" located in the home directory.
```
node ./dist/index.js commands.txt
```

## Testing
Unit tests have been written for most of the code. Run test suite using.
```
npm test
```

A sample file "commands.txt" as been provided in the folder "sample" which contains some commands to test the app.
```
node ./dist/index.js ./sample/commands.txt
```

Using the sample file, the output should look like this
```
Input: HELLO
Invalid Command. Valid commands are PLACE, MOVE, LEFT, RIGHT, REPORT
Input: PLACE 0,2,NORTH
Input: LEFT
Input: RIGHT
Input: REPORT
0, 2, NORTH
Input: PLACE 3,4,NORTH
Input: MOVE
Input: MOVE
Input: RIGHT
Input: REPORT
3, 4, EAST
```



