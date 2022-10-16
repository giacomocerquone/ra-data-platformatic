const users = [
  {
    username: "Dorothy Gale",
  },
  {
    username: "Martin Brody",
  },
  {
    username: "Han Solo",
  },
  {
    username: "Blanche DuBois",
  },
];

module.exports = async function ({ entities, db, sql }) {
  for (const values of users) {
    const user = await entities.user.save({
      input: { username: values.username },
    });

    console.log("Created user:", user);
  }
};
