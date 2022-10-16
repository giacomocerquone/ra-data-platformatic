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

module.exports = async function ({ entities, db, sql }) {
  for (const values of users) {
    const user = await entities.user.save({
      input: values,
    });

    console.log("Created user:", user);
  }
};
