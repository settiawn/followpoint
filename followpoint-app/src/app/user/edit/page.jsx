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
    <main>
      <div>Ini edit user page</div>
      <FormError />
      <div>
        <form
          action={() => {
            handleEdit(input);
          }}
          className="flex flex-col"
        >
          <label htmlFor="">Name *required</label>
          <input
            type="text"
            name="name"
            onChange={inputHandler}
            value={input ? input.name : ""}
          />
          <label htmlFor="">Email *required</label>
          <input
            type="email"
            name="newEmail"
            onChange={inputHandler}
            value={input ? input.newEmail : ""}
          />

          <label htmlFor="">New Password</label>
          <input type="password" name="newPassword" onChange={inputHandler} />

          <label htmlFor="">
            Enter old Password to confirm change *required
          </label>
          <input type="password" name="password" onChange={inputHandler} />
          <button>Edit</button>
        </form>
      </div>
    </main>
  );
}
