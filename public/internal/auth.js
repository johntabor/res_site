var config = {
    apiKey: "AIzaSyBlSw_9_7ZULMKT62cQrl4zbgz6_oSQi1Q",
    authDomain: "rutrep-27e19.firebaseapp.com",
    databaseURL: "https://rutrep-27e19.firebaseio.com",
    projectId: "rutrep-27e19",
    storageBucket: "rutrep-27e19.appspot.com",
    messagingSenderId: "365549935446"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((a) => {
    if(a != null) {
    document.cookie = "sqs="+a._lat+";max-age=7776000;path=/";
    document.cookie = "uid="+a.uid+";max-age=7776000;path=/";
    location.replace('/in');
}});
function registerNow() {
    var email = $('input[type=text][name=uid]').val()+'@rutrep.com';
    var password = $('input[type=password][name=pwd]').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    $('#su_dir').show();
    });
}
function loginNow() {
    var email = $('input[type=text][name=uid]').val()+'@rutrep.com';
    var password = $('input[type=password][name=pwd]').val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    $('#login_error').show();
    });
}