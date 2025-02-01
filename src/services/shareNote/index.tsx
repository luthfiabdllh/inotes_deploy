import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://note-iota-two.vercel.app/api";

/**
 * Fungsi untuk memperbarui catatan di API
 * @param id - ID catatan yang akan diperbarui
 * @param updatedData - Data yang akan diperbarui
 */

export async function createShareNote(id: string, email: string) {
  try {
    const session = await getSession();
    if (!session || !session.accessToken) {
      throw new Error("Access token not found, please login again.");
    }

    const res = await fetch(`${API_BASE_URL}notes/share/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { email: email }
      ),
    });

    if (!res.ok) {
      throw new Error(`Failed to update note, status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
}
