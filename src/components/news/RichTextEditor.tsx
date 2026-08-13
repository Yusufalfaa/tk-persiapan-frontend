"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Button } from "@/components/ui/button";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
} from "lucide-react";

interface Props {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

interface ToolbarState {
    bold: boolean;
    italic: boolean;
    bulletList: boolean;
    orderedList: boolean;
}

export default function RichTextEditor({
    value,
    onChange,
    disabled = false,
}: Props) {
    const [toolbarState, setToolbarState] =
        useState<ToolbarState>({
            bold: false,
            italic: false,
            bulletList: false,
            orderedList: false,
        });

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
            }),
        ],
        content: value,
        immediatelyRender: false,
        editable: !disabled,

        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    /*
     * Update state toolbar berdasarkan posisi cursor /
     * selection yang sedang aktif di editor.
     */
    useEffect(() => {
        if (!editor) {
            return;
        }

        const updateToolbarState = () => {
            setToolbarState({
                bold: editor.isActive("bold"),
                italic: editor.isActive("italic"),
                bulletList: editor.isActive("bulletList"),
                orderedList: editor.isActive("orderedList"),
            });
        };

        // Initial state
        updateToolbarState();

        // Update ketika selection / cursor berubah
        editor.on("selectionUpdate", updateToolbarState);

        // Update ketika content/transaction berubah
        editor.on("transaction", updateToolbarState);

        return () => {
            editor.off(
                "selectionUpdate",
                updateToolbarState
            );

            editor.off(
                "transaction",
                updateToolbarState
            );
        };
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="overflow-hidden rounded-md border border-black/10 bg-white">
            {/* Toolbar */}
            <div className="flex items-center gap-1 border-b border-black/10 bg-[#F5F2EC] p-2">
                {/* Bold */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onMouseDown={(event) => {
                        event.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleBold()
                            .run();
                    }}
                    className={
                        toolbarState.bold
                            ? "size-8 cursor-pointer bg-black/10 text-black"
                            : "size-8 cursor-pointer text-black/50 hover:bg-black/5 hover:text-black"
                    }
                >
                    <Bold className="size-4" />
                </Button>

                {/* Italic */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onMouseDown={(event) => {
                        event.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run();
                    }}
                    className={
                        toolbarState.italic
                            ? "size-8 cursor-pointer bg-black/10 text-black"
                            : "size-8 cursor-pointer text-black/50 hover:bg-black/5 hover:text-black"
                    }
                >
                    <Italic className="size-4" />
                </Button>

                {/* Bullet List */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onMouseDown={(event) => {
                        event.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run();
                    }}
                    className={
                        toolbarState.bulletList
                            ? "size-8 cursor-pointer bg-black/10 text-black"
                            : "size-8 cursor-pointer text-black/50 hover:bg-black/5 hover:text-black"
                    }
                >
                    <List className="size-4" />
                </Button>

                {/* Ordered List */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={disabled}
                    onMouseDown={(event) => {
                        event.preventDefault();

                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run();
                    }}
                    className={
                        toolbarState.orderedList
                            ? "size-8 cursor-pointer bg-black/10 text-black"
                            : "size-8 cursor-pointer text-black/50 hover:bg-black/5 hover:text-black"
                    }
                >
                    <ListOrdered className="size-4" />
                </Button>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="
                    min-h-40
                    px-3
                    py-2
                    text-sm
                    outline-none

                    [&_.ProseMirror]:min-h-40
                    [&_.ProseMirror]:outline-none
                    [&_.ProseMirror]:focus:outline-none

                    [&_.ProseMirror_p]:my-1

                    [&_.ProseMirror_ul]:my-2
                    [&_.ProseMirror_ul]:ml-5
                    [&_.ProseMirror_ul]:list-disc

                    [&_.ProseMirror_ol]:my-2
                    [&_.ProseMirror_ol]:ml-5
                    [&_.ProseMirror_ol]:list-decimal
                "
            />
        </div>
    );
}