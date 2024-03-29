import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor = ({ value, onChange }: IProps) => {
  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

export default TextEditor;
