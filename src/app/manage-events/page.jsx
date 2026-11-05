"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CalendarCog,
  MapPin,
  PlusCircle,
  Users,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditEvent from "@/components/edit-event";
import DeleteEvent from "@/components/delete-event";

const { useSession } = authClient;

/**
 * Private page: manage the events the signed-in user created. The server
 * filters by `createdBy` and enforces ownership on update/delete, so every
 * action here already targets the user's own events.
 */
const ManageEventsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;

    // Private page: only signed-in users can manage events.
    if (!user) {
      router.replace("/login");
      return;
    }

    let cancelled = false;

    fetch(
      `http://localhost:5000/events?createdBy=${encodeURIComponent(user.email)}`,
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then((data) => {
        if (!cancelled) setEvents(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to fetch created events:", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isPending, user, router]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 font-medium">Loading your events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Manage <span className="text-emerald-600">Your Events</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you have created. Update any event or delete the ones
            that are no longer needed.
          </p>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-4">
            <CalendarCog className="mx-auto size-10 text-slate-300" />
            <p className="text-slate-500 font-medium">
              You haven&apos;t created any events yet.
            </p>
            <Button
              render={<Link href="/add-event" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              <PlusCircle className="w-4 h-4" />
              Create Event
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const formattedDate = new Date(event.startAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              );
              const joinedCount = event.joinedUsers?.length || 0;

              return (
                <Card
                  key={event._id}
                  className="overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between bg-white"
                >
                  <div>
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      {/* plain img on purpose: srcs are arbitrary user-submitted URLs, not static assets */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={event.coverUrl || "https://picsum.photos/600/400"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge
                        className={`absolute top-3 right-3 capitalize font-semibold shadow-sm ${
                          event.publish === false
                            ? "bg-amber-600 text-white hover:bg-amber-700"
                            : event.status?.toLowerCase() === "upcoming"
                              ? "bg-emerald-600 text-white hover:bg-emerald-700"
                              : "bg-slate-700 text-white"
                        }`}
                      >
                        {event.publish === false
                          ? "Draft"
                          : event.status || "Upcoming"}
                      </Badge>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1">
                        {event.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 capitalize">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            {joinedCount} volunteer
                            {joinedCount === 1 ? "" : "s"} joined
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  {/* Owner actions: edit and delete your own event */}
                  <CardFooter className="pt-2 gap-2">
                    <EditEvent event={event} />
                    <DeleteEvent event={event} redirectTo="/manage-events" />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEventsPage;
