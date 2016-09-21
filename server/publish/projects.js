Meteor.publish("userProjects", function (ownerId){
  return Projects.find({ownerId: ownerId});
});

Meteor.publish("project", function (projectId){
  return Projects.find({_id: projectId});
});