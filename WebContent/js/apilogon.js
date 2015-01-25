
//utility function used by registering users using different Oauth
function apiregister(name,pass){
	if(name==""|pass==""){}
	else
	$.ajax({
		type: "POST",
		url: "RegistrationServlet",
		data: $("#prefs").serialize(),
		 success: function(msg){
            $("#myModal").modal('hide'); //hide popup  
            if($.trim(msg)==="Registration successfull!"){
            	window.location.href="search.html";
            	
            	//ajax call to update similar user preferences
            	$.ajax({
            		type: "POST",
            		url: "SimilarUsers",
            		data:"",
            		sucess:function(msg){
            			//alert(msg);
            		},error:function(){
            			//alert("failed to capture similar users");
            		}
            		
            	});
            	
            	
            }
            else
            	alert(msg);
        },
        error: function(){
            alert("failure");
        }
	});

}


function apilogin(name,pass){
	if(name!=""&&pass!=""){
		$.ajax({
			type: "POST",
			url: "LoginServlet",
			data: $("#loginform").serialize(),
			 success: function(msg){
                $("#loginmodal").modal('hide'); //hide popup  
                if($.trim(msg)==="Login Successful!"){
                	window.location.href="search.html";
                }
                else
                	alert(msg);
            },
            error: function(){
                //alert("failure");
            }
		});
	}
}