import { useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

interface TiptapEditorProps {
    content?: string;
    onChange?: (content: string) => void;
}

const toolbarButtons = [
    { cmd: 'bold', icon: 'B', title: 'Negrita' },
    { cmd: 'italic', icon: 'I', title: 'Cursiva' },
    { cmd: 'underline', icon: 'U', title: 'Subrayado' },
    { cmd: 'strike', icon: 'S', title: 'Tachado' },
    { cmd: 'heading', icon: 'H1', title: 'Encabezado' },
    { cmd: 'bulletList', icon: '• Lista', title: 'Lista de viñetas' },
    { cmd: 'orderedList', icon: '1. Lista', title: 'Lista numerada' },
    { cmd: 'blockquote', icon: '""', title: 'Cita' },
    { cmd: 'code', icon: '<>', title: 'Código' },
    { cmd: 'codeBlock', icon: '[code]', title: 'Bloque de código' },
    { cmd: 'horizontalRule', icon: '—', title: 'Línea' },
    { cmd: 'link', icon: '🔗', title: 'Enlace' },
    { cmd: 'image', icon: '🖼️', title: 'Imagen' },
    { cmd: 'table', icon: '📋', title: 'Tabla' },
    { cmd: 'undo', icon: '↺', title: 'Deshacer' },
    { cmd: 'redo', icon: '↻', title: 'Rehacer' },
    { cmd: 'alignLeft', icon: '⯇', title: 'Alinear izquierda' },
    { cmd: 'alignCenter', icon: '↔', title: 'Centrar' },
    { cmd: 'alignRight', icon: '⯈', title: 'Alinear derecha' },
];

export default function TiptapEditor({
    content = '',
    onChange,
}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
            Bold,
            Italic,
            Underline,
            Strike,
            Heading.configure({ levels: [1, 2, 3] }),
            BulletList,
            OrderedList,
            ListItem,
            Blockquote,
            Code,
            CodeBlock,
            Link,
            Image,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            HorizontalRule,
            Table.configure({ resizable: true }),
            TableRow,
            TableCell,
            TableHeader,
        ],
        content,
        onUpdate({ editor }) {
            if (onChange) onChange(editor.getHTML());
        },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editor) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const src = event.target?.result as string;
            editor.chain().focus().setImage({ src }).run();
        };
        reader.readAsDataURL(file);
    };

    const runCommand = (cmd: string) => {
        if (!editor) return;
        switch (cmd) {
            case 'bold':
                editor.chain().focus().toggleBold().run();
                break;
            case 'italic':
                editor.chain().focus().toggleItalic().run();
                break;
            case 'underline':
                editor.chain().focus().toggleUnderline().run();
                break;
            case 'strike':
                editor.chain().focus().toggleStrike().run();
                break;
            case 'heading':
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                break;
            case 'bulletList':
                editor.chain().focus().toggleBulletList().run();
                break;
            case 'orderedList':
                editor.chain().focus().toggleOrderedList().run();
                break;
            case 'blockquote':
                editor.chain().focus().toggleBlockquote().run();
                break;
            case 'code':
                editor.chain().focus().toggleCode().run();
                break;
            case 'codeBlock':
                editor.chain().focus().toggleCodeBlock().run();
                break;
            case 'horizontalRule':
                editor.chain().focus().setHorizontalRule().run();
                break;
            case 'link':
                {
                    const url = prompt('Introduce la URL del enlace:');
                    if (url)
                        editor.chain().focus().setLink({ href: url }).run();
                }
                break;
            case 'image':
                fileInputRef.current?.click();
                break;
            case 'table':
                editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run();
                break;
            case 'undo':
                editor.chain().focus().undo().run();
                break;
            case 'redo':
                editor.chain().focus().redo().run();
                break;
            case 'alignLeft':
                editor.chain().focus().setTextAlign('left').run();
                break;
            case 'alignCenter':
                editor.chain().focus().setTextAlign('center').run();
                break;
            case 'alignRight':
                editor.chain().focus().setTextAlign('right').run();
                break;
            default:
                break;
        }
    };

    return (
        <div className="tiptap-editor border rounded bg-white dark:bg-gray-900">
            <div className="toolbar flex flex-wrap gap-1 p-2 border-b bg-gray-50 dark:bg-gray-800">
                {toolbarButtons.map((btn) => (
                    <button
                        key={btn.cmd}
                        type="button"
                        title={btn.title}
                        className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm"
                        onClick={() => runCommand(btn.cmd)}
                    >
                        {btn.icon}
                    </button>
                ))}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
            </div>
            <EditorContent editor={editor} className="p-3 " />
        </div>
    );
}
