import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
// helpers
// import HttpHelper from "../Helpers/HttpHelper";
// import ValidateHelper from '../Helpers/ValidateHelper';

function UniSelect(props) {
  let classes = useStyles();

  let { placeholder, onChangeTxt, id, items } = props;

  let [value, setValue] = useState("");
  // const [helperText, setHelperText] = useState("");

  function onChangeVal(event) {
    setValue(event.target.value);
    onChangeTxt(event.target.value);
  }

  // function onBlurAndValidate() {
  //   const 	retErrMsg 		= ValidateHelper.checkTypeAndValidate(type, value);
  //   if (retErrMsg) {
  //     setError(true);
  //     setHelperText(retErrMsg);
  //   } else {
  //     setError(false);
  //     setHelperText('');
  //   }
  // }

  // async function onGetLanguages() {
  //   try {
  //     const getUrl = 'https://serko-engineering-exercises.azurewebsites.net/api/Languages';
  //     const resobj = await HttpHelper.httpRequestA(getUrl, {}, 0);
  //     // console.log (`- resobj: ${JSON.stringify (resobj)}`);
  //     setLanguages(resobj.languages);
  //   } catch (err) {
  //     // console.log (`- err: ${err}`);
  //     HttpHelper.handleGenericErr(err, props);
  //   }
  // }

  return (
    <FormControl className={classes.textField}>
      <InputLabel>{placeholder}</InputLabel>
      <Select
        className={classes.select}
        id={id}
        value={value}
        onChange={onChangeVal}
        variant="standard"
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: { vertical: "bottom", horizontal: "left" }
        }}
      >
        {items.map(item => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

var useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "80%"
  },
  select: {
    textAlign: "left"
  }
}));

export default UniSelect;
