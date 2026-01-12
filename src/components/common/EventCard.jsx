import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatters";
import PropTypes from "prop-types";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Card
      className="group bg-gray-800/90 border border-white/10 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-400/30 cursor-pointer h-full"
      cover={
        <div className="relative overflow-hidden">
          <img
            alt={event.title}
            src={event.image || "https://via.placeholder.com/300x200"}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      }
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="text-blue-400/80 text-sm mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          {formatDate(event.date)} | {event.location}
        </div>
        <h3 className="text-white text-xl font-bold mb-4 min-h-[60px] group-hover:text-blue-400 transition-colors line-clamp-2">
          {event.title}
        </h3>
        <Button
          type="default"
          block
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="!bg-black !border-white/10 !text-white hover:!bg-gray-900 hover:!border-blue-400/30"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default EventCard;
