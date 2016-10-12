Messages = new Meteor.Collection('messages');

Schema = {};

Schema.Message = new SimpleSchema({
  senderId: {
    type: String,
    optional: true
  },
  text: {
    type: String,
    optional: true
  },
  createdAt: {
    type: new Date(),
    optional: true
  }
});

Messages.attachSchema(Schema.Message);
