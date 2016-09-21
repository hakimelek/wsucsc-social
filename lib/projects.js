Projects = new Mongo.Collection('projects');

Schema = {};

Schema.Project = new SimpleSchema({
    name: {
      type : String,
      optional: true
    },
    description: {
      type: String,
      optional: true
    },
    ownerId: {
      type: String,
      optional: true
    },
    collaborators: {
      type: [String],
      optional: true
    },
    createdAt: {
      type: new Date(),
      optional: true
    },
    closedAt: {
      type: new Date(),
      optional: true
    }
});

Projects.attachSchema(Schema.Project);