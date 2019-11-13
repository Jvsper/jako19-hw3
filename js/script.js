
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

			$("#list_of_comics").append("<h3> List of series related to this character </h3>");
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

								// Limit is 100. Need to iterate through 100 objects
								for(var i = 0; i < 100 ; i++)
								{	
										if (dataObject.count != 0)
										{
											seriesInfo.push(dataObject.results[i] );
											console.log("Date Object : " +  dataObject.results[i].title);
											$("#series-list").append('<li>' + dataObject.results[i].title + '</li>')
										} 
								}

									//var seriesInfo = result.data.results
									//console.log(result.data);
									
								/*
								for (let i = 0; i < total; i++)
								{
									//console.log(seriesInfo[i].title)
									//$("#table").append('<tr><td>' + seriesInfo[i].title + '</td></tr>')
									$("#table").append(seriesInfo[i].title + '\n')
								}
								*/
							}
						})
						offset += 100;
					}
				}
				

			})
			/*
				console.log(seriesInfo.length);

				for(var i = 0; i < seriesInfo.length ; i++)
				{
					console.log(seriesInfo.length);
				}
				*/

		})		

	
