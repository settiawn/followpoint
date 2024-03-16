import Link from "next/link";

export default function RegisterPage() {
  return (
    <main>
      <div>Ini register page</div>
      <div>
        <form action="" className="flex flex-col">
          <label htmlFor="">Name</label>
          <input type="text" />
          <label htmlFor="">Email</label>
          <input type="email" />
          <label htmlFor="">Password</label>
          <input type="password" />
          <button>Login</button>
        </form>
      </div>
      <Link href={"/login"}>
        <div>alread have an account? login</div>
      </Link>
    </main>
  );
}
