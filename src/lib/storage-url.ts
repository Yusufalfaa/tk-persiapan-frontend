const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getStorageUrl(
    path: string | null | undefined
) {
    if (!path) {
        return null;
    }

    return `${API_URL}${path}`;
}