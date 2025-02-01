"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS, { ToolConstructable } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Delimiter from "@editorjs/delimiter";
import "./editor.css";
import { updateNote } from "@/services/note";
import { add, max } from "date-fns";
import { getSession } from "next-auth/react";

interface EditorProps {
  data: any;
  readOnly: boolean;
  noteId: string;
}

export const Editor: React.FC<EditorProps> = ({ data, readOnly, noteId }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await getSession();
        if (!session || !session.accessToken) {
          throw new Error("Access token not found, please login again.");
        }
        setAccessToken(session.accessToken);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  // Fungsi untuk menyimpan data ke API
  const saveDataToAPI = async () => {
    if (!editorRef.current) {
      console.warn("Editor belum siap!");
      return;
    }

    try {
      const { time, blocks, version } = await editorRef.current.save(); // Hanya ambil yang dibutuhkan
      console.log("Saving data...", { time, blocks, version });

      await updateNote(noteId, { content: { time, blocks, version } });

      console.log("Data successfully saved!");
    } catch (error) {
      console.error("Error saving editor content:", error);
    }
  };

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        readOnly: readOnly,
        data: { blocks: data },
        holder: "editorjs",
        tools: {
          header: {
        class: Header as unknown as ToolConstructable,
        inlineToolbar: true,
        config: { levels: [1, 2, 3, 4, 5, 6], defaultLevel: 3 },
          },
        list: { class: List as unknown as ToolConstructable, inlineToolbar: true },
        paragraph: { class: Paragraph as unknown as ToolConstructable, inlineToolbar: true },
        image: {
        class: Image as unknown as ToolConstructable,
        config: {
            endpoints: {
              byFile: `https://note-iota-two.vercel.app/api/images/${noteId}`,
            },
            additionalRequestHeaders: {
              Authorization: `Bearer ${accessToken}`,  // Gunakan hanya Authorization
            },
        }
        },
          code: { class: Code as unknown as ToolConstructable, inlineToolbar: true },
          quote: { class: Quote as unknown as ToolConstructable, inlineToolbar: true },
          table: { class: Table as unknown as ToolConstructable, inlineToolbar: true },
          delimiter: Delimiter,
        },
        placeholder: "Write your note here...",
        onReady: () => {
          console.log("Editor is ready");
          editorRef.current = editor;
        },
        onChange: () => {
          if (debounceTimeout) clearTimeout(debounceTimeout);
          const newTimeout = setTimeout(() => {
        saveDataToAPI();
          }, 2000);
          setDebounceTimeout(newTimeout);
        },
      });
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
        } catch (e) {
          console.error("ERROR editor cleanup", e);
        }
        editorRef.current = null;
      }
    };
  }, [data, readOnly]);

  return (
    <div className="editor-wrapper">
      <div id="editorjs" className="editor-container py-10"></div>
    </div>
  );
};

export default Editor;
