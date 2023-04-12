import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const DropDown = React.forwardRef((props: any, ref: any) => {
  const [menuItem, setMenuItem] = React.useState('');

  React.useImperativeHandle(ref, () => ({
    autoSelectDropDown() {
      
      if(menuItem.length>0)
      setMenuItem(menuItem[0] as string )
    },
}));

  const handleChange = (event: SelectChangeEvent) => {
    console.log("event.target.value ",event.target.value);
    setMenuItem(event.target.value as string);
    props.setSelectedMenuItem(event.target.value)
  };

  return (
    <Box sx={{ minWidth: 220 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Applications</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={menuItem}
          label="Applications"
          onChange={handleChange}
        >
          {props.menuItems?.map((item:string,inde:any)=>(<MenuItem key={inde} value={item} >{item}</MenuItem>))}
        </Select>
      </FormControl>
    </Box>
  );
})
DropDown.displayName = 'DropDown';
export default React.memo(DropDown);