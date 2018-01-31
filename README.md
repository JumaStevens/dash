Hello world! :)



/ firebase structure idea /

users
  user_id
    name
    profile_url
    email

presence
  user_id
    status
    last_changed

friends
  user_id (jane)
    user_id (fred)
    user_id (jill)
  user_id (mark)
    user_id (smith)
    user_id (jill)

chat
  userChats
    user_id
      convo_id
      convo_id
      convo_id

  chats
    convo_id
      from
      lastMessage
      timestamp

  members
    convo_id
      user_id
      user_id

  messages
    convo_id
      message_index
        user_id
        message
        timestamp
