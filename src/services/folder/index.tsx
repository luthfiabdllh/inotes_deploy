import { getSession } from "next-auth/react";

export async function fetchFolderDetail(id: string) {
  try {
    const session = await getSession();

    if (!session || !session.accessToken) {
      throw new Error("Access token not found, please login again.");
    }

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://note-iota-two.vercel.app/api";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout 10 detik

    const res = await fetch(`${API_BASE_URL}/folders/${id}/notes`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId); // Hapus timeout jika request berhasil

    if (!res.ok) {
      throw new Error(`Failed to fetch folder details, status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching folder details:", error);
    throw error;
  }
}
