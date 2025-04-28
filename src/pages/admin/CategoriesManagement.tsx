
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Category } from "@/types/product";
import { categories as initialCategories } from "@/data/products";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const openAddDialog = () => {
    setFormData({ name: "", description: "", image: "" });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    if (!formData.name || !formData.description || !formData.image) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      });
      return;
    }

    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      image: formData.image,
    };

    setCategories((prev) => [...prev, newCategory]);
    setIsAddDialogOpen(false);
    toast({
      title: "Categoría creada",
      description: `La categoría "${formData.name}" ha sido creada exitosamente.`,
    });
  };

  const handleEditCategory = () => {
    if (!currentCategory || !formData.name || !formData.description || !formData.image) {
      toast({
        title: "Error",
        description: "Todos los campos son requeridos",
        variant: "destructive",
      });
      return;
    }

    const updatedCategory: Category = {
      ...currentCategory,
      name: formData.name,
      description: formData.description,
      image: formData.image,
    };

    setCategories((prev) =>
      prev.map((cat) => (cat.id === currentCategory.id ? updatedCategory : cat))
    );
    
    setIsEditDialogOpen(false);
    toast({
      title: "Categoría actualizada",
      description: `La categoría "${formData.name}" ha sido actualizada exitosamente.`,
    });
  };

  const handleDeleteCategory = () => {
    if (!currentCategory) return;
    
    setCategories((prev) => prev.filter((cat) => cat.id !== currentCategory.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Categoría eliminada",
      description: `La categoría "${currentCategory.name}" ha sido eliminada exitosamente.`,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-electroestelar-blue">Gestión de Categorías</h1>
          <Button onClick={openAddDialog}>
            <Plus className="mr-2 h-4 w-4" /> Nueva categoría
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Categorías existentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(category)}
                          className="text-red-500 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No hay categorías disponibles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Category Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Crear nueva categoría</DialogTitle>
              <DialogDescription>
                Completa el formulario para crear una nueva categoría de productos.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Electrodomésticos"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Breve descripción de la categoría"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">URL de la imagen</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Vista previa"
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddCategory}>Crear categoría</Button>
            </CardFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Category Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar categoría</DialogTitle>
              <DialogDescription>
                Actualiza los datos de la categoría seleccionada.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nombre</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="edit-image">URL de la imagen</Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Vista previa"
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditCategory}>Guardar cambios</Button>
            </CardFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Category Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro que deseas eliminar la categoría "{currentCategory?.name}"? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>

            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteCategory}
              >
                Eliminar
              </Button>
            </CardFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default CategoriesManagement;
