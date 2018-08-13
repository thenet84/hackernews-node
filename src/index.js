const {GraphQLServer} = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'www.google.com',
    description: 'Google'
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'My first GraphQL Api',
    feed: () => links,
    link: (root, args) => {
      return links.find(link => link.id === args.id);
    }
  },
  Mutation: {
    postLink: (root, args) =>{
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }

      links.push(link);
      return link;
    },
    updateLink: (root, args) =>{
      let index=-1;
      links = links.map((link,i) => {
        if(link.id === args.id){
          index = i;
          link = {
            ...link, 
            description: args.description || link.description,
            url: args.url || link.url
          }
        }
        return link;
      });
      return links[index];
    },
    deleteLink: (root, args) =>{
      const index = links.map(x => {
        return x.id;
      }).indexOf(args.id);
      if (index !== -1){
        return links.splice(index, 1)[0];
      }
      return null;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`))