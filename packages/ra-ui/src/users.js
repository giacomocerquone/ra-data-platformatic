import React from "react";
import {
  FilterList,
  FilterLiveSearch,
  FilterListItem,
  ListGuesser,
} from "react-admin";

import { Card, CardContent } from "@mui/material";
import CategoryIcon from "@mui/icons-material/LocalOffer";

export const UserList = () => {
  return <ListGuesser aside={<UserFilterSidebar />} />;
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
