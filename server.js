var Koa = require("koa");
var compress = require("koa-compress");
var helmet = require("koa-helmet");
var logger = require("koa-logger");

var app = new Koa();
app.use(helmet());
app.use(compress());

app.use(logger());

// Serve the static files from the build folder
app.use(express.static(__dirname + "/build"));
//app.use('/material-dashboard-react', express.static(__dirname + "/build"));
// Redirect all traffic to the index
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/build/index.html");
});
// Listen to port 3000
app.listen(process.env.PORT || 3000);
