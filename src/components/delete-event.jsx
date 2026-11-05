"use client";
import React from "react";
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
import { redirect } from "next/navigation";

const DeleteEvent = ({ event }) => {
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/events/${event._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    redirect("/events");
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
            delete
          </Button>
        }
      >
        Show Dialog
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEvent;
