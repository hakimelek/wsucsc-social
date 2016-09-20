Template.message.helpers({
  timestamp: function () {
    var now = this;
    return moment(now.createdAt).fromNow();
  },
  user: function () {
    return Meteor.users.findOne({_id: this.senderId}, {fields: {profile: 1}});
  },
  messageSent: function () {
    return this.senderId == Meteor.userId();
  }
});

Template.message.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('usersById', self.data.senderId);
  });
})


Template.input.events = {
  'click .sendMessage' : function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      var message = $('.').value;
      Meteor.call("sendMessage", message);
      event.target.message.value = "";
  },

  'keypress input.chat_input': function (e, tmpl) {
    if (e.which !== 13) return;
    e.preventDefault();
  },

  'keyup input.chat_input': function (e, tmpl) {
    var input = tmpl.find('.chat_input').value;
    if (!input) return;

    if (e.which !== 13) return;
    e.preventDefault();

    Meteor.call('sendMessage', input, function (error, response) {
      if (error) throw error;
      tmpl.find('.chat_input').value = '';
      setTimeout(function () {
        $(".msg_container_base").animate({ scrollTop: $('.msg_container_base').prop("scrollHeight")}, 250);
      }, 200);
    });
  }
};


Template.chat.helpers({
  messages: function() {
    return Messages.find({}, { sort: { createdAt: 1}});
  },
  moreResults: function () {
    return !(Messages.find().count() < Session.get("itemsLimit"));
  }
});

var ITEMS_INCREMENT = 20;
Session.setDefault('itemsLimit', ITEMS_INCREMENT);

// whenever #showMoreResults becomes visible, retrieve more results
// function showMoreVisible() {
//     var threshold, target = $("#showMoreResults");
//     if (!target.length) return;

//     threshold = $(window).scrollTop() + $(window).height() - target.height();

//     if (target.offset().top < threshold) {
//         if (!target.data("visible")) {
//             // console.log("target became visible (inside viewable area)");
//             target.data("visible", true);
//             Session.set("itemsLimit",
//                 Session.get("itemsLimit") + ITEMS_INCREMENT);
//         }
//     } else {
//         if (target.data("visible")) {
//             // console.log("target became invisible (below viewable arae)");
//             target.data("visible", false);
//         }
//     }
// }

// run the above func every time the user scrolls
// $(window).scroll(showMoreVisible);

Template.chat.onCreated(function () {
  var self = this;
  self.autorun(function () {
    self.subscribe('messages', Session.get('itemsLimit'));
  });

  var query = Messages.find();
  query.observeChanges({
    added: function(id, fields) {
      setTimeout(function () {
        $(".msg_container_base").animate({ scrollTop: $('.msg_container_base').prop("scrollHeight")}, 250);
      }, 200);
    }
  });

});

Template.chat.onRendered(function (){

  $(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        setTimeout(function () {
          $(".msg_container_base").animate({ scrollTop: $('.msg_container_base').prop("scrollHeight")}, 250);
        }, 200);
    }
  });
  $(document).on('focus', '.panel-footer input.chat_input', function (e) {
      var $this = $(this);
      if ($('#minim_chat_window').hasClass('panel-collapsed')) {
          $this.parents('.panel').find('.panel-body').slideDown();
          $('#minim_chat_window').removeClass('panel-collapsed');
          $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
      }
  });
});


