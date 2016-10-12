Emails = new Mongo.Collection('emails');

Schema = {};

Schema.Email = new SimpleSchema({
  to: {
    type: [String],
    optional: true
  },
  from: {
    type: String,
    defaultValue: 'wsucsc@gmail.com',
    optional: true
  },
  subject: {
    type: String,
    optional: true
  },
  html: {
    type: String,
    optional: true
  },
  sendAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  }
});

Emails.attachSchema(Schema.Email);
