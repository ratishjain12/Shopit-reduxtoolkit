import Products from "../components/Products";

const Home = () => {
  return (
    <div className="mt-6 px-4 container mx-auto">
      <h1 className="text-2xl text-center font-bold">Welcome to Shopit</h1>
      <section className="mt-6 p-2">
        <div className="text-2xl mb-6 border-b-2 border-gray-300">Products</div>
        <Products />
      </section>
    </div>
  );
};
export default Home;
