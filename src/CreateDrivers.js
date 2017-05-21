import CreateDriver from "./CreateDriver";

const CreateDrivers = (drivers = []) =>
  drivers.map((driver, i) => CreateDriver({ id: i, route: driver }));

export default CreateDrivers;
