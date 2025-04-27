"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { createNewDocument } from "../actions/action";
function NewDocBtn() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleCreateDoc = () => {
    // Logic to create a new document

    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
  };

  return (
    <Button onClick={handleCreateDoc} disabled={isPending}>
      {isPending ? "Creating" : "New Document"}
    </Button>
  );
}

export default NewDocBtn;
