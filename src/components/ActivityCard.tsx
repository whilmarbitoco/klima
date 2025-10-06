interface ActivityCardProps {
  color: string;
  title: string;
  time: string;
}

const ActivityCard = ({ color, title, time }: ActivityCardProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <div className="flex-1">
        <p className="text-white text-sm">{title}</p>
        <p className="text-gray-400 text-xs">{time}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
