const users = [
  {
    username: "Dorothy Gale",
    gender: "Female",
  },
  {
    username: "Martin Brody",
    gender: "Male",
  },
  {
    username: "Han Solo",
    gender: "Male",
  },
  {
    username: "Blanche DuBois",
    gender: "Female",
  },
];

const cars = [
  {
    name: "Prius",
    brand: "Toyota",
  },
  {
    name: "500",
    brand: "Fiat",
  },
];

module.exports = async function ({ entities, db, sql }) {
  for (const values of users) {
    const child = await entities.child.save({
      input: {
        name: "Giovanni",
        gender: "Female",
      },
    });

    console.log("Created child:", child);

    const user = await entities.user.save({
      input: { ...values, childId: child.id },
    });

    console.log("Created user:", user);

    for (const car of cars) {
      await entities.car.save({
        input: {
          ...car,
          carOwner: user.id,
        },
      });
    }
  }
};
