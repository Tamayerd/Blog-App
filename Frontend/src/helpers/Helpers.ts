import { OutputData } from "@editorjs/editorjs";

export const truncateContent = (content: OutputData): string => {
  return (
    content.blocks
      .map((block) => block.data.text)
      .join(" ")
      .substring(0, 10) + "..."
  );
};

export default truncateContent;
