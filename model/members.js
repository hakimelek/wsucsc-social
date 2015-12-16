Members = new Mongo.Collection("members");

Members.allow({
	insert: function(userId, member){
		return userId && member.owner == userId; 
	},
	update: function(userId, member, fields, modifier){
		if(userId != member.owner)
			return; 
		return true; 
	}, 
	remove: function(userId, member){
		if(userId != member.owner)
			return; 
		return true; 
	}
}); 