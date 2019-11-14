
	// To access Marvel's Public API
		const public_key = "74e2999625dc86ce7eb5f9dd6e589b17";
		const private_key = "c1151fbc71cde5b20437b7c674767b779ead65ee";
		const url ="https://gateway.marvel.com:443/v1/public/characters?"
		var ts = Date.now();
		var hash = CryptoJS.MD5(ts + private_key + public_key).toString();

	// When changing character input
		$("#character").on("change", function() {
			var characterName = $("#character").val().toLowerCase().replace(/\s/g,'');
			let seriesInfo = [];

			console.log("Character Name : " + characterName);

			$("#list_of_comics").html("<h3> List of series related to this character </h3> \n<h4>Character Name : " + characterName + '</h4>\n\n<ul id="series-list"></ul>\n\n');

			"<h4>Character Name : " + characterName + "</h4>\n\n";
			'<ul id="series-list"></ul>\n\n';

			$("#list_of_comics").append("<h4>Character Name : " + characterName + "</h4>\n\n");
			$("#list_of_comics").append('<ul id="series-list"></ul>\n\n');

			$.ajax({
				url : "https://gateway.marvel.com:443/v1/public/characters?name=" + characterName + "&ts=" + ts + "&apikey=74e2999625dc86ce7eb5f9dd6e589b17&hash=" + hash,// + "&limit=" + limit + "&offset=" + offset,
				dataType : "json",
				success : function(result, status){

					var charID = result.data.results[0].id
					

					console.log("Character ID : " + charID);

					var offset = 0;
					let seriesInfo = [];
					for(var j = 0; j < 10; j++)
					{
						$.ajax({
							url : "https://gateway.marvel.com:443/v1/public/characters/"+charID+"/series?&limit=100&offset=" + offset + "&ts=" + ts + "&apikey=74e2999625dc86ce7eb5f9dd6e589b17&hash=" + hash,
							dataType : "json",
							success : function(result, status){
								//console.log(result.data)

								var total = result.data.total
								var dataObject = result.data
								//console.log(dataObject)

								//console.log("COUNT : " + dataObject.count)
								// Limit is 100. Need to iterate through 100 objects
								for(var i = 0; i < dataObject.count ; i++)
								{	
										if (dataObject.count != 0)
										{
											seriesInfo.push(dataObject.results[i] );
											$("#series-list").append('<li>' + dataObject.results[i].title + '</li>')
										} else {
											alert("Unable to find the character");
											exit(); 
										}
								}
								console.log(seriesInfo);
							}
						})
						offset += 100;
					}
				}

			})
		})		

	
