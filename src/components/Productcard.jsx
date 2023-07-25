const Productcard = ({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}) => {
  return (
    <div className="w-[20rem] rounded-lg shadow-md flex flex-col justify-between ">
      <img className=" w-full h-[20rem] " src={image} alt="image" />
      <div className="p-4">
        <h4 className="text-xl font-semibold tracking-tight text-blue-600">
          {title}
        </h4>
        <p className="mb-2 leading-normal line-clamp-3">{description}</p>
        <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
          Read more
        </button>
      </div>
    </div>
  );
};
export default Productcard;
