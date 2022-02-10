import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";

export default function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(data);
    if (data) setUsers(data.getAllUsers);
  }, [data]);

  return (
    <div>
      {users.map((user: any, index) => (
        <h1 key={index}>{user.firstName}</h1>
      ))}
    </div>
  );
}
