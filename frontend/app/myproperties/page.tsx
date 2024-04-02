import PropertyList from "../components/property/PropertyList";
import { getUserId } from "../actions/serverActions";

const MyProperties = async () => {
  const userId = await getUserId();
  return (
    <div className="max-w-screen-2xl mx-auto px-5 pb-4">
      <h1 className="my-3 text-lg">My Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
        <PropertyList landlordId={userId} />
      </div>
    </div>
  );
};

export default MyProperties;
