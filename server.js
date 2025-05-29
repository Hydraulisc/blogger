const express = require('express');
const ejs = require('ejs');
const firebase = require('firebase');
const bodyParser = require('body-parser');

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } = require('./firebase_env.json')

// start express + extras
const port = process.env.port || 8800;
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};
const dbapp = firebase.initializeApp(firebaseConfig);
const store = firebase.firestore();

// listen to app
app.listen(port, function(){
    console.log('Ready to Hy some Draulisc! Port: ' + port);
})


function cleanseHTML(text) {
    const cleansedHTML = text.replace(/[<>"&]/g, function (match) {
      return {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '&': '&amp;',
      }[match];
    });
    return cleansedHTML;
}


// login page
app.get('/auth', function (req, res) {
  const checkUser = firebase.auth().currentUser;
  if(checkUser) {
    res.redirect(`/`)
  } else {
    res.render('pages/auth');
  }
});


  /*  WARNING!

    authorise existing user

    **WARNING!!** DO NOT USE THIS AUTH METHOD IN PRODUCTION. IT HAS BEEN PROVEN (COUNTLESS TIMES) THAT IT STORES THE USER INFO LOCALLY ON THE SERVER,
    CREATING A SEVERE SECURITY VULNERABILITY.

  */

app.post('/auth/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      res.redirect('/');
    } catch (error) {
      const errorMessage = error.message;
      console.error(errorMessage);
      res.status(500).send(errorMessage);
    }
  });

app.get('/', async (req, res) => {
    if(firebase.auth().currentUser != null) {
      res.render('pages/blogger', {
      username: firebase.auth().currentUser.email,
      uid: firebase.auth().currentUser
    });
    } else {
      res.redirect('/auth')
    }
})

/* UPLOAD BLOG ENTRIES

    This is used to upload the actual blog posts. Don't ask what kind of wizardry goes into this. We just know it works.

*/

app.post('/post/create', async (req, res) => {
  const preSanitizedTitle = req.body.title;
  const preSanitizedBlog = req.body.content;

  // Check if any of the required fields are blank
  if (!preSanitizedTitle || preSanitizedTitle.trim().length === 0 || !preSanitizedBlog || preSanitizedBlog.trim().length === 0) {
    return res.status(400).send('Blog Title and Post Body are all required fields.');
  }
  
  try {
    // Get the count of existing documents in the "entries" collection
    const snapshot = await store.collection('entries').get();
    const docCount = snapshot.size;

    const blogPost = {
      title: cleanseHTML(preSanitizedTitle),
      content: cleanseHTML(preSanitizedBlog),
      pnum: docCount + 1
    }

    const docRef = await store.collection('entries').add(blogPost);
    const postId = docRef.id;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const updatedPost = { path: postId, update: timestamp };

    await docRef.update(updatedPost);
    res.status(200).json('success').redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error patching blog post: ' + error.message });
  }
})
