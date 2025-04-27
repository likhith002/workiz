"use client";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDoc from "./DeleteDoc";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

function Document({ id }: { id: string }) {
  const [input, setInput] = useState<string>("");
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [isPending, startTransition] = useTransition();
  const isOwner = useOwner();
  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  console.log("Is owner", isOwner);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), { title: input });
      });
    }
  };

  return (
    <div className="flex-1 bg-white">
      <div className="flex max-w-6xl mx-auto justify-between pb-5 pt-4">
        <form
          className="flex flex-1  items-center space-x-2"
          onSubmit={updateTitle}
        >
          <Input value={input} onChange={(e) => setInput(e.target.value)} />

          <Button disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>

          {isOwner && (
            <>
              <InviteUser />
              <DeleteDoc />
            </>
          )}
        </form>
      </div>
      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        <ManageUsers />
        <Avatars />
      </div>
      <hr className="pb-10"></hr>
      <Editor />
    </div>
  );
}

export default Document;
