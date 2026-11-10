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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteDialog = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Deleted Successfully");
      router.push("/destination");
    } else {
      toast.error(data?.message ?? "Failed to delete destination");
    }
  };
  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger
            render={
              <Button variant="outline">
                <Trash />
                Delete
              </Button>
            }
          />
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Delete destination</DialogTitle>
              <DialogDescription>
                Are you sure want to delete your destination here. Click yes to
                delete.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button onClick={handleDelete} type="submit">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
