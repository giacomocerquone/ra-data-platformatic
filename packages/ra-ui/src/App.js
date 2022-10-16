import * as React from "react";
import { Admin, Resource } from "react-admin";
import platformaticProvider from "ra-data-platformatic";
import { UserList } from "./users";

const dataProvider = platformaticProvider("http://localhost:3042");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
  </Admin>
);

export default App;
