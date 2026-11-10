"use client";

import { SaveIcon, Trash2Icon } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City Break" },
  { value: "cultural", label: "Cultural" },
  { value: "cruise", label: "Cruise" },
];

type PackageForm = {
  name: string;
  country: string;
  category: string | null;
  price: string;
  duration: string;
  date: string;
  imageUrl: string;
  description: string;
};

const EMPTY_FORM: PackageForm = {
  name: "",
  country: "",
  category: null,
  price: "",
  duration: "",
  date: "",
  imageUrl: "",
  description: "",
};

export default function AddDestinationPage() {
  const [form, setForm] = useState<PackageForm>(EMPTY_FORM);
  const [status, setStatus] = useState<string | null>(null);

  function setField<K extends keyof PackageForm>(
    key: K,
    value: PackageForm[K],
  ) {
    setStatus(null);
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = await getTokenFromClient();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    try {
      const data = await res.json();

      console.log("after submit ", data);

      toast.success("Travel package added successfully!");
      setStatus("Saved!");
    } catch (err) {
      console.error("Submit failed:", err);

      toast.error("Failed to add travel package!");
      setStatus("Something went wrong. Please try again.");
    }
  }

  function handleTextInput<K extends "country" | "price" | "duration">(
    key: K,
  ): (event: ChangeEvent<HTMLInputElement>) => void {
    return (event) => setField(key, event.target.value);
  }

  return (
    <div className="px-4 py-10 md:px-9">
      <h1 className="text-4xl font-medium">Add New Travel Package</h1>

      <form
        onSubmit={handleSubmit}
        aria-label="Add new travel package"
        className="mx-auto mt-10 max-w-3xl border border-border/60 bg-card p-5 shadow-sm md:p-8"
      >
        <div className="grid gap-5">
          {/* Destination Name */}
          <div className="grid gap-2">
            <Label htmlFor="destination-name">Destination Name</Label>
            <Input
              id="destination-name"
              name="name"
              required
              placeholder="Bali Paradise"
              className="h-10 rounded-md bg-input/40"
              value={form.name}
              onChange={(event) => setField("name", event.target.value)}
            />
          </div>

          {/* Country + Category */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Indonesia"
                className="h-10 rounded-md bg-input/40"
                value={form.country}
                onChange={handleTextInput("country")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  setField("category", (value as string) ?? null)
                }
              >
                <SelectTrigger
                  id="category"
                  className="h-10 w-full rounded-md bg-input/40"
                >
                  <SelectValue>
                    {(value: string | null) =>
                      value
                        ? (CATEGORIES.find((item) => item.value === value)
                            ?.label ?? value)
                        : "Beach"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price + Duration */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="1"
                placeholder="e.g., 1299"
                className="h-10 rounded-md bg-input/40"
                value={form.price}
                onChange={handleTextInput("price")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g., 7 Days/ 6 Nights"
                className="h-10 rounded-md bg-input/40"
                value={form.duration}
                onChange={handleTextInput("duration")}
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="grid gap-2">
            <Label htmlFor="departure-date">Departure Date</Label>
            <Input
              id="departure-date"
              name="date"
              type="date"
              className="h-10 rounded-md bg-input/40"
              value={form.date}
              onChange={(event) => setField("date", event.target.value)}
            />
          </div>

          {/* Image URL */}
          <div className="grid gap-2">
            <Label htmlFor="image-url">Image URL</Label>
            <Input
              id="image-url"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              className="h-10 rounded-md bg-input/40"
              value={form.imageUrl}
              onChange={(event) => setField("imageUrl", event.target.value)}
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the travel experience..."
              className="min-h-32 rounded-md bg-input/40"
              value={form.description}
              onChange={(event) => setField("description", event.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="destructive"
            className="h-10"
            onClick={() => {
              setForm(EMPTY_FORM);
              setStatus(null);
            }}
          >
            <Trash2Icon />
            Cancel
          </Button>
          <Button type="submit" className="h-10 hover:bg-brand/85">
            <SaveIcon />
            Add Travel Package
          </Button>
        </div>

        {status ? (
          <output className="mt-4 block text-sm text-muted-foreground">
            {status}
          </output>
        ) : null}
      </form>
    </div>
  );
}
