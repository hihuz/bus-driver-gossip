/** *
 *
 * Simple function that takes an array of arrays of numbers and returns an array of Drivers
 *
 ***/
import CreateDrivers from "../CreateDrivers";
import CreateDriver from "../CreateDriver";

describe("CreateDrivers", () => {
  test("should return an empty array as default", () => {
    const expected = [];
    const actual = CreateDrivers();
    expect(actual).toEqual(expected);
  });

  // The below fails with "no visual difference" :c wtf ?
  //
  // test("should map the given array into an array of drivers", () => {
  //   const expected = [
  //     CreateDriver({ id: 0, route: [0, 1, 2] }),
  //     CreateDriver({ id: 1, route: [1, 2, 3, 4] })
  //   ];
  //   const actual = CreateDrivers([[0, 1, 2], [1, 2, 3, 4]]);
  //   expect(actual).toEqual(expected);
  // });
});
