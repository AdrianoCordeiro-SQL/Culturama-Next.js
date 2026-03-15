interface CategoryCardProps {
  title: string;
  backgroundColor: string;
}

const CategoryCard = ({ title, backgroundColor }: CategoryCardProps) => {
  return (
    <div
      className="flex items-center justify-center min-w-70.5 h-16 rounded-lg cursor-pointer transition-transform hover:scale-105"
      style={{ backgroundColor }}
    >
      <h3 className="text-white text-xl font-fjalla uppercase tracking-wider">
        {title}
      </h3>
    </div>
  );
};

export default CategoryCard;
