# NYC Covid Data Dashboard Frontend

This repository will hold everything that is related to the client side in the NYC Covid Data Dashboard Project.

We focus on client-side graphql (done with URQL) and rendering data with D3 (done with visx and some homebrewed solutions). The aim is to achieve rapid development speeds and a high level of control with what is built. We attempt this by using a combination of reusable chart components and simple data fetching structure.

### Project Structure

This project uses a Smart-Container/Dumb-Component structure for organization. Being a dashboard, it makes sense that each page would correlate with a container. These containers are represented in the code as a directory with an index that holds the brains of the page, as well as a number of files for large conceptual charts. Inside this index, we want to run the query that will fetch all of the data needed for that entire page. GraphQL will make this really easy and pleasant to do since we can run many different queries at one time.

#### /components
Any reusable building block will live in this folder. Buttons, charts, layout tools, d3 wrappers, etc. These components will have minimal logic; primarily for breaking down the parameters passed in.

#### /containers
Each page in the dashboard is represented by a folder, with the index of said folder running a query, calculating, formatting, and passing the data into large conceptual charts. These charts live in their respective files in the same folder as the page they reside on.

#### /vectors
Sometimes we need to homebrew a D3 vis. The pattern we use is the following:
A vector is a JavaScript class that has a constructor and at least a method that updates (similarly to React's render). A vector takes in the svg element that contains it as well as a number of other props needed. To facilitate the usage of this, a `/components/Animator` component is provided in order to remove any frivolous implementation details. Please refer to any component in `/components/animated` for an example.



- https://raw.githubusercontent.com/nychealth/coronavirus-data/ac2abb7dfee986000c092d21083de683c5ad3adc/Geography-resources/ZCTA-to-MODZCTA.csv
