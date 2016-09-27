var NWarrior = {},
		config; 

$.ajax({
	url:'config.json', 
	async: false, 
	type: 'GET', 
	success: function(data) {
		config = data;
	}
});

