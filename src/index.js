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
    updateLink: (root, args, context, info) =>{
      return context.db.mutation.updateLink({
        data: {
          description: args.description,
          url: args.url 
        },
        where: {
          id: args.id
        }
      }, info);
    },
    deleteLink: (root, args, context, info) =>{
      return context.db.mutation.deleteLink({
        where: {
          id: args.id
        }
      }, info);
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