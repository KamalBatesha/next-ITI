"use client";
import Image from "next/image";
import UserCard from "./_components/UserCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [editId,setEditId]=useState(null)

  async function fetchUsers() {
    try {
      const res = await fetch("http://localhost:3000/api/user");
      const users = await res.json();
      setUsers(users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  }
    const handleEdit=async(e,id)=>{
    e.preventDefault()
    const updatedUser={
            id,
            name:e.target.floating_name.value,
            email:e.target.floating_email.value,
            city:e.target.floating_city.value,
            street:e.target.floating_street.value,
            suite:e.target.floating_suite.value
        }
        const res=await fetch("http://localhost:3000/api/user",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(updatedUser)
        })
        const data=await res.json()
        console.log(data)
        setEditId(null)
        fetchUsers()
  }

  async function handleDelete(id) {
    try {
      await fetch("http://localhost:3000/api/user",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id})
        })
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex justify-center my-5">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4 text-center capitalize">
          all users
        </h5>

        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.length > 0 &&
              users.map((user) => (
                <UserCard key={user.id} {...user} fetchUsers={fetchUsers} handleEdit={handleEdit} editId={editId} setEditId={setEditId} handleDelete={handleDelete} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
