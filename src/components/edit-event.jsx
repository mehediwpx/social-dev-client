"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Megaphone } from "lucide-react";

const inputClasses =
  "mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm";

export default function EditEvent({ eventId, initialData, event }) {
  console.log("EditEvent component received event:", event);
  const [form, setForm] = useState({
    title: event?.title || "",
    description: event?.description || "",
    coverUrl: event?.coverUrl || "",
    startAt: event?.startAt ? event.startAt.slice(0, 16) : "",
    organization: event?.organization || "",
    location: event?.location || "",
    status: event?.status || "Upcoming",
    publish: event?.publish ?? true,
  });

  const [brokenCoverUrl, setBrokenCoverUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Single declaration for updating form state fields
  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    if (field === "coverUrl") {
      setSubmitted(false);
    }
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { _id, ...dataToUpdate } = form; // Exclude _id from the update payload

    try {
      const res = await fetch(`http://localhost:5000/events/${event._id}`, {
        method: "PATCH", // or PATCH depending on your Express route
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToUpdate),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`Server Error (${res.status}):`, errorText);
        alert(`Failed to update event. Status: ${res.status}`);
        setLoading(false);
        return;
      }

      const updatedData = await res.json();
      console.log("Successfully updated event:", updatedData);
      setSubmitted(true);
      setLoading(false);

      // Close modal after successful update or refresh router if needed
      setTimeout(() => {
        setOpen(false);
        window.location.reload(); // Refresh to see updated data on server component page
      }, 1000);
    } catch (error) {
      console.error("Network error during update:", error);
      setLoading(false);
    }
  }

  const showCoverPreview =
    form.coverUrl &&
    form.coverUrl.length > 0 &&
    brokenCoverUrl !== form.coverUrl;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-12 px-6 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4 text-slate-500" />
          Edit Event
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event Details</DialogTitle>
          <DialogDescription>
            Update the information below to modify your community event.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleUpdateSubmit}
          className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Title */}
          <div className="sm:col-span-2">
            <Label htmlFor="event-title" className="font-semibold">
              Event Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="event-title"
              required
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="Winter Clothes Distribution"
              className={inputClasses}
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <Label htmlFor="event-description" className="font-semibold">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="event-description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Help underprivileged families stay warm..."
              className="mt-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm w-full"
            />
          </div>

          {/* Cover URL */}
          <div className="sm:col-span-2">
            <Label htmlFor="event-cover" className="font-semibold">
              Cover Image URL
            </Label>
            <Input
              id="event-cover"
              type="url"
              required
              value={form.coverUrl}
              onChange={(e) => {
                setBrokenCoverUrl(null);
                setField("coverUrl", e.target.value);
              }}
              placeholder="https://example.com/cover.jpg"
              className={inputClasses}
            />

            {showCoverPreview ? (
              <div className="relative mt-3 overflow-hidden rounded-xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.coverUrl}
                  alt="Event cover preview"
                  className="h-40 w-full object-cover"
                  onError={() => setBrokenCoverUrl(form.coverUrl)}
                />
              </div>
            ) : null}
          </div>

          {/* Start Date & Time */}
          <div>
            <Label htmlFor="event-start" className="font-semibold">
              Start Date &amp; Time
            </Label>
            <Input
              id="event-start"
              type="datetime-local"
              required
              value={form.startAt}
              onChange={(e) => setField("startAt", e.target.value)}
              className={inputClasses}
            />
          </div>

          {/* Organization */}
          <div>
            <Label htmlFor="event-org" className="font-semibold">
              Organization Name
            </Label>
            <Input
              id="event-org"
              required
              value={form.organization}
              onChange={(e) => setField("organization", e.target.value)}
              placeholder="SocialServe Team"
              className={inputClasses}
            />
          </div>

          {/* Location */}
          <div className="sm:col-span-2">
            <Label htmlFor="event-location" className="font-semibold">
              Location Address
            </Label>
            <Input
              id="event-location"
              required
              value={form.location}
              onChange={(e) => setField("location", e.target.value)}
              placeholder="Mirpur 10, Dhaka"
              className={inputClasses}
            />
          </div>

          {/* Status & Publish Switch block */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="event-status" className="font-semibold">
                  Event Status
                </Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => setField("status", value)}
                >
                  <SelectTrigger
                    id="event-status"
                    className="mt-1.5 h-10 w-full bg-white"
                  >
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="font-semibold">Publish Event</Label>
                <div className="mt-2 flex items-center gap-3">
                  <Switch
                    checked={form.publish}
                    onCheckedChange={(checked) => setField("publish", checked)}
                  />
                  <span className="text-xs text-slate-500">
                    Make event publicly visible
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action Buttons */}
          <div className="sm:col-span-2 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700"
            >
              <Megaphone className="size-4 mr-2" aria-hidden="true" />
              {loading ? "Updating..." : "Save Changes"}
            </Button>

            {submitted ? (
              <p
                role="status"
                className="mt-3 rounded-lg bg-emerald-50 px-4 py-2 text-center text-sm font-medium text-emerald-700 border border-emerald-200"
              >
                Event updated successfully!
              </p>
            ) : null}
          </div>
        </form>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
