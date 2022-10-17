import React from "react";
import {
  FilterList,
  FilterLiveSearch,
  FilterListItem,
  ListGuesser,
  TopToolbar,
  CreateButton,
  ExportButton,
  Create,
  SimpleForm,
  required,
  TextInput,
  RadioButtonGroupInput,
} from "react-admin";

import { Card, CardContent } from "@mui/material";
import CategoryIcon from "@mui/icons-material/LocalOffer";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const UserList = () => {
  return (
    <ListGuesser
      hasCreate
      actions={<ListActions />}
      aside={<UserFilterSidebar />}
    />
  );
};

export const UserFilterSidebar = () => {
  return (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 200 }}>
      <CardContent>
        <FilterLiveSearch source="username" />

        <FilterList label="Gender" icon={<CategoryIcon />}>
          <FilterListItem label="Male" value={{ gender: "Male" }} />
          <FilterListItem label="Female" value={{ gender: "Female" }} />
        </FilterList>
      </CardContent>
    </Card>
  );
};

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" validate={[required()]} fullWidth />
      <RadioButtonGroupInput
        source="gender"
        choices={[
          { id: "Female", name: "Female" },
          { id: "Male", name: "Male" },
        ]}
      />
    </SimpleForm>
  </Create>
);
