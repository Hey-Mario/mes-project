// lib/interpreter.ts

interface Context {
  [key: string]: string | number;
}

abstract class Expression {
  abstract interpret(context: Context): void;
}

class StartMachineExpression extends Expression {
  private machineId: string;

  constructor(machineId: string) {
    super();
    this.machineId = machineId;
  }

  interpret(context: Context): void {
    context[this.machineId] = 'started';
  }
}

class StopMachineExpression extends Expression {
  private machineId: string;

  constructor(machineId: string) {
    super();
    this.machineId = machineId;
  }

  interpret(context: Context): void {
    context[this.machineId] = 'stopped';
  }
}

class SetSpeedExpression extends Expression {
  private speed: number;

  constructor(speed: number) {
    super();
    this.speed = speed;
  }

  interpret(context: Context): void {
    context["speed"] = this.speed;
  }
}

class MachineInterpreter {
  private expressions: Expression[] = [];

  parse(script: string): void {
    this.expressions = [];
    const lines = script.split('\n');
    for (const line of lines) {
      const tokens = line.trim().split(' ');
      if (tokens[0] === "START") {
        this.expressions.push(new StartMachineExpression(tokens[1]));
      } else if (tokens[0] === "STOP") {
        this.expressions.push(new StopMachineExpression(tokens[1]));
      } else if (tokens[0] === "SET_SPEED") {
        this.expressions.push(new SetSpeedExpression(parseInt(tokens[1])));
      }
    }
  }

  interpret(context: Context): void {
    for (const expression of this.expressions) {
      expression.interpret(context);
    }
  }
}

export { MachineInterpreter, StartMachineExpression, StopMachineExpression, SetSpeedExpression };