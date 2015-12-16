if (Meteor.isServer) {

  Meteor.startup(function () {

    if (Members.find().count() === 0) {
      var members = [];

    for (var i = 0; i < members.length; i++)
      Members.insert(members[i]);
    }

    Meteor.publish("members", function () {
      return Members.find({
        $or: [
          {
            $and: [
              {"public": true},
              {"public": {$exists: true}}
            ]
          },
          {
            $and: [
              {owner: this.userId},
              {owner: {$exists: true}}
            ]
          }
        ]
      });
    });
  });
}


