import Products from "../components/Products";

const Home = () => {
  return (
    <div className="mt-6 px-4">
      <h1 className="text-2xl">Welcome to Cloth store</h1>
      <section className="mt-6">
        <div className="text-2xl mb-6">Products</div>
        <Products />
      </section>
    </div>
  );
};
export default Home;
