'user strict';
const sql = require('./db.js');
const { nextTalkDate } = require('./util/nextTalkDate');

class Topic {
  constructor(title, description, email) {
    this.title = title;
    this.description = description;
    this.email = email;

    this.created_at = new Date();
    this.talk_time = nextTalkDate(this.created_at);

    this.ip_addr = '';
    this.host_name = '';
    this.browser_name = '';
  }

  create(result) {
    sql.query("INSERT INTO topics set ?", this, (err, res) => {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });           
  }

  static load(id, result) {
    sql.query("SELECT * FROM topics WHERE id = ?", id, (err, res) => {             
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });   
  }

  static findAll(talk_time, result) {
    // TODO find by talk_time
    //sql.query("SELECT * FROM topics WHERE talk_time = ?", talk_time, (err, res) => {             
    sql.query("SELECT * FROM topics", (err, res) => {             
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });   
  }

  // TODO save more properties
  save(result) {
    sql.query("UPDATE topics SET title = ?, description = ? WHERE id = ?", this.title, this.description, this.id, (err, res) => {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });           
  }

  static delete(id, result) {
    sql.query("DELETE FROM topics WHERE id = ?", [id], (err, res) => {             
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });   
  }
}

module.exports = { Topic, };
