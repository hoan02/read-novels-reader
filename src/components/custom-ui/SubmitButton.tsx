import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

type IProps = {
  text: string;
};

const SubmitButton = ({ text }: IProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {text}
    </Button>
  );
};

export default SubmitButton;
