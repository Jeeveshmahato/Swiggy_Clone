import { restaurantList } from "../utils/restaurantList";
import { imgLink } from "../utils/link";

const Card = ({ data }) => {
  // console.log(data);
  // const { data } = props;
  return (
    <div className="card w-fit px-6 py-4">
      <img
        className="w-48 h-[100px]  self-stretch"
        src={imgLink + data.cloudinaryImageId}
        alt="card"
      />
      <h2>{data.name}</h2>
      <p>{data.avgRating}</p>

      <button>{data.costForTwo}</button>
    </div>
  );
};
export const RatCard = (Card) => {
  return (props) => {
    return (
      <div>
        <label>Rated</label>
        <Card {...props} />
      </div>
    );
  };
};
export default Card;
