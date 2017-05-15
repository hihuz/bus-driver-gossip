/** *
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
 ***/
import CreatePlayground from "../CreatePlayground";

describe("CreatePlayground", () => {
  test("should return an object with drivers/count/remaining/gossips default props", () => {
    const Field = CreatePlayground({});
    expect(Field.drivers).not.toEqual(undefined);
    expect(Field.count).not.toEqual(undefined);
    expect(Field.remaining).not.toEqual(undefined);
    expect(Field.gossips).not.toEqual(undefined);
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
