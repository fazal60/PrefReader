
	function categorygrab(id)
	{
		//alert(id);
		var categoryname = document.getElementById(id).firstChild.getAttribute("value");
		var copyrightname = document.getElementById(id).childNodes[1].getAttribute("value");
		$.ajax({
			type: "POST",
			url: "CategoryCatcherServlet",
			data: "category="+categoryname+"&id="+id+"&copyright="+copyrightname,
			 success: function(msg){				 
			    
            },
            error: function(){
                alert("failure");
            }
		});
	}
	
	function suggestionclicked(suggestion)
	{
		$.ajax({
			type: "POST",
			url: "SearchServlet",
			data: "searchterms="+suggestion,
			 success: function(msg){
				 var categoryarray = ["sports","politics","business","opinion","technology","health","arts","lifestyle","food","travel"];
				 //$("article#searchresultsarticle").show();
				 //$("article#hottopicsarticle").animate({top:"50px",right:"40%",width:"40%"});
				 //$("article#searchresultsarticle").fadeIn().css({top:1000,position:'absolute'}).animate({top:"50px",left:"480px", width:"55%"});
				 //var f=0;
				 //if(msg.indexOf("suggestions")>-1){f=1;}
				 var splitdata = msg.split('},');
				 
					for (var i=0;i<splitdata.length;i++)
					{
						//if(f==0)
							splitdata[i] = splitdata[i].substring(splitdata[i].indexOf(":")+1,splitdata[i].length);
						if(i<(splitdata.length-1))
					    	var json = $.parseJSON(splitdata[i]+"}");
						else{
							var json = $.parseJSON(splitdata[i].replace("}}","}"));}
						//var suggestions = json.suggestions;
						//if (suggestions=="undefined"){
						    var title = json.title;
						    var id = json.id;
						    var copyright = json.copyright;
						    var weblink = json.weblink;
						    var content = json.content;
						    var category = json.category;
						    var copyright = json.copyright;
						    var setcategory = "";
						    var f="";
						    for(var j=0;j<categoryarray.length;j++){
							    if(String(category).toLowerCase().indexOf(categoryarray[j])>-1){
							    	setcategory = setcategory + f + categoryarray[j];
							    	f=", ";
							    }
						    }
						    
						    //var version = json._version_;
						    if($.trim(weblink).length===0){
						    	weblink="PageCreate?id="+id;
							}
						    
						    var hot = $('#searchresults').html();
						    if(i==0 && setcategory!="")
						    	$('#searchresults').html("<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a>&nbsp;&nbsp;<i>Category: "+setcategory+"</i></br>"+copyright+"</br>"+content+"</br></br>");
						    else if(i>0 && setcategory!="")
						    	$('#searchresults').html(hot+"<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a>&nbsp;&nbsp;<i>Category: "+setcategory+"</i></br>"+copyright+"</br>"+content+"</br></br>");
						    else if(i==0 && setcategory=="")
						    	$('#searchresults').html("<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a></br>"+copyright+"</br>"+content+"</br></br>");
						    else if(i>0 && setcategory=="")
						    	$('#searchresults').html(hot+"<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a></br>"+copyright+"</br>"+content+"</br></br>");
						//}
						/* else
							{
							suggestions1 = suggestions.split(',');alert(suggestions1.length);
							for(var i=0;i<suggestions1.length;i++){
								var searchdiv = $('#searchresults').html();
								if(i==0)
									$('#searchresults').html("Did you mean: <a onclick=\"suggestionclicked('"+suggestions1[i]+"');\" id=\""+suggestions1[i]+"\">"+suggestions1[i]+"</a>");
								else
									$('#searchresults').html(searchdiv+", <a onclick=\"suggestionclicked('"+suggestions1[i]+"');\" id=\""+suggestions1[i]+"\">"+suggestions1[i]+"</a>");
							}
							} */
					}
							$("#searchterms").val(suggestion);
				 
			    //$("#searchresults").html(msg);
            },
            error: function(){
                alert("failure");
            }
		});
	}
	
	
	$(document).ready(function(){
		$("article#searchresultsarticle").hide();
		$.ajax({
			type: "POST",
			url: "HotTopics",
			data: "time="+$.now(),
			 success: function(data){
				 if($.trim(data)==="Logged Out"){
					 window.location.href="index.html";
				 }
			 else{
				 var categoryarray = ["sports","politics","business","opinion","technology","health","arts","lifestyle","food","travel"];
				 
				 var splitdata = data.split('},');
				for (var i=0;i<11;i++)
				{
					
					var id;
					if(i==0){
						id=splitdata[i].substring(2,splitdata[i].indexOf(":")-1).trim();
					}else{
						id=splitdata[i].substring(1,splitdata[i].indexOf(":")-1).trim();
					}
					
					//alert(id);
					splitdata[i] = splitdata[i].substring(splitdata[i].indexOf(":")+1,splitdata[i].length);
					if(i<(splitdata.length-1))
				    	var json = $.parseJSON(splitdata[i]+"}");
					else
						var json = $.parseJSON(splitdata[i].replace("}}","}"));
				    var title = json.title;
				    
				    var copyright = json.copyright;
				    var weblink = json.weblink;
				    var content = json.content;
				    var category = json.category;
				    //category=category.toLowerCase();
				    //alert(category.indexOf("sports"));
				    var setcategory = "";
				    var f="";
				    for(var j=0;j<categoryarray.length;j++){
					    if(String(category).toLowerCase().indexOf(categoryarray[j])>-1){
					    	setcategory = setcategory + f + categoryarray[j];
					    	f=", ";
					    }
				    }
				    
				    if($.trim(weblink).length===0){
				    	weblink="PageCreate?id="+id;
					}
				    
				    /* var version = json._version_; */
				    var hot = $('#hottopics').html();
				    if(i==0 && setcategory!="")				    	
				    	$('#hottopics').html("<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a>&nbsp;&nbsp;<i>Category: "+setcategory+"</i></br>"+copyright+"</br>"+content+"</br></br>");
				    else if(i>0 && setcategory!="")
				    	$('#hottopics').html(hot+"<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a>&nbsp;&nbsp;<i>Category: "+setcategory+"</i></br>"+copyright+"</br>"+content+"</br></br>");
				    else if(i==0 && setcategory=="")
				    	$('#hottopics').html("<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a></br>"+copyright+"</br>"+content+"</br></br>");
				    else if(i>0 && setcategory=="")
				    	$('#hottopics').html(hot+"<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a></br>"+copyright+"</br>"+content+"</br></br>");
				}
            }
            },
            error: function(){
                alert("failure!");
            }
		}), 
		$.ajax({
			type: "POST",
			url: "CollaborativeServlet",
			data: "time="+$.now(),
			 success: function(data){
				 var categoryarray = ["sports","politics","business","opinion","technology","health","arts","lifestyle","food","travel"];
				 
				 var splitdata = data.split('},');
				for (var i=0;i<splitdata.length-1;i++)
				{
					
					var id;
					if(i==0){
						id=splitdata[i].substring(2,splitdata[i].indexOf(":")-1).trim();
					}else{
						id=splitdata[i].substring(1,splitdata[i].indexOf(":")-1).trim();
					}
					
					//alert(id);
					splitdata[i] = splitdata[i].substring(splitdata[i].indexOf(":")+1,splitdata[i].length);
					if(i<(splitdata.length-1))
				    	var json = $.parseJSON(splitdata[i]+"}");
					else
						var json = $.parseJSON(splitdata[i].replace("}}","}"));
				    var title = json.title;
				    
				    //var copyright = json.copyright;
				    var weblink = json.weblink;
				    var content = json.content;
				    var category = json.category;
				    //category=category.toLowerCase();
				    //alert(category.indexOf("sports"));
				    var setcategory = "";
				    var f="";
				    for(var j=0;j<categoryarray.length;j++){
					    if(String(category).toLowerCase().indexOf(categoryarray[j])>-1){
					    	setcategory = setcategory + f + categoryarray[j];
					    	f=", ";
					    }
				    }
				    //alert(categoryarray.length);
				    
				    /* var version = json._version_; */
				    if($.trim(weblink).length===0){
						weblink="PageCreate?id="+id;
					}
				    
				    var hot = $('#peer').html();
				    if(i==0 && setcategory!="")				    	
				    	$('#peer').html("<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\">"+title+"</a>&nbsp;&nbsp; "+"</br></br>");
				    else if(i>0 && setcategory!="")
				    	$('#peer').html(hot+"<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\">"+title+"</a>&nbsp;&nbsp;"+"</br></br>");
				    else if(i==0 && setcategory=="")
				    	$('#peer').html("<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\">"+title+"</a></br>"+"</br></br>");
				    else if(i>0 && setcategory=="")
				    	$('#peer').html(hot+"<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\">"+title+"</a></br>"+"</br></br>");
				}
            },
	            error: function(){
	                alert("failure!");
	                
	         }
		}), 
		  $("form#searchform").on("submit", function (e){e.preventDefault();
				if($("#name").val()==""){}
				else
					{
					$.ajax({
						type: "POST",
						url: "SearchServlet",
						data: "searchterms="+$("#searchterms").val(),
						 success: function(msg){
							 var categoryarray = ["sports","politics","business","opinion","technology","health","arts","lifestyle","food","travel"];
							 $("article#searchresultsarticle").show();var t=60+$("#peersearches").height();
							 $("article#hottopicsarticle").animate({top:t+"px",right:"40%",width:"40%"});
							 $("article#searchresultsarticle").fadeIn().css({top:1000,position:'absolute'}).animate({top:"50px",left:"480px", width:"55%"});
							 var f=0;
							 if(msg.indexOf("suggestions")>-1){f=1;}
							 var splitdata = msg.split('},');
							 
								for (var i=0;i<splitdata.length;i++)
								{
									
									var id;
									if(i==0){
										id=splitdata[i].substring(2,splitdata[i].indexOf(":")-1).trim();
									}else{
										id=splitdata[i].substring(1,splitdata[i].indexOf(":")-1).trim();
									}
									
									if(f==0)
										splitdata[i] = splitdata[i].substring(splitdata[i].indexOf(":")+1,splitdata[i].length);
									
									
									
									if(i<(splitdata.length-1))
								    	var json = $.parseJSON(splitdata[i]+"}");
									else{
										var json = $.parseJSON(splitdata[i].replace("}}","}"));}
									var suggestions = json.suggestions;
									if (suggestions===undefined){
									    var title = json.title;
									    //var id = json.id;
									    var copyright = json.copyright;
									    var weblink = json.weblink;
									    var content = json.content;
									    var category = json.category;
									    var copyright = json.copyright;
									    if(title===undefined && content===undefined){
									    	$('#searchresults').html("");
									    	break;
									    }
									    
									    var setcategory = "";
									    var f1="";
									    for(var j=0;j<categoryarray.length;j++){
										    if(String(category).toLowerCase().indexOf(categoryarray[j])>-1){
										    	setcategory = setcategory + f1 + categoryarray[j];
										    	f1=", ";
										    }
									    }
									    if($.trim(weblink).length===0){
									    	weblink="PageCreate?id="+id;
									    }
									    //var version = json._version_;
									    var hot = $('#searchresults').html();
									    if(i==0 && setcategory!="")
									    	$('#searchresults').html("<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a>&nbsp;&nbsp;<i>Category: "+setcategory+"</i></br>"+copyright+"</br>"+content+"</br></br>");
									    else if(i>0 && setcategory!="")
									    	$('#searchresults').html(hot+"<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a>&nbsp;&nbsp;<i>Category: "+setcategory+"</i></br>"+copyright+"</br>"+content+"</br></br>");
									    else if(i==0 && setcategory=="")
									    	$('#searchresults').html("<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a></br>"+copyright+"</br>"+content+"</br></br>");
									    else if(i>0 && setcategory=="")
									    	$('#searchresults').html(hot+"<a href="+weblink+" onclick=\"categorygrab('"+id+"');\" id=\""+id+"\" target=\"_blank\"><input type=\"hidden\" value=\""+category+"\"><input type=\"hidden\" value=\""+copyright+"\">"+title+"</a></br>"+copyright+"</br>"+content+"</br></br>");
									}
									else if($.trim(suggestions).length!=0)
										{
											suggestions1 = suggestions.split(',');
											for(var i=0;i<suggestions1.length;i++){
												var searchdiv = $('#searchresults').html();
												if(i==0)
													$('#searchresults').html("Did you mean: <a onclick=\"suggestionclicked('"+suggestions1[i]+"');\" id=\""+suggestions1[i]+"\">"+suggestions1[i]+"</a>");
												else
													$('#searchresults').html(searchdiv+", <a onclick=\"suggestionclicked('"+suggestions1[i]+"');\" id=\""+suggestions1[i]+"\">"+suggestions1[i]+"</a>");
											}
										}
								}
							 
						    //$("#searchresults").html(msg);
			            },
			            error: function(){
			                alert("failure");
			            }
					});
					}
				
			}),
			$("a#signoutbutton").click(function (){
				$.ajax({
					type: "POST",
					url: "SignOutServlet",
					data: "",
					 success: function(msg){
						alert(msg);
						window.location.href="index.html";
		            },
		            error: function(){
		                alert("failure");
		            }
				});
			});
	});