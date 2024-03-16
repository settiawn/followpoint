export default function EditUserPage() {
  return (
    <main>
      <div>Ini edit user page</div>
      <div>
        <form action="" className="flex flex-col">
          <label htmlFor="">Name</label>
          <input type="text" />
          <label htmlFor="">Old Email</label>
          <input type="email" />
          <label htmlFor="">New Email</label>
          <input type="email" />
          <label htmlFor="">Old Password</label>
          <input type="password" />
          <label htmlFor="">New Password</label>
          <input type="password" />
          <button>Login</button>
        </form>
      </div>
    </main>
  );
}
