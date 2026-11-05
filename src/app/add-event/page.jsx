"use client";

import { useState } from "react";
import { FileEdit, HandHeart, Megaphone, Sparkles } from "lucide-react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { getAuthHeaders } from "@/lib/session";

const { useSession } = authClient;

const initialForm = {
  title: "",
  description: "",
  coverUrl: "/event-cover.jpg",
  startAt: "2026-11-20T10:00",
  organization: "",
  location: "",
  status: "Upcoming",
  publish: true,
};

const inputClasses =
  "mt-1.5 h-10 w-full rounded-lg border-border bg-white px-3 text-sm";

function RequiredMark() {
  return (
    <span className="text-red-500" aria-hidden="true">
      *
    </span>
  );
}

function FieldLabel({ children, htmlFor, className }) {
  return (
    <Label htmlFor={htmlFor} className={cn("gap-0.5 font-semibold", className)}>
      {children} <RequiredMark />
    </Label>
  );
}

export default function AddEventPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState(initialForm);
  const [brokenCoverUrl, setBrokenCoverUrl] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    if (field === "coverUrl") {
      setSubmitted(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!session?.user?.email) {
      alert("You must be logged in to create an event.");
      return;
    }

    try {
      // Protected API: sends the user's JWT (see src/lib/session.js). The
      // server derives `createdBy` from the verified token.
      const authHeaders = await getAuthHeaders();
      const res = await fetch("http://localhost:5000/add-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        body: JSON.stringify({
          ...form,
          createdBy: session.user.email,
          joinedUsers: [],
        }),
      });

      // Check if the server returned a 404, 500, or other error
      if (!res.ok) {
        const textError = await res.text(); // Read HTML error message instead of crashing on .json()
        console.error(`Server Error (${res.status}):`, textError);
        alert(`Failed to save event. Server returned status: ${res.status}`);
        return;
      }

      const data = await res.json();
      console.log("Response from server:", data);
      console.log("Create & Publish Event payload", { ...form });
      setSubmitted(true);
    } catch (error) {
      console.error("Network or parsing error:", error);
    }
  }

  const showCoverPreview =
    form.coverUrl.length > 0 && brokenCoverUrl !== form.coverUrl;

  return (
    <main className="min-h-screen bg-brand-cream py-8 sm:py-12">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-brand-dark to-brand-deep px-6 py-8 text-white sm:px-10 sm:py-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold tracking-wide ring-1 ring-white/25">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Event Creator Studio
          </span>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Create a Community Event
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
            Fill in the details below to publish a new social service initiative
            and invite volunteers to make an impact.
          </p>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -bottom-10 flex items-end opacity-15"
          >
            <HandHeart className="size-28 rotate-12 sm:size-36" />
            <HandHeart className="-ml-8 size-36 -rotate-12 sm:size-48" />
          </div>
        </header>

        <Card className="mt-6 gap-6 px-5 pb-8 sm:px-8 sm:pb-9 [--card-spacing:--spacing(3)]">
          <CardContent className="px-0">
            <div className="flex items-center gap-2.5 border-b border-border/70 pb-4">
              <span className="flex size-9 items-center justify-center rounded-lg bg-brand-cream text-brand">
                <FileEdit className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-base font-bold text-foreground">
                  Event Information
                </h2>
                <p className="text-xs text-muted-foreground">
                  Details volunteers will see about the event
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
              noValidate={false}
            >
              <div className="sm:col-span-2">
                <FieldLabel htmlFor="event-title">Event Title</FieldLabel>
                <Input
                  id="event-title"
                  required
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="Winter Clothes Distribution"
                  className={inputClasses}
                />
              </div>

              <div className="sm:col-span-2">
                <FieldLabel htmlFor="event-description">Description</FieldLabel>
                <Textarea
                  id="event-description"
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="Help underprivileged families stay warm this winter by distributing warm clothes to people in need."
                  className="mt-1.5 rounded-lg border-border bg-white px-3 py-2.5 text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <FieldLabel htmlFor="event-cover">Cover Image URL</FieldLabel>
                <Input
                  id="event-cover"
                  type="url"
                  required
                  value={form.coverUrl}
                  onChange={(e) => {
                    setBrokenCoverUrl(null);
                    setField("coverUrl", e.target.value);
                  }}
                  placeholder="https://example.com/cover-photo.jpg"
                  className={inputClasses}
                />

                {showCoverPreview ? (
                  <div className="relative mt-3 overflow-hidden rounded-xl ring-1 ring-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.coverUrl}
                      alt="Event cover preview"
                      className="h-40 w-full object-cover sm:h-48"
                      onError={() => setBrokenCoverUrl(form.coverUrl)}
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-brand-dark/85 px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] text-white uppercase">
                      Live Preview
                    </span>
                  </div>
                ) : null}
              </div>

              <div>
                <FieldLabel htmlFor="event-start">
                  Start Date &amp; Time
                </FieldLabel>
                <Input
                  id="event-start"
                  type="datetime-local"
                  required
                  value={form.startAt}
                  onChange={(e) => setField("startAt", e.target.value)}
                  className={inputClasses}
                />
              </div>

              <div>
                <FieldLabel htmlFor="event-org">Organization Name</FieldLabel>
                <Input
                  id="event-org"
                  required
                  value={form.organization}
                  onChange={(e) => setField("organization", e.target.value)}
                  placeholder="SocialServe Volunteer Team"
                  className={inputClasses}
                />
              </div>

              <div className="sm:col-span-2">
                <FieldLabel htmlFor="event-location">
                  Location Address
                </FieldLabel>
                <Input
                  id="event-location"
                  required
                  value={form.location}
                  onChange={(e) => setField("location", e.target.value)}
                  placeholder="Mirpur 10, Dhaka, Bangladesh"
                  className={inputClasses}
                />
              </div>

              <div className="rounded-lg border border-border bg-brand-cream/70 sm:col-span-2">
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5">
                  <div>
                    <Label
                      htmlFor="event-status"
                      className="gap-0.5 font-semibold"
                    >
                      Event Status <RequiredMark />
                    </Label>
                    <Select
                      value={form.status}
                      onValueChange={(value) => setField("status", value ?? "")}
                    >
                      <SelectTrigger
                        id="event-status"
                        size="default"
                        className="mt-1.5 h-10 w-full rounded-lg border-border bg-white px-3 text-sm"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Upcoming">Upcoming</SelectItem>
                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="font-semibold">Publish Immediately</Label>
                    <div className="mt-1.5 flex items-center gap-3">
                      <Switch
                        checked={form.publish}
                        onCheckedChange={(checked) =>
                          setField("publish", checked ?? true)
                        }
                        className="data-checked:bg-brand"
                      />
                      <span className="text-xs text-muted-foreground">
                        Make event public policy
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  className="h-11 w-full rounded-lg bg-brand text-sm font-bold text-white hover:bg-brand/90"
                >
                  <Megaphone className="size-4" aria-hidden="true" />
                  Create &amp; Publish Event
                </Button>

                {submitted ? (
                  <p
                    role="status"
                    className="mt-4 rounded-lg bg-brand-cream px-4 py-3 text-center text-sm font-medium text-brand-dark ring-1 ring-brand/30"
                  >
                    Event published successfully! Check the browser console for
                    the submitted payload.
                  </p>
                ) : null}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
