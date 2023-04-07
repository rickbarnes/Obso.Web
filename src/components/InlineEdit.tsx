import { TextField } from "@mui/material";

export interface InlineEditProps {
  value: string;
  setValue: Function;
}

export const InlineEdit = ({ value, setValue }: InlineEditProps) => {
  const onChange = (event: any) => setValue(event.target.value);

  return <TextField value={value} onChange={onChange} variant="standard" />;
};
