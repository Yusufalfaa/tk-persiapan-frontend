const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSchoolProfile() {
  const res = await fetch(`${API_URL}/api/school`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch school profile");
  }

  return res.json();
}

export async function getNews() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news?page=1&size=3`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }

  return res.json();
}

export async function getNewsDetail(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/news/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}