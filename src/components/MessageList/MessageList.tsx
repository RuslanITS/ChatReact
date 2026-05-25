import type { Message } from "../../type";

import MessageItem from "../MessageItem/MessageItem";

type Props = { messages: Message[] };

const MessageList = ({messages}: Props) => {
  return (
    <>
      {messages.map((item) => (
        <MessageItem
          key={item._id}
          item={item}
        />
      ))}
    </>
  );
};

export default MessageList;