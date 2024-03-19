"use client";
import { getUserData, handleEdit } from "@/actions/user";
import { FormError } from "@/components/form-error";
import { useEffect, useState } from "react";

export default function EditUserPage() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    newEmail: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getUserData();
    delete data._id;
    data.newEmail = data.email;
    setInput(data);
  };

  function inputHandler(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  return (
    <main className="flex flex-col min-h-screen bg-[rgba(27,29,34,1)]">
      <div className="container mx-auto px-4 py-8">
        <div className="font-bold text-yellow-500 text-2xl text-center mt-4">Edit Profile</div>
        <FormError />
        <div>
          <form
            action={() => {
              handleEdit(input);
            }}
            className="flex flex-col"
          >
            <label htmlFor="" className="text-white">Name *required</label>
            <input
              type="text"
              name="name"
              onChange={inputHandler}
              value={input ? input.name : ""}
            />
            <label htmlFor="" className="text-white">Email *required</label>
            <input
              type="email"
              name="newEmail"
              onChange={inputHandler}
              value={input ? input.newEmail : ""}
            />

            <label htmlFor="" className="text-white">New Password</label>
            <input type="password" name="newPassword" onChange={inputHandler} />

            <label htmlFor="" className="text-white">
              Enter old Password to confirm change *required
            </label>
            <input type="password" name="password" onChange={inputHandler} />
            <button className="text-white p-2 hover:bg-sky-400">Edit</button>
          </form>
        </div>
      </div>
    </main>
  );
}
