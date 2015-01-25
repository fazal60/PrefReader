
  // 2. Runs when the JavaScript framework is loaded
  function onLinkedInLoad() {
	IN.UI.Authorize().params({"scope":["r_basicprofile", "r_emailaddress"]}).place();
    IN.Event.on(IN, "auth", onLinkedInAuth);
  }
	  
  //2. Runs when the viewer has authenticated
  function onLinkedInAuth() {
    IN.API.Profile("me").fields("id,firstName,lastName,emailAddress").result(displayProfiles);
  }

  // 2. Runs when the Profile() API call returns successfully
  function displayProfiles(profiles) {
    member = profiles.values[0];
    console.log(member.emailAddress);
    $("#name").val(member.emailAddress);
    $("#mail").val(member.emailAddress);
    $("#pass").val(member.id);
    apiregister(member.emailAddress,member.id);
  }
  
  function onLinkedInlog() {
		IN.UI.Authorize().params({"scope":["r_basicprofile", "r_emailaddress"]}).place();
	    IN.Event.on(IN, "auth", onLinkedInlogAuth);
	  }
		  
  //2. Runs when the viewer has authenticated
  function onLinkedInlogAuth() {
    IN.API.Profile("me").fields("id,firstName,lastName,emailAddress").result(loginProfiles);
  }

  // 2. Runs when the Profile() API call returns successfully
  function loginProfiles(profiles) {
    member = profiles.values[0];
    console.log(member.emailAddress);
    $("#username").val(member.emailAddress);
    $("#loginpass").val(member.id);
    apilogin(member.emailAddress,member.id);
  }