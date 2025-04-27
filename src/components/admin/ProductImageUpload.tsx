
import { Image, FileImage } from 'lucide-react';
import { FormLabel } from "@/components/ui/form";

interface ProductImageUploadProps {
  mainImage: File | null;
  additionalImages: File[];
  onMainImageChange: (file: File) => void;
  onAdditionalImagesChange: (files: File[]) => void;
}

const ProductImageUpload = ({
  mainImage,
  additionalImages,
  onMainImageChange,
  onAdditionalImagesChange,
}: ProductImageUploadProps) => {
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onMainImageChange(e.target.files[0]);
    }
  };

  const handleAdditionalImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (additionalImages.length + newImages.length <= 3) {
        onAdditionalImagesChange([...additionalImages, ...newImages]);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <FormLabel>Imagen Principal</FormLabel>
        <div
          className={`h-28 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-electroestelar-orange transition-colors ${
            mainImage ? "border-electroestelar-blue" : "border-gray-300"
          }`}
        >
          <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
            {mainImage ? (
              <img
                src={URL.createObjectURL(mainImage)}
                alt="Vista previa"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Image className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500">Imagen principal</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleMainImageUpload}
            />
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <FormLabel>Imágenes Adicionales</FormLabel>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`h-20 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-electroestelar-orange transition-colors ${
                additionalImages[index] ? "border-electroestelar-blue" : "border-gray-300"
              }`}
            >
              <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                {additionalImages[index] ? (
                  <img
                    src={URL.createObjectURL(additionalImages[index])}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <FileImage className="w-4 h-4 text-gray-400" />
                    <span className="text-[10px] text-gray-500">Imagen {index + 1}</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAdditionalImagesUpload}
                  disabled={additionalImages.length >= 3 && !additionalImages[index]}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageUpload;
