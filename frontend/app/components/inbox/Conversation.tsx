"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";
import CustomButton from "../buttons/CustomButton";
interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}
const Conversation: FC<ConversationProps> = ({ userId, conversation }) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id != userId);
  return (
    <div className=" px-5 py-4 border border-gray-300 rounded-xl">
      <p className="mb-4 text-lg">
        {otherUser?.name ? otherUser.name : otherUser?.email}
      </p>
      <p
        className="text-airbnb-dark cursor-pointer"
        onClick={() => router.push(`/inbox/${conversation?.id}`)}
      >
        Go to Conversation
      </p>
    </div>
  );
};

export default Conversation;
