import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
//
import UniTextField from "../Universal/UniTextField";
import UniSelect from "../Universal/UniSelect";

// helpers;
import HttpHelper from "../Helpers/HttpHelper";
import ValidateHelper from "../Helpers/ValidateHelper";

function OrderCard(props) {
  let classes = useStyles();

  let [customer, setCustomer] = useState("");
  let [orderNum, setOrderNum] = useState("");
  let [model, setModel] = useState("");
  let [type, setType] = useState("");
  let [color, setColor] = useState("");
  let [pieces, setPieces] = useState(0);
  let [price, setPrice] = useState(0);
  let [remark, setRemark] = useState("");

  let [open, setOpen] = useState(false);
  let [confirmation, setConfirmation] = useState([]);

  let [client, setCient] = useState("");
  let [year, setYear] = useState("");
  let [month, setMonth] = useState("");

  let colors = ["浅枪", "亮银", "白钢"];
  let types = ["镜架", "脚丝", "鼻中"];
  let clientList = ["南平", "鹏延", "其他"];
  let yrList = ["2019", "2020"];
  let monthList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];

  function handleClose() {
    setOpen(false);
  }

  async function handleCfm() {
    setOpen(false);
    try {
      let postUrl = "http://localhost:3000/ticket";

      let amount;
      if (type === "脚丝") amount = (price * pieces) / 3;
      else if (type === "鼻中") amount = (price * pieces) / 4;
      else if (type === "镜架") amount = price * pieces;
      else throw `类型不对`; // does not double - cfm on back end

      let postData = {
        order_num: orderNum,
        customer,
        model,
        type,
        color,
        pieces,
        price,
        amount,
        remark
      };

      let resobj = await HttpHelper.httpRequestA(postUrl, postData, 1);
      console.log(`- resobj: ${JSON.stringify(resobj)}`);
      if (resobj.success) {
        console.log(`- resobj: success}`);
      }
    } catch (err) {
      console.log(`- err: ${err}`);
      HttpHelper.handleGenericErr(err, props);
    }
  }

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

      let amount;
      if (type === "脚丝") amount = (price * pieces) / 3;
      else if (type === "鼻中") amount = (price * pieces) / 4;
      else if (type === "镜架") amount = price * pieces;
      else throw `类型不对`;

      let confirmation0 = [
        { name: "单号：", val: orderNum },
        { name: "厂家：", val: customer },
        { name: "型号：", val: model },
        { name: "类型：", val: type },
        { name: "镀色：", val: color },
        { name: "数量：", val: pieces },
        { name: "单价：", val: price },
        { name: "价格：", val: amount }
      ];
      if (remark) Object.assign (remark, confirmation0);
      console.log(`- confirmation: ${JSON.stringify(confirmation)}`);
      setOpen(true);
      setConfirmation(confirmation0);
      // console.log(`- selectedValue: ${JSON.stringify(selectedvalue)}`);
      // const postUrl = "localhost:3001/login";
      // const resobj = await HttpHelper.httpRequestA(postUrl, confirmation0, 1);
      // console.log(`- resobj: ${JSON.stringify(resobj)}`);
      // if (resobj.success) {
      //   authctx.onSignup();
      //   props.history.push("/welcome");
      // }
    } catch (err) {
      console.log(`- err: ${err}`);
      HttpHelper.handleGenericErr(err, props);
    }
  }

  async function onGetMonthlyReport() {
    console.log(`onGetMonthlyReport`);

    try {
      let url = "http://localhost:3001/report";

      let postData = {
        client,
        year,
        month
      };

      let resobj = await HttpHelper.httpRequestA(url, postData, 1);
    } catch (err) {
      console.log(`- err: ${err}`);
      HttpHelper.handleGenericErr(err, props);
    }
  }

  return (
    <div>
      <Card className={classes.card}>
        <UniTextField
          placeholder={"单号"}
          id="ordernum"
          onChangeTxt={setOrderNum}
        />
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
        <UniTextField
          placeholder={"备注"}
          id="remark"
          onChangeTxt={setRemark}
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
            <Button onClick={handleCfm} color="primary">
              确 认
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              取 消
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
      <Card className={classes.card}>
        <div className={classes.inline}>
          <UniSelect
            placeholder={"厂家"}
            items={clientList}
            id="client"
            required
            onChangeTxt={setCient}
          />
          <UniSelect
            placeholder={"年份"}
            items={yrList}
            id="year"
            required
            onChangeTxt={setYear}
          />
          <UniSelect
            placeholder={"月份"}
            items={monthList}
            id="month"
            required
            onChangeTxt={setMonth}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onGetMonthlyReport}
        >
          <b>生成月报表</b>
        </Button>
      </Card>
    </div>
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
    marginTop: "30px"
  },
  button: {
    marginTop: "20px",
    width: "80%"
  },
  inline: {
    display: "flex",
    flexDirection: "row",
    padding: "0 24px"
  }
});

export default OrderCard;
