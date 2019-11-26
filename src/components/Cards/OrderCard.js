import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

//
import UniTextField from "../Universal/UniTextField";
import UniSelect from "../Universal/UniSelect";
// import LingoSelect 			from '../Special/LingoSelect';
// helpers
// import HttpHelper from '../Helpers/HttpHelper';
// import ValidateHelper from '../Helpers/ValidateHelper';
// import LingoContentHelper from '../Helpers/LingoContentHelper';

function SignupCard(props) {
  const classes = useStyles();

  const [customer, setCustomer] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [pieces, setPieces] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const colors = ["浅枪", "亮银", "白钢"];
  const types = ["镜架", "脚丝", "鼻中"];

  // const content = LingoContentHelper.contentByLang();

  // console.log (`- content: ${JSON.stringify (content)}`);

  // async function onSignUp() {
  //   // console.log (`onSignUp`);

  //   try {
  //     // validate b4 submit
  //     const userArgs = [
  //       { val: password, errmsg: 'password is required', chktype: 'required' },
  //       {
  //         val: password, errmsg: 'password must contain number', chktype: 'regex', regex: /[0-9]/,
  //       },
  //       {
  //         val: password, errmsg: 'password must contain lowercase', chktype: 'regex', regex: /[a-z]/,
  //       },
  //       {
  //         val: password, errmsg: 'password must contain uppercase', chktype: 'regex', regex: /[A-Z]/,
  //       },
  //       {
  //         val: password, errmsg: 'password length less than 5', chktype: 'length', func: len => len > 5,
  //       },

  //       { val: email, errmsg: 'email is required', chktype: 'required' },
  //       {
  //         val: email, errmsg: 'Invalid email', chktype: 'regex', regex: /\S+@\S+\.\S+/,
  //       },

  //       { val: language, errmsg: 'language is required', chktype: 'required' },
  //       {
  //         val: language, errmsg: 'Invalid language', chktype: 'value', func: val => val === 'en-AU' || val === 'en-NZ' || val === 'en-UK' || val === 'en-US',
  //       },

  //       { val: [password, password0], errmsg: 'Passwords entries not the same', chktype: 'diff' },

  //       // already registered  -- temp
  //       {
  //         val: email, errmsg: 'Already Registered', chktype: 'value', func: val => val === 'newuser@serko.com',
  //       },
  //       {
  //         val: password, errmsg: 'Already Registered', chktype: 'value', func: val => val === 'Abc123',
  //       },
  //       {
  //         val: language, errmsg: 'Already Registered', chktype: 'value', func: val => val === 'en-NZ',
  //       },

  //     ];
  //     if (ValidateHelper.validateUserArgs(userArgs)) throw ValidateHelper.validateUserArgs(userArgs);

  //     const postUrl = 'https://serko-engineering-exercises.azurewebsites.net/api/SignUp';
  //     const resobj = await HttpHelper.httpRequestA(postUrl, { email, password, preferredLanguage: language }, 1);
  //     console.log(`- resobj: ${JSON.stringify(resobj)}`);
  //     if (resobj.success) {
  //       authctx.onSignup();
  //       props.history.push('/welcome');
  //     }
  //   } catch (err) {
  //     // console.log (`- err: ${err}`);
  //     HttpHelper.handleGenericErr(err, props);
  //   }
  // }

  return (
    <Card className={classes.card}>
      <UniTextField
        placeholder={"厂家"}
        id="customer"
        onChangeTxt={setCustomer}
      />
      <UniTextField placeholder={"型号"} id="model" onChangeTxt={setModel} />
      <UniSelect
        placeholder={"类型"}
        items={types}
        id="type"
        required
        onChangeTxt={setType}
      />
      <UniSelect
        id="color"
        items={colors}
        required
        placeholder={"镀色"}
        onChangeTxt={setColor}
      />
      <UniTextField
        placeholder={"数量"}
        id="pcs"
        type="number"
        onChangeTxt={setPieces}
      />
      <UniTextField
        placeholder={"单价"}
        id="price"
        type="number"
        onChangeTxt={setPrice}
      />
    </Card>
  );
}

var useStyles = makeStyles({
  card: {
    padding: "35px 0",
    minWidth: 375,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: "30px 0"
  },
  logo: {
    maxWidth: "60px",
    maxHeight: "60px"
  },
  logoView: {
    marginBottom: "60px"
  },
  button: {
    marginTop: "20px",
    width: "80%"
  }
});

export default SignupCard;
