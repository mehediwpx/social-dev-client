"use client";
import React from "react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@base-ui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/session";

const { useSession } = authClient;

/**
 * Delete button with a confirm dialog. The server rejects deletes from
 * non-creators (it compares `createdBy` to the `email` query param sent here).
 * `redirectTo` chooses where to land after a successful delete.
 */
const DeleteEvent = ({ event, redirectTo = "/events" }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [deleting, setDeleting] = useState(false);

  // Only the creator gets the delete control (data-level guard is on the server).
  if (
    isPending ||
    !user ||
    (event.createdBy && event.createdBy !== user.email)
  ) {
    return null;
  }

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch(`http://localhost:5000/events/${event._id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Server Error (${res.status}):`, errorText);
        alert(`Failed to delete event. Status: ${res.status}`);
        setDeleting(false);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      console.error("Network error during delete:", error);
      setDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            className="w-full sm:w-auto h-12 px-6 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4 text-slate-500" />
            Delete
          </Button>
        }
      >
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            event &quot;{event.title}&quot; from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={deleting} onClick={handleDelete}>
            {deleting ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEvent;
