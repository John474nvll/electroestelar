
interface PageHeroProps {
  title: string;
  description: string;
  imageSrc: string;
}

const PageHero = ({ title, description, imageSrc }: PageHeroProps) => {
  return (
    <div className="relative h-[40vh] overflow-hidden -mt-20 mb-16">
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-lg text-white/90">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHero;
