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
    this.os_name = '';
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

  static findAll(result) {
    sql.query("SELECT * FROM topics", (err, res) => {             
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });   
  }

  static findAllForNextTalk(pre_talk_time, result) {
    console.log('find topics after ', pre_talk_time);
    sql.query("SELECT * FROM topics WHERE talk_time > ?", pre_talk_time, (err, res) => {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });   
  }

  save(result) {
    const params = [this.title, this.description, this.email, this.id];
    sql.query("UPDATE topics SET title = ?, description = ?, email = ? WHERE id = ?", params, (err, res) => {
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
