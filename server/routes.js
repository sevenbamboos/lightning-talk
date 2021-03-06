'use strict';
module.exports = app => {
  const topics = require('./topicController');

  // topics Routes
  app.route('/topics_next_talk')
    .get(topics.next_talk_date);

  app.route('/topics_available')
    .get(topics.list_available);

  app.route('/topics')
    .get(topics.list_all)
    .post(topics.create_new);
   
  app.route('/topics/:id')
    .get(topics.get_one)
    .put(topics.update_one)
    .delete(topics.delete_one);

};
