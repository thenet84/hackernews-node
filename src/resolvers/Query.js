function info(){
  return 'My first GraphQL Api';
}

function feed(root, args, context, info){
  const where = args.filter 
    ? {
      OR: [
        {url_contains: args.filter},
        {description_contains: args.filter}
      ]
    } : {};
  return context.db.query.links({ 
    where, skip: args.skip, first: args.first, orderBy: args.orderBy
  }, info);
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