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
    <div className="w-[20rem] sm:h-[20rem] sm:w-[24rem] md:[w-45vw] lg:w-[16rem] md:h-[22rem]  rounded-lg shadow-md flex flex-col justify-between ">
      <img
        className=" w-full object-contain h-[20vh] "
        src={image}
        alt="image"
      />
      <div className="p-3 flex-end">
        <h4 className="font-semibold tracking-tight text-gray-700 line-clamp-2">
          {title}
        </h4>
        <p className="mb-1 leading-normal line-clamp-2">{description}</p>
        <button className="w-full px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
          Read more
        </button>
      </div>
    </div>
  );
};
export default Productcard;
