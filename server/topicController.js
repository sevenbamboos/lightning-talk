'use strict';

const { Topic } = require('./model');
const { prevTalkDate, nextTalkDate } = require('./util/nextTalkDate');

exports.next_talk_date = (_, res) => {
  console.log('next_talk_date in controller');
  res.json({date: nextTalkDate(new Date())});
};

exports.list_all = (_, res) => {
  Topic.findAll((err, topics) => {
    if (err) res.send(err);
    console.log('res', topics);
    res.send(topics);
  });
};

exports.list_available = (_, res) => {
  Topic.findAllForNextTalk(prevTalkDate(), (err, topics) => {
    if (err) res.send(err);
    console.log('res', topics);
    res.send(topics);
  });
};

exports.create_new = (req, res) => {
  const {title, description, email} = req.body;
  const new_topic = new Topic(title, description, email);
  
  new_topic.ip_addr = req.ip;
  new_topic.host_name = req.hostname;
  new_topic.browser_name = req.browser.name;
  new_topic.os_name = req.browser.os;

  //handles null error 
  if(!new_topic.title || !new_topic.email) {
    res.status(400).send({ error:true, message: 'Please provide title/email' });
  } else {
    new_topic.create((err, topic) => {
      if (err) res.send(err);
      res.json(topic);
    });
  }
};

exports.update_one = (req, res) => {

  const {id, title, description, email} = req.body;

  Topic.load(id, (err, topic) => {
    if (err) res.send(err);
    if (!topic || topic.length > 1) res.send({error: true, message: `none or not unique for topic with id ${id}`});
    else {
      const updatedTopic = Object.assign(new Topic(title, description, email), topic[0], {id, title, description, email});
      console.log('updatedTopic:', updatedTopic);
      updatedTopic.save((error, topic) => {
        if (error) res.send(error);
        res.json(topic);
      });
    }
  });
};

exports.get_one = (req, res) => {
  Topic.load(req.params.id, (err, topic) => {
    if (err) res.send(err);
    if (!topic) res.json({});
    else if (topic.length > 1) res.send({error: true, message: `more than one topic with id ${req.params.id}`});
    else res.json(topic[0]);
  });
};

exports.delete_one = (req, res) => {
  Topic.delete(req.params.id, (err, topic) => {
    if (err) res.send(err);
    res.json({ message: 'Topic successfully deleted' });
  });
};
