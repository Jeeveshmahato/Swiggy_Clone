import { restaurantList } from "../utils/restaurantList";

const Card = (props) => {
    const { data } = props;
    return (
      <div className="card">
        <img src={"IMG_CDN_URL +data.cloudinaryImageId"} alt="card" />
        <h2>{data.name}</h2>
        <p>{data.area}</p>
        <p>{data.slugs.city}</p>
        <button>{"price is"+data.costForTwo / 100+"only"}</button>
      </div>
    );
  };
  export default Card;