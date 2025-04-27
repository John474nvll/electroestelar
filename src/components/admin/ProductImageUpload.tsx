
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, ImageIcon, X } from "lucide-react";

interface ProductImageUploadProps {
  mainImage: File | null;
  additionalImages: File[];
  onMainImageChange: (image: File | null) => void;
  onAdditionalImagesChange: (images: File[]) => void;
  existingMainImageUrl?: string;
}

const ProductImageUpload = ({
  mainImage,
  additionalImages,
  onMainImageChange,
  onAdditionalImagesChange,
  existingMainImageUrl,
}: ProductImageUploadProps) => {
  const [mainImagePreview, setMainImagePreview] = useState<string>("");
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    // Set main image preview
    if (mainImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(mainImage);
    } else if (existingMainImageUrl) {
      setMainImagePreview(existingMainImageUrl);
    } else {
      setMainImagePreview("");
    }

    // Set additional image previews
    const previews: string[] = [];
    additionalImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result as string);
        if (previews.length === additionalImages.length) {
          setAdditionalImagePreviews([...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [mainImage, additionalImages, existingMainImageUrl]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onMainImageChange(e.target.files[0]);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...additionalImages, ...newFiles];
      
      // Limit to 3 additional images
      if (totalFiles.length > 3) {
        alert("Solo se permiten hasta 3 imágenes adicionales");
        onAdditionalImagesChange(totalFiles.slice(0, 3));
      } else {
        onAdditionalImagesChange(totalFiles);
      }
    }
  };

  const removeAdditionalImage = (index: number) => {
    const newImages = [...additionalImages];
    newImages.splice(index, 1);
    onAdditionalImagesChange(newImages);
  };

  const removeMainImage = () => {
    onMainImageChange(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold mb-2">Imagen Principal</p>
        <div className="flex items-center space-x-4">
          {mainImagePreview ? (
            <div className="relative">
              <img
                src={mainImagePreview}
                alt="Vista previa"
                className="h-24 w-24 object-cover rounded border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6"
                onClick={removeMainImage}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="h-24 w-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded">
              <ImageIcon className="h-10 w-10 text-gray-400" />
            </div>
          )}
          <div>
            <Input
              id="mainImage"
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("mainImage")?.click()}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              {mainImagePreview ? "Cambiar imagen" : "Subir imagen"}
            </Button>
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-2">Imágenes Adicionales (Max. 3)</p>
        <div className="flex flex-wrap gap-4">
          {additionalImagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Adicional ${index + 1}`}
                className="h-16 w-16 object-cover rounded border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-5 w-5"
                onClick={() => removeAdditionalImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          {additionalImages.length < 3 && (
            <div>
              <Input
                id="additionalImages"
                type="file"
                multiple
                accept="image/*"
                onChange={handleAdditionalImagesChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="h-16 w-16"
                onClick={() => document.getElementById("additionalImages")?.click()}
              >
                <ImagePlus className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImageUpload;
