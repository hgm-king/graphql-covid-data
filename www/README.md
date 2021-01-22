# NYC Covid Data Dashboard Frontend

This repository will hold everything that is related to the client side in the NYC Covid Data Dashboard Project.

We focus on client-side graphql (done with URQL) and rendering data with d3 (done with visx). The aim is to achieve rapid development speeds and a high level of control with what is built.



### Project Structure
This project uses a Smart-Container/Dumb-Component structure for organization. Being a dashboard, it makes sense that each page would correlate with a container. These containers are represented in the code as a directory with an index that holds the brains of the page. We want to separate all of this container logic into three sections: Load, Calculate, and Format.
