// src/app/dashboard/portfolio/DeleteButton.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function DeleteButton({ id }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [pending, startTransition] = useTransition();

    const onDelete = async () => {
        if (!confirm("Delete this portfolio item?")) return;

        try {
            setLoading(true);
            const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
            // refresh the server-rendered table
            startTransition(() => router.refresh());
        } catch (err) {
            alert(err.message || "Delete failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={onDelete}
            disabled={loading || pending}
            className="text-red-600 hover:underline disabled:opacity-60"
        >
            {loading || pending ? "Deleting…" : "Delete"}
        </button>
    );
}
