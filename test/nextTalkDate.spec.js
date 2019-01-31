'use strict';

const assert = require('assert');
const { prevTalkDate, nextTalkDate } = require('../server/util/nextTalkDate.js');

describe('test talk date', () => {

  it('can find the next event date', () => {
    const date = new Date('2019-01-17T00:00:00');
    const next_date = nextTalkDate(date);
    assert.deepEqual(new Date('2019-02-07T00:00:00'), next_date);
  });
  
  it('can find the prev event date', () => {
    const date = new Date('2019-01-17T00:00:00');
    const prev_date = prevTalkDate(date);
    assert.deepEqual(new Date('2018-12-06T00:00:00'), prev_date);
  });
});
