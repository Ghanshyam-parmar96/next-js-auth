import { currentUser} from "@/lib";
import Link from "next/link";
import { headers } from "next/headers";
import SignedOut from '@/components/SignedOut';
import SignedIn from "@/components/SignedIn";

export default async function Page() {  
  const session = await currentUser();
  
  return (
    <section style={{ maxWidth : "300px"} }>
      <div>
        <h2>Home</h2>
        <Link href={"/dashboard"}>Dashboard</Link>
        <br />
        <Link href={"/about"}>About</Link>
        <br />
        <Link href={"/user"}>User</Link>
      </div>
      <br />
      <br />
      <br />
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <pre>{ headers().get("accessToken")}</pre>
      <SignedIn>
        <p>You are not logged in.</p>
      </SignedIn>
      <SignedOut>
        <p>You are not logged out.</p>
      </SignedOut>
    </section>
  );
}
