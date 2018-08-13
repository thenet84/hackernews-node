const {GraphQLServer} = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
  Query: {
    info: () => 'My first GraphQL Api',
    feed: () => links
  },
  Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`))