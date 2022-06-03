const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");

const app = express();

//
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "user",
  database: "blogdatabase",
});
mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log("Connected to sql");
});
//

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

//For creating a blog
app.post("/addblog", function (req, res) {
  var sql =
    "insert into blogs(title, content) values ('title data','content data')";
  mysqlConnection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    console.log("record inserted");
  });
  res.send("Added");
});

//For reading all blogs
app.get("/blogs", (req, res) => {
  mysqlConnection.query("select * from blogs", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//For reading a single blog
app.get("/blogs/:id", (req, res) => {
  mysqlConnection.query(
    "select * from blogs where id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

// app.put("/blogs/:id", (req, res) => {
//   var sql = "update blogs set title=?,content=? where id=?";
//   mysqlConnection.query(
//     sql,

//     function (err, rows, fields) {
//       if (err) throw err;
//       console.log("record inserted");
//     }
//   );
//   res.send("Updated Successfully");
// });

app.put("/blogs", (req, res) => {
  let blog = req.body;
  var sql =
    "SET @id = ?;SET @title = ?;SET @content = ?; CALL blogEdit(@id,@title,@content);";
  mysqlConnection.query(
    sql,
    [blog.id, blog.title, blog.content],
    (err, rows, fields) => {
      if (!err) res.send("Learner Details Updated Successfully");
      else console.log(err);
    }
  );
});

//For deleting a blog
app.delete("/blogs/:id", (req, res) => {
  mysqlConnection.query(
    "delete from blogs where id=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Record deleted successfully");
      else console.log(err);
    }
  );
});

app.listen(3000, () => {
  console.log("Running on: 3000");
});
