// src/app/lib/upload.js
export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result); // data URL (data:image/png;base64,...)
        r.onerror = reject;
        r.readAsDataURL(file);
    });
}

export async function uploadImageFile(file) {
    const dataUrl = await fileToBase64(file);
    const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, data: dataUrl, image: dataUrl }),
    });

    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = {}; }

    if (!res.ok || !json?.url) {
        console.error("Upload failed:", text);
        throw new Error(json?.error || `Upload failed (${res.status})`);
    }
    return json.url;
}
