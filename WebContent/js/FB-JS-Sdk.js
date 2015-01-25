

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '376721569154269',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.2'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  
  function register(){
	  FB.login(function(response){
		  console.log(response.status);
		  if (response.status === 'connected') {
		      // Logged into your app and Facebook.
		      reg();
		    } else if (response.status === 'not_authorized') {
		      // The person is logged into Facebook, but not your app.
		      alert('not authorized');
		    } else {
		      // The person is not logged into Facebook, so we're not sure if
		      // they are logged into this app or not.
		    	alert('log in');
		    }
	  }, {scope: 'public_profile,email'});
  }

  function login(){
	  FB.login(function(response){
		  console.log(response.status);
		  if (response.status === 'connected') {
		      // Logged into your app and Facebook.
		      log();
		    } else if (response.status === 'not_authorized') {
		      // The person is logged into Facebook, but not your app.
		      alert('not authorized');
		    } else {
		      // The person is not logged into Facebook, so we're not sure if
		      // they are logged into this app or not.
		    	alert('log in');
		    }
	  }, {scope: 'public_profile,email'});
  }
  
  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function reg() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      $('#name').val(response.email);
      $('#mail').val(response.email);
      $('#pass').val(response.id);
      apiregister(response.email,response.id);
      
    });
  }

  function log(){
	  FB.api('/me',function(response){
		  $('#username').val(response.email);
	      $('#loginpass').val(response.id);
	      apilogin(response.email,response.id);
	  });
  }
