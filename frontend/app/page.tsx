import Categories from "./components/Categories";
import PropertyList from "./components/property/PropertyList";

export default function Home() {
  return (
    <main className="max-w-screen-2xl mx-auto px-5">
      <Categories />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        <PropertyList />
      </div>
    </main>
  );
}
