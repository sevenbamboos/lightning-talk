'use strict';
module.exports = app => {
  const topics = require('./topicController');

  // topics Routes
  app.route('/topics/next_talk')
    .get(topics.next_talk_date);

  app.route('/topics')
    .get(topics.list_all)
    .post(topics.create_new);
   
  app.route('/topics/:id')
    .get(topics.get_one)
    // TODO
    // .put(topics.update_one)
    .delete(topics.delete_one);

};
