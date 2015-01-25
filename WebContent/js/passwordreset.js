$(document).ready(function(){
	$("button#reset").click(function(){
		if($("#resetusername").val()!=""){
			$.ajax({
				type:"POST",
				url: "ResetPassword",
				data: $("#resetform").serialize(),
					sucess:function(msg){
						alert(msg);
						console.log(msg);
						if(msg=="sent"){
							$("#resetpass").empty();
						}
					},
					error:function(jqXHR, textStatus, errorThrown){
						alert("error: " + textStatus); 
				        alert("error: " + errorThrown);
					}
			});
		}
	});
});