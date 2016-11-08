module.exports = {
  "extends": "standard",
  "plugins": [
      "standard",
      "promise"
  ],
  "rules": {
    "semi": [0],
    "curly": [0],
    "no-native-reassign": ["error", {"exceptions": ["adminController",
                                                    "emailsController",
                                                    "membersController",
                                                    "projectsController",
                                                    "Schema",
                                                    "Messages",
                                                    "Roles",
                                                    "Projects",
                                                    "Emails",
                                                    "Meetings"]}]
  },
  "globals": {
    // Templates

    "Meteor": false,
    "Session": false,
    "Template": false,
    "SimpleSchema": false,
    "AccountsTemplates": false,
    "RouteController": false,
    "Schema": false,
    "SSR": false,

    // Collections

    "Messages": false,
    "Emails": false,
    "Roles": false,
    "Projects": false,
    "Meetings": false,

    // Controllers

    "adminController": false,
    "emailsController": false,
    "membersController": false,
    "projectsController": false,
    "meetingsController": false,

    // Packages

    "moment": false
  },
  "env": {
    "meteor": true,
    "browser": true,
    "node": true
  }
};
