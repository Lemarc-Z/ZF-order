import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
//
import UniTextField from "../Universal/UniTextField";
import UniSelect from "../Universal/UniSelect";

// import LingoSelect 			from '../Special/LingoSelect';
// helpers;
import HttpHelper from "../Helpers/HttpHelper";
import ValidateHelper from "../Helpers/ValidateHelper";
// import LingoContentHelper from '../Helpers/LingoContentHelper';

function OrderCard(props) {
  const classes = useStyles();

  const [customer, setCustomer] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [pieces, setPieces] = useState(0);
  const [price, setPrice] = useState(0);

  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState([]);

  const colors = ["浅枪", "亮银", "白钢"];
  const types = ["镜架", "脚丝", "鼻中"];

  function handleClose() {
    setOpen(false);
  }

  // const content = LingoContentHelper.contentByLang();

  // console.log (`- content: ${JSON.stringify (content)}`);

  async function onSignUp() {
    console.log(`onSignUp`);

    try {
      // validate b4 submit
      const userArgs = [
        { val: customer, errmsg: "厂家必须填写", chktype: "required" },
        { val: pieces, errmsg: "数量必须填写", chktype: "required" },
        { val: price, errmsg: "单价必须填写", chktype: "required" }
      ];
      if (ValidateHelper.validateUserArgs(userArgs))
        throw ValidateHelper.validateUserArgs(userArgs);

      let amount = price * pieces;

      let confirmation0 = [
        { name: "厂家：", val: customer },
        { name: "型号：", val: model },
        { name: "类型：", val: type },
        { name: "镀色：", val: color },
        { name: "数量：", val: pieces },
        { name: "单价：", val: price },
        { name: "价格：", val: amount }
      ];
      console.log(`- confirmation: ${JSON.stringify(confirmation)}`);
      setOpen(true);
      setConfirmation(confirmation0);
      // console.log(`- selectedValue: ${JSON.stringify(selectedvalue)}`);
      //   const postUrl = 'https://serko-engineering-exercises.azurewebsites.net/api/SignUp';
      //   const resobj = await HttpHelper.httpRequestA(postUrl, { email, password, preferredLanguage: language }, 1);
      //   console.log(`- resobj: ${JSON.stringify(resobj)}`);
      //   if (resobj.success) {
      //     authctx.onSignup();
      //     props.history.push('/welcome');
      //   }
    } catch (err) {
      console.log(`- err: ${err}`);
      HttpHelper.handleGenericErr(err, props);
    }
  }

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
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onSignUp}
      >
        <b>提 交</b>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <List>
            {confirmation.map(item => (
              <ListItemText
                disableTypography
                primary={item.name}
                secondary={item.val}
                className={classes.inline}
              />
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            确 认
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            取 消
          </Button>
        </DialogActions>
      </Dialog>
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
  button: {
    marginTop: "20px",
    width: "80%"
  },
  inline: {
    display: "flex",
    flexDirection: "row",
    padding: "10px 24px"
  }
});

export default OrderCard;
