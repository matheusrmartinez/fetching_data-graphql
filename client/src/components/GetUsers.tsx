import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
interface UserData {
  id: number;
  firstName: string;
  email: string;
  password: string;
}

export default function GetUsers() {
  const [users, setUsers] = useState<UserData[]>([] as UserData[]);
  const { error, loading, data, refetch } = useQuery(LOAD_USERS);

  useEffect(() => {
    if (data) {
      const { getAllUsers} = data
      const allUsers: UserData[] = JSON.parse(JSON.stringify(getAllUsers))
      setUsers(allUsers);
    }
  }, [data]);

  return (
    <div>
      <button style={{marginTop: 0, marginBottom: '30px'}} onClick={() => refetch()}>Recarregar</button>
      {users.map((user, index) => (
        <h1 key={index}>{user.firstName}</h1>
      ))}
      
    </div>
  );
}
