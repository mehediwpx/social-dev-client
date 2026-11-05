import Link from "next/link";
import {
  Calendar,
  MapPin,
  Building2,
  ArrowRight,
  CalendarClock,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UpcomingEventsPage = async () => {
  let events = [];

  try {
    const res = await fetch("http://localhost:5000/events", {
      cache: "no-store", // Ensures fresh data fetch on server request
    });
    if (res.ok) {
      events = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  // Upcoming = published events that have not started yet, earliest first.
  const now = new Date();
  const upcomingEvents = events
    .filter(
      (event) => event.publish !== false && new Date(event.startAt) > now,
    )
    .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));

  function formatCountdown(event) {
    const diffMs = new Date(event.startAt).getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return "Starts within a day";
    if (diffDays < 30) return `in ${diffDays} days`;
    const months = Math.floor(diffDays / 30);
    return `in ~${months} month${months === 1 ? "" : "s"}`;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Upcoming <span className="text-emerald-600">Events</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            What&apos;s happening next in our community — sorted by date, so
            you never miss a chance to help.
          </p>
        </div>

        {/* Empty State */}
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-4">
            <CalendarClock className="mx-auto size-10 text-slate-300" />
            <p className="text-slate-500 font-medium">
              No upcoming events right now. Check back soon!
            </p>
            <Button
              render={<Link href="/events" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              Browse All Events
            </Button>
          </div>
        ) : (
          /* Events Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => {
              const formattedDate = new Date(event.startAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              );

              return (
                <Card
                  key={event._id}
                  className="overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between bg-white"
                >
                  <div>
                    {/* Event Cover Image */}
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      {/* plain img on purpose: srcs are arbitrary user-submitted URLs, not static assets */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={event.coverUrl || "https://picsum.photos/600/400"}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {/* Countdown Badge */}
                      <Badge
                        className="absolute top-3 right-3 font-semibold shadow-sm bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        {formatCountdown(event)}
                      </Badge>
                    </div>

                    {/* Card Content */}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1">
                        {event.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Event Details Meta */}
                      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2 capitalize">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 capitalize">
                          <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{event.organization}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  {/* Card Action Footer */}
                  <CardFooter className="pt-2">
                    <Button
                      render={<Link href={`/events/${event._id}`} />}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition"
                    >
                      <span className="flex items-center justify-center gap-2">
                        View &amp; Join
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Button>
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

export default UpcomingEventsPage;
