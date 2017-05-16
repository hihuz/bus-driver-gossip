// This was extracted prematurely, as I was full green.
// However I already know that I will need this for tick / exchange as well
// Update tests to match this
export const gatherGossips = (drivers = []) => {
  const length = drivers.reduce((acc, cur) => Math.max(acc, cur.route.length), 0);
  const gossips = new Array(length)
    .fill(undefined)
    .map((stop, i) =>
      drivers
        .reduce((acc, cur) => (cur.stop === i ? [...acc, ...cur.gossips] : acc), [])
        .filter((gossip, idx, arr) => arr.indexOf(gossip) === idx)
    );
  return gossips;
};

const CreateField = ({ drivers = [] }) => {
  const gossips = gatherGossips(drivers);
  return {
    drivers,
    count: 0,
    remaining: 480,
    gossips,
    exchange() {
      this.gossips = gatherGossips(this.drivers);
    },
    tick() {},
    run() {}
  };
};

export default CreateField;
