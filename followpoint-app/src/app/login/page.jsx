import Link from "next/link";

export default function LoginPage() {
  return (
    <main>
      <div>Ini login page</div>
      <div>
        <form action="" className="flex flex-col">
          <label htmlFor="">Email</label>
          <input type="email" />
          <label htmlFor="">Password</label>
          <input type="password" />
          <button>Login</button>
        </form>
      </div>
      <Link href={"/register"}>
        <div>dont have an account? register</div>
      </Link>
    </main>
  );
}
