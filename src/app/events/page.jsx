import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Building2, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AllEventPage = async () => {
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

  // Filter only published events if required by your API logic
  const publishedEvents = events.filter((event) => event.publish !== false);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            All Community <span className="text-emerald-600">Events</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover upcoming social service events and join hands to make a
            positive impact.
          </p>
        </div>

        {/* Empty State */}
        {publishedEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">
              No events found at the moment.
            </p>
          </div>
        ) : (
          /* Events Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedEvents.map((event) => {
              // Parse date format safely
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
                      {/* Status Badge */}
                      <Badge
                        className={`absolute top-3 right-3 capitalize font-semibold shadow-sm ${
                          event.status?.toLowerCase() === "upcoming"
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-slate-700 text-white"
                        }`}
                      >
                        {event.status || "Upcoming"}
                      </Badge>
                    </div>

                    {/* Card Content */}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1">
                        {event.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Event Description */}
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
                        Join Event
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

export default AllEventPage;
