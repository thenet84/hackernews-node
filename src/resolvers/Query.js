function info(){
  return 'My first GraphQL Api';
}

function feed(root, args, context, info){
  return context.db.query.links({}, info);
}

function link(root, args, context, info){
  return context.db.query.link({
    where: {
      id: args.id
    }
  }, info);
}

module.exports = {
  info,
  feed,
  link
}