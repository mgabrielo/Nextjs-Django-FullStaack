import React from "react";
import Conversation from "../components/inbox/Conversation";
import { getUserId } from "../actions/serverActions";
import { apiService } from "../service/apiService";

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
  email?: string;
};
export type ConversationType = {
  id: string;
  users: UserType[];
};

const InboxPage = async () => {
  const userId = await getUserId();
  const conversations =
    userId && (await apiService.getWithToken(`/api/chat/${userId}`));

  return !userId ? (
    <main className="max-w-screen-2xl mx-auto px-5 py-10">
      <p>You Need to be Authenicated </p>
    </main>
  ) : (
    <div className="max-w-screen-2xl mx-auto px-5 pb-4 space-y-3">
      <h1 className="my-3 text-lg">Your Inbox</h1>
      {conversations.length > 0 &&
        conversations.map((conversation: ConversationType) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            userId={userId}
          />
        ))}
    </div>
  );
};

export default InboxPage;
