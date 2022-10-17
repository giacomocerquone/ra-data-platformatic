import * as React from "react";
import { Admin, Resource } from "react-admin";
import platformaticProvider from "ra-data-platformatic-rest";
import { UserList, UserCreate } from "./users";

const dataProvider = platformaticProvider("http://localhost:3042");

const App = () => {
  // React.useEffect(() => {
  //   (async () => {
  //     const data = await dataProvider.getMany("users", { ids: [8, 9, 10] });

  //     console.log({ data });
  //   })();
  // }, []);

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} create={UserCreate} />
    </Admin>
  );
};

export default App;
