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

const CreateField = ({ drivers = [] }) => ({
  drivers,
  count: 0,
  remaining: 480,
  gossips: [],
  lowestKnown: 0,
  exchange() {
    this.gossips = gatherGossips(this.drivers);
    this.drivers.forEach(driver => {
      const curStop = driver.stop;
      const gossips = this.gossips[curStop];
      driver.listen(gossips);
    });
  },
  tick() {
    this.exchange();
    this.lowestKnown = this.drivers
      .map(driver => driver.gossips)
      .reduce((acc, cur) => Math.min(cur.length, acc), drivers.length);
    this.drivers.forEach(driver => {
      driver.move();
    });
    this.count += 1;
    this.remaining -= 1;
  },
  run() {
    while (this.remaining > 0 && this.lowestKnown < drivers.length) {
      this.tick();
    }
    return this.count === 480 ? "never" : this.count;
  }
});

export default CreateField;
