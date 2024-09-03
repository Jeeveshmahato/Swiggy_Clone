import { imgLink } from "../utils/link";

const CatItems = (data) => {
  // console.log(data);
  const { name, price ,imageId ,description, defaultPrice } = data.data.card.info;
  return (
    <div className="flex shadow-lg p-5 gap-10 justify-between items-center">
      <div>
     <div className=" flex gap-5 mb-10 items-center ">
     <h3 className=" text-xl font-semibold">{name}</h3>
     <p className="text-lg font-light">{price / 100 || defaultPrice /100}</p>
     </div>
        <p>{description}</p>
      </div>
      <img className=" w-[200px] h-[150px] p-5" src={imgLink + imageId} />
    </div>
  );
};
export default CatItems;
