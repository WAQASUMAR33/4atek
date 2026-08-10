// Utility helpers for service images and fallbacks

const SLUG_IMAGE_MAP = {
    "it-support-consultancy": "/assets/services/it-support-consultancy.png",
    "digital-marketing-solutions": "/assets/services/digital-marketing-solutions.png",
    "ai-and-big-data": "/assets/services/ai-and-big-data.png",
    "cloud-software-development": "/assets/services/cloud-software-development.png",
    "illustration-animation": "/assets/services/illustration-animation.png",
    "bi-dashboard": "/assets/services/bi-dashboard.png",
    "web-app-development": "/assets/services/web-app-development.png",
    "erp-crm": "/assets/services/erp-crm.png",
};

export const DEFAULT_SERVICE_PLACEHOLDER = "/assets/services/placeholder.jpg";

/**
 * Gets the default fallback image path for a service by slug or title.
 */
export function getServiceFallbackImage(slug = "", title = "") {
    const cleanSlug = String(slug || "").toLowerCase().trim();
    if (cleanSlug && SLUG_IMAGE_MAP[cleanSlug]) {
        return SLUG_IMAGE_MAP[cleanSlug];
    }

    // Try matching key phrases in slug or title
    const combined = `${cleanSlug} ${String(title).toLowerCase()}`;
    if (combined.includes("support") || combined.includes("consultancy")) return SLUG_IMAGE_MAP["it-support-consultancy"];
    if (combined.includes("marketing")) return SLUG_IMAGE_MAP["digital-marketing-solutions"];
    if (combined.includes("ai") || combined.includes("big data")) return SLUG_IMAGE_MAP["ai-and-big-data"];
    if (combined.includes("cloud")) return SLUG_IMAGE_MAP["cloud-software-development"];
    if (combined.includes("illustration") || combined.includes("animation")) return SLUG_IMAGE_MAP["illustration-animation"];
    if (combined.includes("bi") || combined.includes("dashboard")) return SLUG_IMAGE_MAP["bi-dashboard"];
    if (combined.includes("web") || combined.includes("app")) return SLUG_IMAGE_MAP["web-app-development"];
    if (combined.includes("erp") || combined.includes("crm")) return SLUG_IMAGE_MAP["erp-crm"];

    return DEFAULT_SERVICE_PLACEHOLDER;
}

/**
 * Checks if a given image URL is valid and not pointing to known broken/dead domains.
 */
export function isBrokenImageUrl(url) {
    if (!url || typeof url !== "string") return true;
    const trimmed = url.trim();
    if (!trimmed) return true;
    // Check for dead domain
    if (trimmed.includes("virgocrumbs.com")) return true;
    return false;
}

/**
 * Returns the best image URL for a service item object.
 */
export function getServiceImageUrl(svc) {
    if (!svc) return DEFAULT_SERVICE_PLACEHOLDER;

    const raw = svc.coverImage || svc.image1 || svc.img || "";
    if (raw && !isBrokenImageUrl(raw)) {
        return raw;
    }

    return getServiceFallbackImage(svc.slug, svc.title);
}
