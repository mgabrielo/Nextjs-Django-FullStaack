import { getUserId } from "@/app/actions/serverActions";
import ContactButton from "@/app/components/buttons/ContactButton";
import PropertyList from "@/app/components/property/PropertyList";
import { apiService } from "@/app/service/apiService";
import Image from "next/image";
import React from "react";

const LandLordDetailPage = async ({ params }: { params: { id: string } }) => {
  const landlord = await apiService.getWithToken(`/api/auth/${params.id}/`);
  const userId = await getUserId();

  return landlord && userId ? (
    <main className="max-w-screen-2xl mx-auto px-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <aside className="col-span-3 md:col-span-1 mb-4">
          <div className="flex flex-col items-center p-4 rounded-xl border border-gray-300 shadow-xl">
            {landlord?.avatar_url ? (
              <Image
                src={landlord.avatar_url}
                width={200}
                height={200}
                alt="land-lord"
                className="rounded-full"
              />
            ) : (
              <Image
                src={"/profile.png"}
                width={200}
                height={200}
                alt="land-lord"
                className="rounded-full"
              />
            )}
            <h1 className="text-lg mt-3">{landlord?.name}</h1>
            {userId !== landlord?.id && (
              <ContactButton userId={userId} landlordId={landlord.id} />
            )}
          </div>
        </aside>
        <div className="col-span-3 pl-0 md:pl-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
          <PropertyList landlordId={landlord.id} />
        </div>
      </div>
    </main>
  ) : null;
};

export default LandLordDetailPage;
