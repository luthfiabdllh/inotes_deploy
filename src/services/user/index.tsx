import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://note-iota-two.vercel.app/api";

/**
 * Fungsi untuk memperbarui catatan di API
 * @param id - ID catatan yang akan diperbarui
 * @param updatedData - Data yang akan diperbarui
 */

export async function getAllUser() {
  try {
    const session = await getSession();
    if (!session || !session.accessToken) {
      throw new Error("Access token not found, please login again.");
    }

    const res = await fetch(`${API_BASE_URL}users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
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
