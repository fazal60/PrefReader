What is PrefReader?
-------------------
Apache Solr powered Web Search Engine Developed in J2EE

1) News Search Engine which provides Results Customized to user Preferences.
2) Powered by Apache SOLR to index and query news corpuses like NYT, Washington Post, Reuters.
3) Suggests Articles about trending topics in area of user's interest 
4) Implemented Collaborative filtering to suggest user with article read by similar users.
5) Responsive front-end for different devices.
6) Spell suggestion, term highlighting.
7) Deployed on PAAS -"Openshift", a Open Hybrid Cloud Application Platform by Red Hat.

How does it work?
-----------------
-This application allows users to register themselves as users and set their reading preferences.
-Users can give scores on a scale of 0-10 to topics they like.
-For example, a person can be more interested in Politics than Sports so he gives a score of 9
 to politics and 3 to sports.
-When the user logs in, the PrefReader system displays a list of trending items on social media
 related to politics and other topics which user is interested in, in order of the preference set.
-User can also search for news and based on user prerefences, the system returns news articles related
 to the search term from the categories, say Politics, sports and economy, the user is interested in.
-The system also suggests Recommended searches to the user using the 'Collaborative filtering' feature
 of Apache Solr where articles read by users with similar profile to this user are recommended to the
 user.
-The system keeps learning the changing preferences of the user over time by observing the articles
 read and modifies his or her preferences in the database accordingly.
-User can login or register himself using popular social media platforms like Linkedin and Facebook.
 

Tools used to develop:
---------------------
Java, J2EE, JSP, Servlets, Apache SOLR, HTML, CSS, JavaScript, BootStrap.

How to Access:
--------------
Please go to the URL: http://prefreader-prefreader.rhcloud.com/

