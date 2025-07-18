import type { CategoryData } from "../interfaces/CategoryData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function card({ category }: { category: CategoryData }) {
  const getCategoryClass = (categoryName: string): string => {
    switch (categoryName) {
      case "all":
        return "bg-gray-200 text-black";
      case "tech":
        return "bg-blue-200 text-blue-700";
      case "travel":
        return "bg-green-200 text-green-700";
      case "food":
        return "bg-orange-200 text-orange-700";
      default:
        return "";
    }
  };
  return (
    <div className="flex justify-between flex-col overflow-hidden rounded-2xl gap-5 shadow group transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
      <figure className="relative h-64 overflow-hidden">
        <img
          src={category.image.url}
          alt={category.image.tag}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <span
          className={`absolute top-3 left-3 px-2 py-1 font-semibold capitalize text-sm rounded-2xl ${getCategoryClass(
            category.category
          )}`}
        >
          {category.category}
        </span>
      </figure>
      <article className="flex justify-between flex-col gap-5 p-5">
        <h3 className="text-md md:text-xl lg:text-2xl font-bold group-hover:text-blue-600">
          {category.title}
        </h3>
        <p className="text-sm md:text-lg text-black/70">
          {category.description}
        </p>
        <div className="flex justify-between flex-col gap-5 sm:flex-row w-full text-nowrap">
          <div className="flex gap-5">
            <div className="flex gap-3 text-black/70 text-sm">
              <span>
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <p>{category.date.toDateString()}</p>
            </div>
            <div className="flex gap-3 text-black/70 text-sm">
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              <p>{category.time.toFixed()} min read</p>
            </div>
          </div>
          <a className="flex gap-3 text-black/70 text-sm">
            <p>read more</p>
            <span>
              <FontAwesomeIcon icon={faArrowRightLong} />
            </span>
          </a>
        </div>
      </article>
    </div>
  );
}

export default card;
