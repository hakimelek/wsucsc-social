Template.createMeeting.helpers({
  getContext: function () {
    return {
      // Set html content
      inlineMode: false,

      // Set Input Box height
      heightMin: 270,

      // _value: self.note,
      _keepMarkers: true,
      toolbarInline: true,
      initOnClick: false,
      tabSpaces: false,

      // FE save.before event handler function:
      '_onsave.before': function (e, editor) {
        return false; // Stop Froala Editor from POSTing to the Save URL
      }
    }
  }
});

Template.createMeeting.onRendered(function () {
  $('.datepicker').pickadate({
    format: 'mmmm d, yyyy'
  });
});

Template.createMeeting.events({
  'submit .createMeeting': function (event, template) {
    event.preventDefault();

    var meeting = {
      'title': event.target.title.value,
      'minutes': template.$('div.froala-reactive-meteorized').froalaEditor('html.get', true),
      'date': event.target.date.value,
      'type': event.target.type.value
    }

    return Meteor.call('createMeeting', meeting, function (error, response) {
      if (error) throw error;
      Router.go('meetings');
    });
  }
});

/* Show all meetings */

Template.allMeetings.helpers({
  'meetings': function () {
    return Meetings.find();
  }
});

Template.meeting.helpers({
  date: function () {
    return moment(this.date).fromNow();
  }
});

Template.meeting.events({
  'click .showMeeting': function () {
    Modal.show('showMeeting', this);
  }
});

Template.allMeetings.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('meetings');
  });
});
