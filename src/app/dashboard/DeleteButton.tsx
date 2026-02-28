"use client";
import { useTransition } from "react";

export default function DeleteButton({ dbId }: { dbId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (!confirm("Are you sure you want to delete this certificate?")) return;
        startTransition(async () => {
          await fetch(`/api/certificates?dbId=${dbId}`, { method: "DELETE" });
          window.location.reload();
        });
      }}
      className="bg-white text-black border border-red-700 hover:bg-red-700 hover:text-white font-semibold px-3 py-1 rounded transition-colors"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}