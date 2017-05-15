const CreateDriver = ({ id = 0, route = [0] }) => ({
  id,
  route,
  stop: route[0],
  positionIndex: 0,
  gossips: [id],
  move() {
    const curIndex = this.positionIndex;
    const nextIndex = curIndex + 1 >= route.length ? 0 : curIndex + 1;
    this.positionIndex = nextIndex;
    this.stop = route[nextIndex];
  },
  listen(gossips = []) {
    const nextGossips = [...this.gossips];
    gossips.forEach(gossip => {
      if (nextGossips.indexOf(gossip) === -1) {
        nextGossips.push(gossip);
      }
    });
    this.gossips = nextGossips;
  },
  talk() {
    return { gossips: this.gossips, stop: this.stop };
  }
});

export default CreateDriver;
