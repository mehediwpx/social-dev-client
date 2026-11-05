"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, UserMinus, UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/session";

const { useSession } = authClient;

/**
 * Join/leave controls for one event. Sits on server-component detail pages,
 * so all session logic and mutability live here.
 * Joining is stored server-side as `joinedUsers`, an array of user emails.
 */
export default function JoinEvent({ event }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [working, setWorking] = useState(false);

  const joined = Boolean(
    user?.email && event.joinedUsers?.includes(user.email),
  );
  const joinedCount = event.joinedUsers?.length || 0;

  async function toggleJoin() {
    if (!user?.email || working) return;
    setWorking(true);

    const failMessage = joined
      ? "Failed to leave event."
      : "Failed to join event.";

    try {
      const authHeaders = await getAuthHeaders();
      const url = `http://localhost:5000/events/${event._id}/join`;
      const res = joined
        ? await fetch(url, { method: "DELETE", headers: authHeaders })
        : await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...authHeaders,
            },
            body: JSON.stringify({ email: user.email }),
          });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Server Error (${res.status}):`, errorText);
        alert(failMessage);
        return;
      }

      // The parent detail page is a server component — refresh it so the
      // button and joined count reflect the new membership.
      router.refresh();
    } catch (error) {
      console.error("Join request failed:", error);
      alert(failMessage);
    } finally {
      setWorking(false);
    }
  }

  if (isPending) {
    // Placeholder keeps layout stable while the session resolves
    return (
      <Button
        disabled
        className="w-full sm:flex-1 h-12 rounded-xl bg-emerald-600 font-bold text-base text-white opacity-60"
      >
        Checking session...
      </Button>
    );
  }

  if (!user) {
    return (
      <Button
        render={<Link href="/login" />}
        className="w-full sm:flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-md transition flex items-center justify-center gap-2"
      >
        <LogIn className="w-5 h-5" />
        Login to Join
      </Button>
    );
  }

  return (
    <div className="w-full sm:flex-1 flex flex-col items-center gap-2">
      <Button
        onClick={toggleJoin}
        disabled={working}
        variant={joined ? "outline" : "default"}
        className={`w-full h-12 font-bold text-base rounded-xl shadow-md transition flex items-center justify-center gap-2 ${
          joined
            ? "border border-emerald-600 text-emerald-700 hover:bg-emerald-50"
            : "bg-emerald-600 hover:bg-emerald-700 text-white"
        }`}
      >
        {joined ? (
          <UserMinus className="w-5 h-5" />
        ) : (
          <UserPlus className="w-5 h-5" />
        )}
        {working ? "Please wait..." : joined ? "Joined — Leave Event" : "Join Event"}
      </Button>

      <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
        <Users className="w-3.5 h-3.5" />
        {joinedCount} volunteer{joinedCount === 1 ? "" : "s"} joined
      </p>
    </div>
  );
}
