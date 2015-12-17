if (Meteor.isServer) {

  Meteor.startup(function () {

    // if (Members.find().count() === 0) {
    //   var members = [
    //      {  
    //           'firstName': 'Alisa',     
    //           'lastName': 'Zhukova',     
    //           'email': 'azhukova@gmail.com'  
    //       }
    //   ];

    // for (var i = 0; i < members.length; i++)
    //   Members.insert(members[i]);
    // }

    Meteor.publish("members", function (options, searchString) {
      if(searchString==null){
          searchString = '';
      }

      Counts.publish(this, 'numberOfMembers', Members.find({
        'firstName' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
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
            ]}
        ]
      }), {noReady: true});

      return Members.find({
        'firstName' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },

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
      }, options);
    });
  });
}


