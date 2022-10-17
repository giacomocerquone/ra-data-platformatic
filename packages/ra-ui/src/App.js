import * as React from "react";
import { Admin, Resource } from "react-admin";
import platformaticRestProvider from "ra-data-platformatic-rest";
import { UserList, UserCreate } from "./users";

const dataProvider = platformaticRestProvider("http://localhost:3042");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} create={UserCreate} />
    </Admin>
  );
};

export default App;
