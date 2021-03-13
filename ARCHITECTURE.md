# ARCHITECTURE
Our application here has a very linear layout in terms of its system elements. Very simply, the frontend will communicate with the backend, which in turn will communicate with the database. Like many other applications, our local development setup will differ from the external environments. Let's discuss each of our system elements.

### Frontend
The client facing code is built using React and compiled with Webpack. This turns it into static Javascript that runs in the client's browser.

### Server
