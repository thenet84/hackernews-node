function newLinkSubscribe(parent, args, context, info){
  return context.db.subscription.link(
    { where: { mutation_in: ['CREATED'] } },
    info)
}

const newLink = {
  subscribe: newLinkSubscribe
}

function updateLinkSubscribe(parent, args, context, info){
  return context.db.subscription.link(
    { where: { mutation_in: ['UPDATED'] } },
    info)
}

const updateLink = {
  subscribe: updateLinkSubscribe
}

function deleteLinkSubscribe(parent, args, context, info){
  return context.db.subscription.link(
    { where : {mutation_in: ['DELETED'] } },
    info
  )
}

const deleteLink = {
  subscribe: deleteLinkSubscribe
}

module.exports = {
  newLink,
  updateLink,
  deleteLink
}