import { updateBioHeader, updateBioText } from "@/lib/db";
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { InputHTMLAttributes, useState } from 'react';
import { useDisclosure } from "@mantine/hooks";

export const UpdateBioSection = ({ layout }:any) => {
  return (
    <div>
      <UpdateBioHeader layout={layout} />
      <UpdateBioText layout={layout} />
    </div>
  )
}

const UpdateBioHeader = ({ layout }:any) => {
  const toastUpdateBioHeader = async(formData:FormData) => {
    const result = await updateBioHeader(formData);
    if(result?.error) {
      toast.error('Error updating bio header');
    } else {
      toast.success('Bio Header Updated');
    }
    redirect('/settings');
  }

  return (
    <form action={toastUpdateBioHeader}>
      <input type="text" hidden name='location' value='home' />
      <div className="flex justify-between">
        <Text size="lg" mb="xs" fw={500}>Update Bio Header ={'>'}</Text>
        <div className="flex">
          <TextInput placeholder="Bio Header" defaultValue={layout.bioHeader} required name='bioHeader' />
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  )
}

const UpdateBioText = ({ layout }:any) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const toastUpdateBioText = async(formData:FormData) => {
    const result = await updateBioText(formData);
    if(result?.error) {
      toast.error('Error updating bio text');
    } else {
      toast.success('Bio Text Updated');
    }
    redirect('/settings');
  }

  return (
    <>  
      <div className="flex justify-between">
        <Text size="lg" mb="xs" fw={500}>Update Bio Text ={'>'}</Text>
        <Button onClick={toggle}>Open Form</Button>
      </div>
          
      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <form action={toastUpdateBioText}>
          <input type="text" hidden name='location' value='home' />
          <Text size="sm" mb="xs" fw={500}>
            Change Bio Text
          </Text>
          <TextEditor name="bioText" layout={layout} />
          <Button type="submit">Submit</Button>
        </form>
      </Dialog>
    </>
  )
}

const TextEditor = ({ name, layout }:{name:string, layout:any}) => {
  const [value, setValue] = useState('')
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link
    ],
    content: layout.bioText,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML()); // Update state with editor content
    },
  });

  return (
    <>
      <input type="text" hidden name={name} value={value} />
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup className="flex gap-4 mb-2">
            <RichTextEditor.Bold/>
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup className="flex gap-4 mb-2">
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup className="flex gap-4 mb-2">
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup className="flex gap-4 mb-2">
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup className="flex gap-4 mb-2">
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup className="flex gap-4 mb-2">
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content className="border-2 mb-4 h-[200px] overflow-y-auto" />
      </RichTextEditor>
    </>
  )
}