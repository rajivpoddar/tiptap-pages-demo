import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Pagination, {
  PageNode, HeaderFooterNode, BodyNode, // Restoring HeaderFooterNode
} from 'tiptap-extension-pagination'
import { useEffect } from 'react'

// Style block is being cleared of previous rules for page padding
// as they are ineffective against inline styles set by the extension.
// Further debugging of the extension's behavior or child element styles is needed.
const pageStyles = `
  /* 
    CSS rules for page padding are best handled by the pagination extension's configuration 
    or by inspecting and overriding its inline styles if necessary.
    The previously attempted CSS here was not effective.
    The core issue for cutoff seems to be that defaultMarginConfig
    is not being applied correctly (div.body shows margin: 25.4mm, not top: 33.87mm).
    Attempting to set margins directly on BodyNode via HTMLAttributes.
  */
  .ProseMirror p {
    line-height: 1.5;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export default function TiptapPages() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Pagination.configure({
        defaultPaperSize: "A4",
        defaultPaperOrientation: 'portrait',
        defaultMarginConfig: { // This config seems to be the issue
          top: 25.4,
          right: 25.4,
          bottom: 25.4,
          left: 25.4,
        },
      }),
      PageNode, 
      HeaderFooterNode, // Restored
      BodyNode.configure({ // Attempt to directly set style on BodyNode
        HTMLAttributes: {
          style: 'margin-top: 33.87mm; margin-right: 25.4mm; margin-bottom: 33.87mm; margin-left: 25.4mm;',
        },
      }),
    ],
    content: '',
  })

  useEffect(() => {
    if (editor) {
      const fetchContent = async () => {
        try {
          const response = await fetch('/transcript.txt')
          const text = await response.text()
          // Updated formatting to handle empty lines as <p></p>
          const formattedText = text.split('\n').map(line => {
            return `<p>${line.trim()}</p>`;
          }).join('');
          editor.commands.setContent(formattedText)
        } catch (error) {
          console.error("Failed to fetch transcript:", error)
          editor.commands.setContent("<p>Error loading content.</p>")
        }
      }
      fetchContent()
    }
  }, [editor])

  return (
    <>
      <style>{pageStyles}</style>
      <EditorContent editor={editor} />
    </>
  )
}
