import {TextField} from '@material-ui/core';
import {Controller} from "react-hook-form";

const RTextField = (
  {
    name,
    control,
    variant = 'outlined',
    ...rest
  }
) => {
  if (name && control) {
    return (
      <Controller
        name={name}
        control={control}
        render={({field: {ref, value, onChange, onBlur}, fieldState: {error}}) => (
          <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={!!error}
            helperText={error?.message}
            variant={variant}
            {...rest}
          />
        )}
      />
    )
  }

  return <TextField
    variant={variant}
    {...rest}
  />
}

export {
  RTextField
}
