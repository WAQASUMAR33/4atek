// src/app/dashboard/portfolio/new/page.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {LinkExt} from "@tiptap/extension-link";
import {ImageExt} from "@tiptap/extension-image";
import {Underline} from "@tiptap/extension-underline";
import { TextStyle } from '@tiptap/extension-text-style';
import {Color }from "@tiptap/extension-color";
import { uploadImageFile } from "@/app/lib/upload"; // ← NEW

// Icons
import {
    Bold, Italic, Underline as UnderlineIcon, List,
    ListOrdered, Link as LinkIcon, Image as ImageIcon,
    Minus, Quote, Type
} from "lucide-react";

/* Icon button */
function IconBtn({ active, onClick, title, children }) {
    return (
        <button
            type="button"
            title={title}
            aria-label={title}
            onClick={onClick}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white transition hover:bg-gray-50
        ${active ? "border-teal-600 text-teal-700" : "border-gray-200 text-gray-700"}`}
        >
            {children}
        </button>
    );
}

export default function NewPortfolio() {
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [shortDes, setShortDes] = useState("");
    const [status, setStatus] = useState("PUBLISHED");
    const [saving, setSaving] = useState(false);

    const fileInputRef = useRef(null); // ← NEW

    useEffect(() => setMounted(true), []);

    const editor = useEditor(
        {
            extensions: [
                StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
                LinkExt.configure({ openOnClick: true }),
                ImageExt,
                Underline,
                TextStyle,
                Color,
            ],
            content: "<p>Write your portfolio content…</p>",
            immediatelyRender: false,
            editorProps: { attributes: { class: "tiptap prose prose-neutral max-w-none min-h-[420px] focus:outline-none" } },
            autofocus: "end",
        },
        [mounted]
    );

    /* Toolbar helpers */
    const setHeading = (level) => {
        if (!editor) return;
        if (level === 0) editor.chain().focus().setParagraph().run();
        else editor.chain().focus().toggleHeading({ level }).run();
    };

    const setFontSize = (px) => {
        if (!editor) return;
        if (px === "reset") return editor.chain().focus().unsetMark("textStyle").run();
        editor.chain().focus().setMark("textStyle", { fontSize: px }).run();
    };

    const setFontColor = (hex) => {
        if (!editor) return;
        if (!hex) return editor.chain().focus().unsetColor().run();
        editor.chain().focus().setColor(hex).run();
    };

    // INSERT IMAGE BUTTON → file picker + upload
    const addImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) return;
            try {
                const url = await uploadImageFile(file);
                editor?.chain().focus().setImage({ src: url }).run();
            } catch (err) {
                alert(err.message || "Upload failed");
            }
        };
        input.click();
    };

    const submit = async () => {
        if (!title.trim()) return alert("Please enter a title");
        setSaving(true);
        const contentHtml = editor?.getHTML() ?? "";
        const res = await fetch("/api/portfolio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                image: cover || null,
                shortDes: shortDes || null,
                contentHtml,
                status,
            }),
        });
        setSaving(false);
        if (res.ok) {
            const data = await res.json();
            router.replace(`/dashboard/portfolio/${data.id}/edit`);
        } else {
            alert("Failed to create");
        }
    };

    const activeHeading =
        (editor && [1, 2, 3, 4].find((l) => editor.isActive("heading", { level: l }))) || 0;

    return (
        <div className="space-y-6">
            {/* Top bar */}
            <div className="-mx-5 border-b border-black/5 bg-white px-5 py-3">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <div className="min-w-0">
                        <div className="text-xs text-gray-500">Create</div>
                        <div className="truncate text-base font-medium text-[#0f6f70]">
                            {title || "New portfolio"}
                        </div>
                    </div>
                    <button
                        onClick={submit}
                        className="rounded-lg bg-[#0f6f70] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#0d5a5b] disabled:opacity-60"
                        disabled={saving}
                    >
                        {saving ? "Publishing…" : "Publish"}
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                {/* EDITOR CARD */}
                <section className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm h-[75vh] flex flex-col">
                    {/* Title row */}
                    <div className="border-b border-black/5 bg-gradient-to-r from-[#f0fbfb] via-white to-[#f0fbfb] px-4 py-3 shrink-0">
                        <input
                            className="w-full rounded-md border px-3 py-2 text-lg font-semibold text-[#0f6f70] outline-none ring-0 focus:border-[#0f6f70]"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Toolbar (icons) */}
                    <div className="border-b border-black/5 bg-white px-4 py-3 shrink-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <IconBtn active={editor?.isActive("bold")} onClick={() => editor?.chain().focus().toggleBold().run()} title="Bold"><Bold size={16} /></IconBtn>
                            <IconBtn active={editor?.isActive("italic")} onClick={() => editor?.chain().focus().toggleItalic().run()} title="Italic"><Italic size={16} /></IconBtn>
                            <IconBtn active={editor?.isActive("underline")} onClick={() => editor?.chain().focus().toggleUnderline().run()} title="Underline"><UnderlineIcon size={16} /></IconBtn>
                            <IconBtn active={editor?.isActive("bulletList")} onClick={() => editor?.chain().focus().toggleBulletList().run()} title="Bulleted list"><List size={16} /></IconBtn>
                            <IconBtn active={editor?.isActive("orderedList")} onClick={() => editor?.chain().focus().toggleOrderedList().run()} title="Numbered list"><ListOrdered size={16} /></IconBtn>

                            {/* Heading dropdown */}
                            <div className="flex items-center gap-1">
                                <Type size={16} className="text-gray-500" />
                                <select
                                    className="rounded-md border px-2 py-1.5 text-sm"
                                    value={activeHeading}
                                    onChange={(e) => setHeading(Number(e.target.value))}
                                    title="Heading"
                                >
                                    <option value={0}>Paragraph</option>
                                    <option value={1}>H1</option>
                                    <option value={2}>H2</option>
                                    <option value={3}>H3</option>
                                    <option value={4}>H4</option>
                                </select>
                            </div>

                            {/* Size + Color */}
                            <select className="rounded-md border px-2 py-1.5 text-sm" onChange={(e) => setFontSize(e.target.value)} defaultValue="reset" title="Font size">
                                <option value="reset">Size</option>
                                <option value="14px">14</option>
                                <option value="16px">16</option>
                                <option value="18px">18</option>
                                <option value="20px">20</option>
                                <option value="24px">24</option>
                                <option value="28px">28</option>
                            </select>
                            <input type="color" className="h-9 w-10 cursor-pointer rounded-md border p-1" onChange={(e) => setFontColor(e.target.value)} title="Font color" />

                            <IconBtn onClick={() => {
                                const href = prompt("Link URL");
                                if (href) editor?.chain().focus().setLink({ href, target: "_blank" }).run();
                            }} title="Add link"><LinkIcon size={16} /></IconBtn>

                            {/* INSERT IMAGE from computer */}
                            <IconBtn onClick={addImage} title="Insert image"><ImageIcon size={16} /></IconBtn>

                            <IconBtn onClick={() => editor?.chain().focus().setHorizontalRule().run()} title="Horizontal rule"><Minus size={16} /></IconBtn>
                            <IconBtn active={editor?.isActive("blockquote")} onClick={() => editor?.chain().focus().toggleBlockquote().run()} title="Blockquote"><Quote size={16} /></IconBtn>
                        </div>
                    </div>

                    {/* Editor area — only this scrolls */}
                    <div className="flex-1 px-4 py-4 overflow-y-auto">
                        {mounted && editor ? <EditorContent editor={editor} /> : <div className="text-sm text-gray-500">Loading editor…</div>}
                    </div>
                </section>

                {/* SIDE META */}
                <aside className="space-y-4">
                    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                        <div className="mb-3 text-sm font-medium text-[#0f6f70]">Status</div>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-md border px-3 py-2">
                            <option value="PUBLISHED">PUBLISHED</option>
                            <option value="DRAFT">DRAFT</option>
                        </select>
                    </div>

                    {/* COVER IMAGE with upload button */}
                    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                        <div className="mb-3 text-sm font-medium text-[#0f6f70]">Cover Image</div>
                        <div className="flex gap-2">
                            <input
                                value={cover}
                                onChange={(e) => setCover(e.target.value)}
                                className="w-full rounded-md border px-3 py-2"
                                placeholder="https://…"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="shrink-0 rounded-md border px-3 py-2 text-sm text-[#0f6f70] hover:bg-[#f0fbfb]"
                            >
                                Upload
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    try {
                                        const url = await uploadImageFile(file);
                                        setCover(url);
                                    } catch (err) {
                                        alert(err.message || "Upload failed");
                                    } finally {
                                        e.target.value = "";
                                    }
                                }}
                            />
                        </div>
                        {!!cover && (
                            <div className="mt-3 overflow-hidden rounded-md border">
                                <image src={cover} alt="Cover preview" className="max-h-48 w-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                        <div className="mb-3 text-sm font-medium text-[#0f6f70]">Short Description</div>
                        <textarea value={shortDes} onChange={(e) => setShortDes(e.target.value)} className="min-h-[110px] w-full rounded-md border px-3 py-2" />
                        <p className="mt-2 text-xs text-gray-500">Used on cards and social previews.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
