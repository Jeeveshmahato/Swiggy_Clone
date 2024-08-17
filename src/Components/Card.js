import { restaurantList } from "../utils/restaurantList";
import { imgLink } from "../utils/link";

const Card = ({ data }) => {
  // console.log(data);
  // const { data } = props;
  return (
    <div className="card">
      <img className="card-img" src={imgLink + data.cloudinaryImageId} alt="card" />
      <h2>{data.name}</h2>
      <p>{data.avgRating}</p>

      <button>{data.costForTwo}</button>
    </div>
  );
};
export default Card;
