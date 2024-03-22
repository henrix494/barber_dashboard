import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }
  return (
    <main className="">
      <div>Home</div>
    </main>
  );
}
