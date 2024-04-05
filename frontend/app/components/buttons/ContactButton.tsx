"use client";
import React, { FC } from "react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { apiService } from "@/app/service/apiService";
import { useRouter } from "next/navigation";

interface ContactButtonProps {
  userId: string | null;
  landlordId: string;
}
const ContactButton: FC<ContactButtonProps> = ({ userId, landlordId }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const startConversation = async () => {
    if (userId) {
      const conversation = await apiService.getWithToken(
        `/api/chat/start/${landlordId}/conversation/`
      );
      if (conversation.conversation_id) {
        router.push(`/inbox/${conversation.conversation_id}`);
      }
    } else {
      loginModal.open();
    }
  };
  return (
    <div
      onClick={startConversation}
      className="py-2 px-4 bg-airbnb text-white rounded-lg mt-3 cursor-pointer hover:bg-airbnb-dark transition"
    >
      Contact
    </div>
  );
};

export default ContactButton;
