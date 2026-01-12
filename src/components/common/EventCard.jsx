import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatters";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Card
      className="group bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/30 cursor-pointer backdrop-blur-sm h-full"
      cover={
        <div className="relative overflow-hidden">
          <img
            alt={event.title}
            src={event.image || "https://via.placeholder.com/300x200"}
            className="w-full h-[180px] sm:h-[200px] object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      }
      onClick={handleClick}
    >
      <div className="p-4 sm:p-5">
        <div className="text-blue-400/80 text-xs sm:text-sm mb-2 sm:mb-3 font-medium flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          {formatDate(event.date)} | {event.location}
        </div>
        <h3 className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 min-h-[50px] sm:min-h-[60px] group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {event.title}
        </h3>
        <Button
          type="primary"
          className="w-full rounded-lg sm:rounded-xl font-semibold h-10 sm:h-11 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          Lihat Detail
        </Button>
      </div>
    </Card>
  );
};

export default EventCard;
