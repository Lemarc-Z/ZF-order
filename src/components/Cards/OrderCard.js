import React, { useState } from "react";
import { CSVLink } from "react-csv";
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
  let [pieces, setPieces] = useState("");
  let [price, setPrice] = useState("");
  let [remark, setRemark] = useState("");

  let [open, setOpen] = useState(false);
  let [succeed, setSucceed] = useState(false);
  let [confirmation, setConfirmation] = useState([]);
  let [csvData, setCsvData] = useState();
  let [genCsv, setGenCsv] = useState(0);

  let [client, setCient] = useState("");
  let [year, setYear] = useState("");
  let [month, setMonth] = useState("");

  let [warningTxt, setWarningTxt] = useState("");

  let colors = [
    "浅枪",
    "亮银",
    "白钢",
    "IP金",
    "深枪",
    "彩色",
    "不锈钢",
    "其他"
  ];
  let types = ["镜架", "脚丝", "鼻中", "其他"];
  let clientList = ["南平", "鹏延", "高尚", "其他"];
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

  function handleSucceed() {
    setWarningTxt("");
    setSucceed(false);
  }

  function onDownloadReport() {
    setGenCsv(0);
    setCient("");
    setYear("");
    setMonth("");
  }

  async function handleCfm() {
    setOpen(false);
    try {
      let postUrl = "/api/ticket";

      let amount;
      if (type === "脚丝") amount = (price * pieces) / 3;
      else if (type === "鼻中") amount = (price * pieces) / 4;
      else amount = price * pieces;
      // else throw `类型不对`; // does not double - cfm on back end

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
        console.log(`- resobj: success`);
        setWarningTxt(`录入成功`);
        setSucceed(true);
        setOrderNum("");
        setCustomer("");
        setModel("");
        setType("");
        setColor("");
        setPieces("");
        setPrice("");
        setRemark("");
        setConfirmation([]);
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
      let userArgs = [
        { val: customer, errmsg: "厂家必须填写", chktype: "required" },
        { val: pieces, errmsg: "数量必须填写", chktype: "required" },
        { val: price, errmsg: "单价必须填写", chktype: "required" }
      ];
      if (ValidateHelper.validateUserArgs(userArgs))
        throw ValidateHelper.validateUserArgs(userArgs);

      let amount;
      if (type === "脚丝") amount = (price * pieces) / 3;
      else if (type === "鼻中") amount = (price * pieces) / 4;
      else amount = price * pieces;

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
      if (remark) confirmation0.push(remark);
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
      // validate b4 submit
      let userArgs = [
        { val: client, errmsg: "请先选择厂家", chktype: "required" },
        { val: year, errmsg: "请先选择年份", chktype: "required" },
        { val: month, errmsg: "请先选择月份", chktype: "required" }
      ];
      if (ValidateHelper.validateUserArgs(userArgs))
        throw ValidateHelper.validateUserArgs(userArgs);
      let url = "/api/report";

      let postData = {
        client,
        year,
        month
      };

      let resobj = await HttpHelper.httpRequestA(url, postData, 1);

      // console.log(`- resobj.csv_data: ${JSON.stringify(resobj.csv_data)}`);
      if (resobj.csv_data.length > 1) {
        setCsvData(resobj.csv_data);
        setTimeout(() => {
          setGenCsv(1);
        }, 3000);
      } else {
        setWarningTxt(`当月无数据`);
        setSucceed(true);
      }
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
          value={orderNum}
        />
        <div className={classes.inline}>
          <UniSelect
            placeholder={"厂家选择"}
            items={clientList.slice(0, -1)}
            id="client"
            required
            onChangeTxt={setCustomer}
            value={customer}
          />
          <UniTextField
            placeholder={"厂家填写"}
            id="customer"
            onChangeTxt={setCustomer}
            value={customer}
          />
        </div>
        <UniTextField
          placeholder={"型号"}
          id="model"
          onChangeTxt={setModel}
          value={model}
        />
        <UniSelect
          placeholder={"类型"}
          items={types}
          id="type"
          required
          onChangeTxt={setType}
          value={type}
        />
        <UniSelect
          id="color"
          items={colors}
          required
          placeholder={"镀色"}
          onChangeTxt={setColor}
          value={color}
        />
        <UniTextField
          placeholder={"数量"}
          id="pcs"
          type="number"
          onChangeTxt={setPieces}
          value={pieces}
        />
        <UniTextField
          placeholder={"单价"}
          id="price"
          type="number"
          onChangeTxt={setPrice}
          value={price}
        />
        <UniTextField
          placeholder={"备注"}
          id="remark"
          onChangeTxt={setRemark}
          value={remark}
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
        <Dialog open={succeed}>
          <DialogContent>{warningTxt}</DialogContent>{" "}
          <DialogActions>
            <Button onClick={handleSucceed} color="primary">
              确 认
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
            value={client}
          />
          <UniSelect
            placeholder={"年份"}
            items={yrList}
            id="year"
            required
            onChangeTxt={setYear}
            value={year}
          />
          <UniSelect
            placeholder={"月份"}
            items={monthList}
            id="month"
            required
            onChangeTxt={setMonth}
            value={month}
          />
        </div>
        {genCsv ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onDownloadReport}
          >
            <CSVLink
              data={csvData}
              target="_blank"
              filename={`振峰-${client}${year}年${month}月账单.xls`}
            >
              下载报表
            </CSVLink>
          </Button>
        ) : null}
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
    padding: "20px 0",
    minWidth: 375,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10px"
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
