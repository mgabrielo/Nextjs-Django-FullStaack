import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import React from "react";
import { getAccessToken, getUserId } from "@/app/actions/serverActions";
import { apiService } from "@/app/service/apiService";
import { UserType } from "../page";

export type Messagetype = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  sent_to?: UserType;
  created_by?: UserType;
};

const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const token = await getAccessToken();
  const conversation = await apiService.getWithToken(
    `/api/chat/${params.id}/conversation/`
  );
  console.log({ conversation: conversation });
  return !userId || !token ? (
    <main className="max-w-screen-2xl mx-auto px-5 py-10">
      <p>You Need to be Authenicated </p>
    </main>
  ) : (
    <div className="max-w-screen-2xl h-screen mx-auto px-0 pb-4 space-y-3">
      <ConversationDetail
        conversation={conversation?.conversation}
        messages={conversation?.messages}
        userId={userId}
        token={token}
      />
    </div>
  );
};

export default ConversationPage;
