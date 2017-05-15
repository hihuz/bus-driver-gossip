/** *
 * /!\ This assumes no "empty" position in the input, as in every position from 0 to max is used
 *
 * Playground:
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
import CreatePlayground from "../CreatePlayground";
import CreateDrivers from "../CreateDrivers";
import CreateDriver from "../CreateDriver";

describe("CreatePlayground", () => {
  test("should return an object with drivers/count/remaining/gossips default props", () => {
    const Field = CreatePlayground({});
    expect(Field.drivers).not.toEqual(undefined);
    expect(Field.count).not.toEqual(undefined);
    expect(Field.remaining).not.toEqual(undefined);
    expect(Field.gossips).not.toEqual(undefined);
  });

  test("should init drivers based off passed input (array of drivers)", () => {
    const drivers = [
      CreateDriver({ id: 0, route: [0, 2, 4] }),
      CreateDriver({ id: 1, route: [1, 3, 5] })
    ];
    const Field = CreatePlayground({ drivers });
    const expected = drivers;
    const actual = Field.drivers;
    expect(actual).toEqual(expected);
  });

  test("should init gossips based off passed input 1", () => {
    const input = [[0, 1, 2], [0, 2, 3, 4]];
    const drivers = CreateDrivers(input);
    const Field = CreatePlayground({ drivers });
    expect(Field.gossips[0]).toEqual([0, 1]);
  });

  test("should init gossips based off passed input 2", () => {
    const input = [[2, 1], [1, 3], [0, 1, 2], [0, 2, 3, 4]];
    const drivers = CreateDrivers(input);
    const Field = CreatePlayground({ drivers });
    expect(Field.gossips[0]).toEqual([2, 3]);
    expect(Field.gossips[1]).toEqual([1]);
    expect(Field.gossips[2]).toEqual([0]);
    expect(Field.gossips[3]).toEqual([]);
  });

  test("should have a exchange method", () => {
    const Field = CreatePlayground({});
    const expected = "function";
    const actual = typeof Field.exchange;
    expect(actual).toEqual(expected);
  });

  test("should have a tick method", () => {
    const Field = CreatePlayground({});
    const expected = "function";
    const actual = typeof Field.tick;
    expect(actual).toEqual(expected);
  });

  test("should have a run method", () => {
    const Field = CreatePlayground({});
    const expected = "function";
    const actual = typeof Field.run;
    expect(actual).toEqual(expected);
  });
});

describe("CreatePlayground: exchange", () => {
  test("should update the gossips by calling talk on each driver", () => {
    const input = [[0, 1, 2], [0, 2, 3, 4]];
    const drivers = CreateDrivers(input);
    const Field = CreatePlayground({ drivers });
  });
});
