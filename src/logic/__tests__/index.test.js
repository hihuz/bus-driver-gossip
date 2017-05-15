/** *
* - Driver (id, route, stop, positionIndex, gossips => props / move, listen, talk => method)
* - Playground (drivers, count, remaining, exchange, gossips, _lowest_ => prop / tick, run => method)
***/
import { CreateDriver } from "../index";

describe("CreateDriver", () => {
  test("should return an object with route/stop/positionIndex/gossips default props", () => {
    const Bob = CreateDriver({});
    expect(Bob.id).not.toEqual(undefined);
    expect(Bob.route).not.toEqual(undefined);
    expect(Bob.stop).not.toEqual(undefined);
    expect(Bob.positionIndex).not.toEqual(undefined);
    expect(Bob.gossips).not.toEqual(undefined);
  });

  test("should init gossips to an array containing only the driver id (its initial gossip)", () => {
    const expected = [12];
    const actual = CreateDriver({ id: 12 }).gossips;
    expect(actual).toEqual(expected);
  });

  test("should have a move method", () => {
    const Bob = CreateDriver({});
    const expected = "function";
    const actual = typeof Bob.move;
    expect(actual).toEqual(expected);
  });

  test("should have a listen method", () => {
    const Bob = CreateDriver({});
    const expected = "function";
    const actual = typeof Bob.listen;
    expect(actual).toEqual(expected);
  });

  test("should have a talk method", () => {
    const Bob = CreateDriver({});
    const expected = "function";
    const actual = typeof Bob.talk;
    expect(actual).toEqual(expected);
  });
});

describe("CreateDriver: move", () => {
  test("should update positionIndex prop to next position", () => {
    const route = [3, 6];
    const Bob = CreateDriver({ route });
    const expected = 1;
    Bob.move();
    const actual = Bob.positionIndex;
    expect(actual).toEqual(expected);
  });

  test("should start again at 0 if next position is out of range", () => {
    const route = [3, 6];
    const Bob = CreateDriver({ route });
    const expected = 0;
    Bob.move();
    Bob.move();
    const actual = Bob.positionIndex;
    expect(actual).toEqual(expected);
  });

  test("should update stop prop based off next positionIndex 1", () => {
    const route = [2, 5];
    const Bob = CreateDriver({ route });
    const expected = 5;
    Bob.move();
    const actual = Bob.stop;
    expect(actual).toEqual(expected);
  });

  test("should update stop prop based off next positionIndex 2", () => {
    const route = [2, 5];
    const Bob = CreateDriver({ route });
    const expected = 2;
    Bob.move();
    Bob.move();
    const actual = Bob.stop;
    expect(actual).toEqual(expected);
  });
});

describe("CreateDriver: listen", () => {
  test("should be a noop with no param", () => {
    const Bob = CreateDriver({});
    const expected = Bob.gossips;
    Bob.listen();
    const actual = Bob.gossips;
    expect(actual).toEqual(expected);
  });

  test("should be a noop with passed gossips already known", () => {
    const Bob = CreateDriver({ id: 5 });
    const expected = Bob.gossips;
    Bob.listen([5, 5, 5]);
    const actual = Bob.gossips;
    expect(actual).toEqual(expected);
  });

  test("should add passed array to gossips", () => {
    const Bob = CreateDriver({ id: 4 });
    const gossips = [5, 2, 1];
    const expected = [4, 5, 2, 1];
    Bob.listen(gossips);
    const actual = Bob.gossips;
    expect(actual).toEqual(expected);
  });
});

describe("CreateDriver: talk", () => {
  test("should return the known gossips", () => {
    const Bob = CreateDriver({});
    const knownGossips = [1, 3, 5, 7];
    Bob.gossips = knownGossips;
    const expected = knownGossips;
    const actual = Bob.talk();
    expect(actual).toEqual(expected);
  });
});
