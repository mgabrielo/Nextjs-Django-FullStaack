import React from "react";
import Conversation from "../components/inbox/Conversation";

const InboxPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 pb-4 space-y-3">
      <h1 className="my-3 text-lg">My Inbox</h1>
      <Conversation />
    </div>
  );
};

export default InboxPage;
