"use client";
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
import { PencilIcon, PencilOffIcon, SaveIcon, Trash2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState, type ChangeEvent } from "react";
import { toast } from "react-toastify";

const CATEGORIES = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "city", label: "City Break" },
  { value: "cultural", label: "Cultural" },
  { value: "cruise", label: "Cruise" },
];

type PackageForm = {
  _id: string;
  name: string;
  country: string;
  category: string | null;
  price: string;
  duration: string;
  date: string;
  imageUrl: string;
  description: string;
};

const UpdateDestinationPage = ({
  destination,
}: {
  destination: PackageForm;
}) => {
  const [form, setForm] = useState<PackageForm>(destination);
  const [status, setStatus] = useState<string | null>(null);

  function setField<K extends keyof PackageForm>(
    key: K,
    value: PackageForm[K],
  ) {
    setStatus(null);
    setForm((current) => ({ ...current, [key]: value }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { _id, ...updatedUser } = form;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        },
      );
      const data = await res.json();

      console.log("after UPDATE ", data);

      setStatus("Saved!");
      toast.success("Updated successfully!");
    } catch (err) {
      console.error("PATCH failed:", err);

      setStatus("Something went wrong. Check the console.");
      toast.error("Update failed! Please try again.");
    }
  };

  function handleTextInput<K extends "country" | "price" | "duration">(
    key: K,
  ): (event: ChangeEvent<HTMLInputElement>) => void {
    return (event) => setField(key, event.target.value);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger
          render={
            <Button variant="outline">
              <PencilOffIcon className="size-4" /> Edit
            </Button>
          }
        />

        <DialogContent className="max-h-[90vh] w-full overflow-y-auto p-0 sm:max-w-lg md:max-w-2xl">
          <DialogHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
            <DialogTitle>Edit Destination</DialogTitle>
            <DialogDescription>
              Make changes to your destination here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            aria-label="Edit travel package"
            className="mt-2 w-full space-y-5 px-4 pb-6 sm:px-6"
          >
            <div className="grid gap-4 sm:gap-5">
              {/* Destination Name */}
              <div className="grid gap-2">
                <Label htmlFor="destination-name">Destination Name</Label>
                <Input
                  id="destination-name"
                  name="name"
                  required
                  className="h-10 w-full rounded-md bg-input/40"
                  value={form.name}
                  onChange={(event) => setField("name", event.target.value)}
                />
              </div>

              {/* Country + Category */}
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Indonesia"
                    className="h-10 w-full rounded-md bg-input/40"
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
                            : "Select a category"
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
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g., 1299"
                    className="h-10 w-full rounded-md bg-input/40"
                    value={form.price}
                    onChange={handleTextInput("price")}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g., 7 Days / 6 Nights"
                    className="h-10 w-full rounded-md bg-input/40"
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
                  className="h-10 w-full rounded-md bg-input/40"
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
                  className="h-10 w-full rounded-md bg-input/40"
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
                  className="min-h-28 w-full rounded-md bg-input/40 sm:min-h-32"
                  value={form.description}
                  onChange={(event) =>
                    setField("description", event.target.value)
                  }
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="destructive"
                    className="h-10 w-full sm:w-auto"
                  />
                }
              >
                <Trash2Icon className="mr-2 h-4 w-4" />
                Cancel
              </DialogClose>
              <Button
                type="submit"
                className="h-10 w-full hover:bg-brand/85 sm:w-auto"
              >
                <SaveIcon className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>

            {status ? (
              <output className="block text-sm text-muted-foreground">
                {status}
              </output>
            ) : null}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateDestinationPage;
