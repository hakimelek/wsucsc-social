Meetings = new Mongo.Collection('meetings');

Schema = {};

Schema.Meeting = new SimpleSchema({
  minutes: {
    type: String,
    optional: true
  },
  date: {
    type: Date,
    optional: true
  },
  title: {
    type: String,
    optional: true
  },
  created_At: {
    type: Date,
    optional: true
  },
  board: {
    type: Boolean,
    optional: true
  }
});

Meetings.attachSchema(Schema.Meeting);
