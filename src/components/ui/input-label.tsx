import { Form } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "./form";
import Typography from "./typography";
import { Input } from "./input";

interface InputLabelProps
  extends Omit<React.ComponentProps<typeof FormField>, "render"> {
  label: string;
}
const InputLabel = ({ label, ...props }: InputLabelProps) => {
  return (
    <FormField
      {...props}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <Typography variant="small">{label}</Typography>
          </FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
        </FormItem>
      )}
    ></FormField>
  );
};

export default InputLabel;
