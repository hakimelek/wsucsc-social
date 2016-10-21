Meteor.publish('userProjects', function (ownerId) {
  return Projects.find({ownerId: ownerId});
});

Meteor.publish('allProjects', function (projectId) {
  return Projects.find();
});

Meteor.publishComposite('project', function (projectId) {
  return {
    find: function () {
      // Find top ten highest scoring posts
      return Projects.find({_id: projectId});
    },
    children: [
      {
        find: function (project) {
          // Find post author. Even though we only want to return
          // one record here, we use "find" instead of "findOne"
          // since this function should return a cursor.
          return Meteor.users.find({_id: {$in: project.collaborators}});
        }
      }
    ]
  }
});
