const chatName = (users: any, user: any) => {
  let nameChat = "";
  users.forEach((el: any) => {
    if (el._id !== user._id) {
      nameChat = el.name;
    }
  });
  return nameChat;
};

const chatWho = (user: any, me: any, other: string) => {
  if (user === me._id) {
    return "Me";
  } else {
    return other;
  };
};

const chatOtherUser = (users: any, user: any) => {
  let nameChat = "";
  users.forEach((el: any) => {
    if (el._id !== user._id) {
      nameChat = el._id;
    }
  });
  return nameChat
};

const chatOtherUserTag = (users: any, user: any) => {
  let nameChat = "";
  users.forEach((el: any) => {
    if (el._id !== user._id) {
      nameChat = el.tag;
    }
  });
  return nameChat
};

const BubbleSort = (array: any) => {
  for (var i = 0; i <= array.length - 1; i++) {
    for (var j = 0; j < (array.length - i - 1); j++) {
      if (new Date(array[j].lastMessage.date) < new Date(array[j + 1].lastMessage.date)) {
        var temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}


export { chatName, chatWho, chatOtherUser, BubbleSort, chatOtherUserTag }