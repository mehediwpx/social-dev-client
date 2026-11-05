import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAccessTokenServerSide } from "@/lib/session.server";

/**
 * Featured events strip for the landing page. Served from the protected
 * `GET /featured` API on the Express backend — this server component reads
 * the better-auth JWT from the request (via next/headers, see
 * src/lib/session.js) and forwards it as a Bearer token.
 */
const FeaturedEvents = async () => {
  // Token access for server components lives in one function — reuse it.
  const token = await getAccessTokenServerSide();

  let events = [];
  let failed = false;

  if (token) {
    try {
      const res = await fetch("http://localhost:5000/featured", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.ok) {
        events = await res.json();
      } else {
        failed = true;
      }
    } catch (error) {
      console.error("Failed to fetch featured events:", error);
      failed = true;
    }
  }

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 px-3.5 py-1.5 text-xs font-bold tracking-wide text-emerald-700 ring-1 ring-emerald-600/20">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Featured for members
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Upcoming <span className="text-emerald-600">Featured Events</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Hand-picked opportunities from our community, sorted by date.
          </p>
        </div>

        {/* No session: the API is protected, so invite sign-in */}
        {!token ? (
          <div className="text-center py-14 bg-white rounded-2xl border border-slate-200 space-y-4">
            <p className="text-slate-500 font-medium">
              Sign in to see featured events picked for our volunteers.
            </p>
            <Button
              render={<Link href="/login" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
            >
              Sign In
            </Button>
          </div>
        ) : failed || events.length === 0 ? (
          <div className="text-center py-14 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 font-medium">
              No featured events to show right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card
                key={event._id}
                className="overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300 bg-white"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug">
                      {event.title}
                    </h3>
                    <Badge className="capitalize font-semibold shrink-0 bg-emerald-600 text-white hover:bg-emerald-700">
                      Featured
                    </Badge>
                  </div>

                  <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        {new Date(event.startAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 capitalize">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {token && events.length > 0 ? (
          <div className="text-center">
            <Button
              render={<Link href="/events" />}
              variant="outline"
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold"
            >
              <span className="flex items-center gap-2">
                See All Events
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default FeaturedEvents;
