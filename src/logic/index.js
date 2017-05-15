export const CreateDriver = ({ id = 0, route = [], position = 0, gossips = [0] }) => ({
  id,
  route,
  position,
  gossips,
  move() {}
});
