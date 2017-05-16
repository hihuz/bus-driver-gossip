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

  test("should init gossips based off passed input 1", () => {
    const input = [[0, 1, 2], [0, 3, 1, 2]];
    const drivers = CreateDrivers(input);
    const Field = CreateField({ drivers });
    expect(Field.gossips[0]).toEqual([0, 1]);
    expect(Field.gossips[1]).toEqual([]);
    expect(Field.gossips[2]).toEqual([]);
    expect(Field.gossips[3]).toEqual([]);
  });

  test("should init gossips based off passed input 2", () => {
    const input = [[2, 1], [1, 3], [0, 1, 2], [0, 2, 1, 3]];
    const drivers = CreateDrivers(input);
    const Field = CreateField({ drivers });
    expect(Field.gossips[0]).toEqual([2, 3]);
    expect(Field.gossips[1]).toEqual([1]);
    expect(Field.gossips[2]).toEqual([0]);
    expect(Field.gossips[3]).toEqual([]);
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
});
