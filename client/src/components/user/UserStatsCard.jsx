const UserStatsCard = ({
  title,
  value,
  bgColorClass,
  textColorClass,
}) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center ${bgColorClass}`}
    >
      <h3 className="text-gray-500 text-sm font-medium mb-1">
        {title}
      </h3>
      <p className={`text-3xl font-bold ${textColorClass}`}>
        {value}
      </p>
    </div>
  );
};

export default UserStatsCard;
