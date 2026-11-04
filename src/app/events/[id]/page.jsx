import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  ArrowLeft,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const EventDetailsPage = async ({ params }) => {
  const { id } = await params;

  let event = null;

  try {
    const res = await fetch(`http://localhost:5000/events/${id}`, {
      cache: "no-store", // Ensures fresh data fetch on server request
    });

    if (res.ok) {
      event = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch event details:", error);
  }

  // Trigger 404 page if event does not exist or publish is explicitly false
  if (!event || event.publish === false) {
    notFound();
  }

  // Parse start date & time from `startAt` ISO string safely
  const startDateObj = event.startAt ? new Date(event.startAt) : null;

  const formattedDate = startDateObj
    ? startDateObj.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date TBA";

  const formattedTime = startDateObj
    ? startDateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "Time TBA";

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Back Button */}
        <div>
          <Button
            asChild
            variant="ghost"
            className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 px-3 transition"
          >
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </Link>
          </Button>
        </div>

        {/* 1. Cover Image Header */}
        <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-slate-200">
          <img
            src={event.coverUrl || "https://picsum.photos/seed/picsum/1200/600"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {/* Status Badge */}
          <Badge
            className={`absolute top-4 right-4 capitalize font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-white/20 ${
              event.status?.toLowerCase() === "upcoming"
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 text-white"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-2 inline-block" />
            {event.status || "Upcoming"}
          </Badge>
        </div>

        {/* 2. Main Details Content Card */}
        <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl">
          <CardContent className="p-6 sm:p-10 space-y-8">
            {/* Title & Organization Header */}
            <div className="space-y-2 border-b border-slate-100 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight capitalize">
                {event.title}
              </h1>
              <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                Organized by{" "}
                <span className="text-emerald-600 font-semibold capitalize">
                  {event.organization || "SocialServe Team"}
                </span>
              </p>
            </div>

            {/* Event Key Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-5 rounded-xl border border-slate-100">
              {/* Start Date */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100/70 text-emerald-700 rounded-lg shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Date
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {formattedDate}
                  </p>
                </div>
              </div>

              {/* Start Time */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100/70 text-emerald-700 rounded-lg shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Time
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {formattedTime}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100/70 text-emerald-700 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Location
                  </p>
                  <p className="text-sm font-bold text-slate-800 capitalize">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Organization */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100/70 text-emerald-700 rounded-lg shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Organizer
                  </p>
                  <p className="text-sm font-bold text-slate-800 capitalize">
                    {event.organization}
                  </p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900">
                About This Event
              </h2>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
              <Button className="w-full sm:flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-xl shadow-md transition flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Join Event
              </Button>

              <Button
                variant="outline"
                className="w-full sm:w-auto h-12 px-6 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4 text-slate-500" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDetailsPage;
