const chatName = (users: any, user: any) => {
  let nameChat = ""
  users.forEach((el: any) => {
    if (el._id !== user._id) {
      nameChat = el.name
    }
  })
  return nameChat
}

const chatWho = (user: any, me: any, other: string) => {
  if (user === me._id) {
    return "Me"
  } else {
    return other
  }
}

const chatOtherUser = (users: any, user: any) => {
  let nameChat = ""
  users.forEach((el: any) => {
    if (el._id !== user._id) {
      nameChat = el._id
    }
  })
  return nameChat
}

export { chatName, chatWho, chatOtherUser }