/** *
* - Driver (id, route, position, gossips => props / move => method)
* - Playground (drivers, stop, remaining, exchange, _lowest_ => prop / tick, run => method)
***/
import { CreateDriver } from "../index";

describe("CreateDriver", () => {
  test("should return an object with a route, position, and gossips default props", () => {
    const Bob = CreateDriver({});
    expect(Bob.id).not.toEqual(undefined);
    expect(Bob.route).not.toEqual(undefined);
    expect(Bob.position).not.toEqual(undefined);
    expect(Bob.gossips).not.toEqual(undefined);
  });

  test("should have a move method", () => {
    const Bob = CreateDriver({});
    const expected = "function";
    const actual = typeof Bob.move;
    expect(actual).toEqual(expected);
  });
});
