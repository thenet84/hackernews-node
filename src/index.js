const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    info: () => 'My first GraphQL Api',
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info);
    },
    link: (root, args, context, info) => {
      return context.db.query.link({
        where: {
          id: args.id
        }
      }, info);
    }
  },
  Mutation: {
    postLink: (root, args, context, info) =>{
      return context.db.mutation.createLink({
        data: {
          description: args.description,
          url: args.url
        }
      }, info);
      
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
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/denet-9ea513/database/dev',
      secret: 'mysecret123',
      debug: true
    })
  })
});

server.start(() => console.log(`Server is running on http://localhost:4000`))