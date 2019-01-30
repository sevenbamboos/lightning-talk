'use strict';

const { Topic } = require('./model');

exports.list_all = (req, res) => {
  Topic.findAll(null, (err, topics) => {
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
