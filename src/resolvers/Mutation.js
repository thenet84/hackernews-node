const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils.js');

async function singup(parent, args, context, info){
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser({
    data:{
      ...args,
      password
    } 
  }, `{ id }`);
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user
  };
}

async function login(parent, args, context, info){
  const user = await context.db.query.user({
    where: { email: args.email }
  }, `{id password}`);
  if(!user){
    throw new Error('No such user found');
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if(!valid){
    throw new Error('Invalid password');
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
}

function postLink(root, args, context, info){
  const userId = getUserId(context);
  return context.db.mutation.createLink({
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } }
    }
  }, info);
}

function updateLink(root, args, context, info){
  return context.db.mutation.updateLink({
    data: {
      description: args.description,
      url: args.url 
    },
    where: {
      id: args.id
    }
  }, info);
}

function deleteLink(root, args, context, info){
  return context.db.mutation.deleteLink({
    where: {
      id: args.id
    }
  }, info);
}

module.exports = {
  singup,
  login,
  postLink,
  updateLink,
  deleteLink
}