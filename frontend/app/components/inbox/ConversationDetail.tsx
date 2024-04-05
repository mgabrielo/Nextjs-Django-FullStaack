"use client";
import React, { FC, useEffect, useState, useRef } from "react";
import CustomButton from "../buttons/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Messagetype } from "@/app/inbox/[id]/page";

interface ConversationDetailProps {
  conversation: ConversationType;
  messages?: Messagetype[];
  token?: string;
  userId: string;
}

const ConversationDetail: FC<ConversationDetailProps> = ({
  conversation,
  userId,
  token,
  messages,
}) => {
  const user = conversation?.users?.find((user) => user?.id == userId);
  const otherUser = conversation?.users?.find((user) => user?.id != userId);
  const messageDiv: any = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [realTimeMessages, setRealTimeMessages] = useState<Messagetype[]>([]);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `ws://127.0.0.1:8000/ws/${conversation?.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log("connection state-", readyState);
  }, [readyState]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "name" in lastJsonMessage &&
      "body" in lastJsonMessage
    ) {
      const message: Messagetype = {
        id: "",
        name: lastJsonMessage.name as string,
        body: lastJsonMessage.body as string,
        conversationId: conversation.id,
        sent_to: otherUser,
        created_by: user,
      };
      setRealTimeMessages((prev) => [...prev, message]);
    }
    scrollToBottom();
  }, [lastJsonMessage]);

  const sendMessage = async () => {
    sendJsonMessage({
      event: "chat_message",
      data: {
        body: newMessage,
        name: user?.email,
        sent_to_id: otherUser?.id,
        conversation_id: conversation?.id,
      },
    });
    setNewMessage("");
    // console.log("message sent");
    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };

  const scrollToBottom = () => {
    if (messageDiv.current) {
      messageDiv.current.scrollTop = messageDiv.current.scrollHeight;
    }
  };
  return (
    <div className="w-full mx-auto relative">
      <div
        ref={messageDiv}
        className="max-h-[400px] px-3 mt-4 overflow-auto flex flex-col space-y-4"
      >
        {messages &&
          messages?.length > 0 &&
          messages.map((message, index) => (
            <div
              key={index}
              className={`w-[80%] py-4 px-6 rounded-lg ${
                message.created_by?.email === user?.email
                  ? "bg-blue-200 ml-[20%]"
                  : "bg-gray-200"
              }`}
            >
              <p className="font-bold text-gray-blue">
                {message?.created_by?.email}
              </p>
              <p>{message.body}</p>
            </div>
          ))}
        {realTimeMessages.length > 0 &&
          realTimeMessages.map((message, index) => (
            <div
              key={index}
              className={`w-[80%] py-4 px-6 rounded-lg ${
                message.name === user?.name || user?.email
                  ? "bg-blue-200 ml-[20%]"
                  : "bg-gray-200"
              }`}
            >
              <p className="font-bold text-gray-blue">{message.name}</p>
              <p>{message.body}</p>
            </div>
          ))}
      </div>

      <div className="w-full px-3 bottom-0 fixed py-3 flex items-center border border-gray-300 space-x-3 rounded-lg">
        <input
          type="text"
          placeholder="type your message"
          className="w-full p-2 bg-gray-200 rounded-lg"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <CustomButton label="Send" onClick={sendMessage} />
      </div>
    </div>
  );
};

export default ConversationDetail;
