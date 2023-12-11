// Load the Facebook SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Initialize the Facebook SDK with your app ID
window.fbAsyncInit = function() {
  FB.init({
    appId      : 'your-app-id',
    cookie     : true,
    xfbml      : true,
    version    : 'v13.0'
  });

  // Check if the user is already logged in with Facebook
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // The user is already logged in with Facebook
      // Get the user's access token and profile data
      var accessToken = response.authResponse.accessToken;
      FB.api('/me?fields=id,name,email,birthday', function(response) {
        console.log('Welcome, ' + response.name);
        console.log('Your email is ' + response.email);
        console.log('Your birthday is ' + response.birthday);
      });
    } else {
      // The user is not logged in with Facebook
      // Prompt the user to log in with Facebook
      FB.login(function(response) {
        if (response.authResponse) {
          // Get the user's access token and profile data
          var accessToken = response.authResponse.accessToken;
          FB.api('/me?fields=id,name,email,birthday', function(response) {
            console.log('Welcome, ' + response.name);
            console.log('Your email is ' + response.email);
            console.log('Your birthday is ' + response.birthday);
          });
        } else {
          // The user canceled the Facebook login dialog
          console.log('User canceled login or did not fully authorize.');
        }
      }, {scope: 'email,user_birthday'});
    }
  });
};
