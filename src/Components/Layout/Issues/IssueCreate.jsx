import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import { Button, Input } from "@mantine/core";
import { IconSTurnDown } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { personalKey } from "../../personalKey";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

const content = ``;
const IssueCreate = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Text here an issue description" }),
    ],
    content,
  });
  // console.log(editor);
  const navigate = useNavigate();
  // const mutation = useMutation();
  const { itemId } = useParams();
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`https://api.github.com/repos/Sapsan13/${itemId}/issues`, {
        headers: {
          Authorization: `Bearer ${personalKey}`,
        },
        method: "POST",
        body: JSON.stringify({
          title: titleRef.current.value,
          body: textRef.current.innerText,
        }),
      });
    },
    onSuccess: () => {
      console.log("SuccessIssue");
      navigate("/repos");
    },
  });
  // console.log(data, "ISSUES");
  if (!textRef) return;
  return (
    <>
      <Input
        icon={<IconSTurnDown />}
        placeholder="Issue title"
        ref={titleRef}
      />
      <RichTextEditor editor={editor} ref={textRef}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content maw="990px" />
      </RichTextEditor>
      <Button onClick={mutation.mutate}>Add an issue </Button>
    </>
  );
};

export default IssueCreate;
