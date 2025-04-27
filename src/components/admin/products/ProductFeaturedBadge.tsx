
interface ProductFeaturedBadgeProps {
  featured: boolean;
}

export const ProductFeaturedBadge = ({ featured }: ProductFeaturedBadgeProps) => {
  return featured ? (
    <span className="px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs">Sí</span>
  ) : (
    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">No</span>
  );
};
