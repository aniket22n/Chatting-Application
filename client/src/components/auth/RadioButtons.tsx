import { useRecoilValue, useSetRecoilState } from "recoil";
import { atomImage } from "../../store/atoms/image";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

// code for radio butoon to select Gender
export function ControlledRadioButtonsGroup() {
  const value = useRecoilValue(atomImage);
  const setValue = useSetRecoilState(atomImage);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <RadioGroup
      className="radio"
      value={value}
      onChange={handleChange}
      style={{ flexDirection: "row" /* not working from css file*/ }}
    >
      <Typography>Gender - </Typography>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
    </RadioGroup>
  );
}
