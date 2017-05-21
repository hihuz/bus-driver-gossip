/** *
 * /!\ This assumes no "empty" position in the input, as in every position from 0 to max is used
 *
 * Field:
 *  Props:
 *    drivers (array of Drivers),
 *    count (number of iterations),
 *    remaining (number of iterations remaining, kinda useless),
 *    gossips (array of gossips at each stop currently),
 *    _lowest_ (lowest amount of known gossips of all the drivers, maybe useless)
 *
 *  Methods:
 *    exchange (triggers drivers exchanging gossips at their current position),
 *    tick (update the state by one maybe break down to multiple functions / methods),
 *    run (tick until the end)
 *
 ***/
import CreateField from "../CreateField";
import CreateDrivers from "../CreateDrivers";
import CreateDriver from "../CreateDriver";

describe("CreateField", () => {
  test("should return an object with drivers/count/remaining/gossips default props", () => {
    const Field = CreateField({});
    expect(Field.drivers).not.toEqual(undefined);
    expect(Field.count).not.toEqual(undefined);
    expect(Field.remaining).not.toEqual(undefined);
    expect(Field.gossips).not.toEqual(undefined);
  });

  test("should init drivers based off passed input (array of drivers)", () => {
    const drivers = [
      CreateDriver({ id: 0, route: [0, 1, 2] }),
      CreateDriver({ id: 1, route: [2, 1, 0] })
    ];
    const Field = CreateField({ drivers });
    const expected = drivers;
    const actual = Field.drivers;
    expect(actual).toEqual(expected);
  });

  test("should have a exchange method", () => {
    const Field = CreateField({});
    const expected = "function";
    const actual = typeof Field.exchange;
    expect(actual).toEqual(expected);
  });

  test("should have a tick method", () => {
    const Field = CreateField({});
    const expected = "function";
    const actual = typeof Field.tick;
    expect(actual).toEqual(expected);
  });

  test("should have a run method", () => {
    const Field = CreateField({});
    const expected = "function";
    const actual = typeof Field.run;
    expect(actual).toEqual(expected);
  });
});

describe("CreateField: exchange", () => {
  test("should gather the gossips at each stop 1", () => {
    const input = [[0, 1, 2], [0, 3, 1, 2]];
    const drivers = CreateDrivers(input);
    const Field = CreateField({ drivers });
    Field.gossips = [];
    Field.exchange();
    const expected = [[0, 1], [], [], []];
    const actual = Field.gossips;
    expect(actual).toEqual(expected);
  });

  test("should gather the gossips at each stop 2", () => {
    const input = [[1, 1, 2], [1, 3, 1, 2], [1, 0, 2], [0, 1, 2], [0, 2, 1]];
    const drivers = CreateDrivers(input);
    const Field = CreateField({ drivers });
    Field.gossips = [];
    Field.exchange();
    const expected = [[3, 4], [0, 1, 2], [], []];
    const actual = Field.gossips;
    expect(actual).toEqual(expected);
  });

  test("should gather the gossips at each stop 3", () => {
    const input = [[1, 3, 2], [1, 3, 1, 2], [0, 2, 2], [0, 1, 2], [0, 2, 1]];
    const drivers = CreateDrivers(input);
    drivers.forEach(driver => {
      driver.move();
    });
    const Field = CreateField({ drivers });
    Field.gossips = [];
    Field.exchange();
    const expected = [[], [3], [2, 4], [0, 1]];
    const actual = Field.gossips;
    expect(actual).toEqual(expected);
  });

  test("should call listen on each driver", () => {
    const listenMock = jest.fn();
    const input = [[1, 3, 2], [1, 3, 1, 2], [0, 2, 2], [0, 1, 2], [0, 2, 1]];
    const drivers = CreateDrivers(input);
    drivers.forEach(driver => {
      driver.listen = listenMock;
    });
    const Field = CreateField({ drivers });
    Field.exchange();
    const actual = listenMock.mock.calls.length;
    const expected = input.length;
    expect(actual).toEqual(expected);
  });

  test("should pass as argument to listen the gossips at the drivers' stop", () => {
    const input = [[0, 1, 2], [2, 1, 0]];
    const drivers = CreateDrivers(input);
    drivers.forEach(driver => {
      driver.move();
    });
    const Field = CreateField({ drivers });
    Field.exchange();
    expect(drivers[0].gossips).toEqual([0, 1]);
    expect(drivers[1].gossips).toEqual([1, 0]);
  });
});

describe("CreateField: tick", () => {
  let Field;
  beforeEach(() => {
    const input = [[0, 1, 2], [2, 1, 0]];
    const drivers = CreateDrivers(input);
    Field = CreateField({ drivers });
  });

  test("should call exchange", () => {
    const mockExchange = jest.fn();
    Field.exchange = mockExchange;
    Field.tick();
    expect(mockExchange.mock.calls.length).toEqual(1);
  });

  test("should move all drivers", () => {
    Field.tick();
    expect(Field.drivers[0].stop).toEqual(1);
    expect(Field.drivers[1].stop).toEqual(1);
  });

  test("should increment count", () => {
    Field.tick();
    expect(Field.count).toEqual(1);
  });

  test("should decrement remaining", () => {
    Field.tick();
    expect(Field.remaining).toEqual(479);
  });

  test("should update lowestKown prop to match new gossips known", () => {
    Field.tick();
    Field.tick();
    expect(Field.lowestKnown).toEqual(2);
  });
});

describe("CreateField: run", () => {
  test("example1 should return 5", () => {
    const input = [[3, 1, 2, 3], [3, 2, 3, 1], [4, 2, 3, 4, 5]];
    const drivers = CreateDrivers(input);
    const Field = CreateField({ drivers });
    const answer = Field.run();
    expect(answer).toEqual(5);
  });

  test("example2 should return never", () => {
    const input = [[2, 1, 2], [5, 2, 8]];
    const drivers = CreateDrivers(input);
    const Field = CreateField({ drivers });
    const answer = Field.run();
    expect(answer).toEqual("never");
  });
});
