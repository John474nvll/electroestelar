
interface TestimonialCardProps {
  name: string;
  content: string;
  image: string;
  rating: number;
}

const TestimonialCard = ({ name, content, image, rating }: TestimonialCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-lg font-medium">{name}</h4>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg 
                key={i}
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill={i < rating ? "#EB5E28" : "#D1D5DB"} 
                stroke="none"
                className="mr-1"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">"{content}"</p>
    </div>
  );
};

export default TestimonialCard;
