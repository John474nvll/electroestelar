
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Phone, Mail, MapPin } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  phone: z.string().min(10, {
    message: "Ingresa un número de teléfono válido.",
  }),
  email: z.string().email({
    message: "Ingresa un correo electrónico válido.",
  }),
  address: z.string().min(5, {
    message: "Ingresa una dirección válida.",
  }),
  city: z.string().min(2, {
    message: "Ingresa una ciudad válida.",
  }),
});

const UserProfile = () => {
  // Mock data - this would come from your backend
  const defaultValues = {
    fullName: "Juan Pérez",
    phone: "3107722311",
    email: "juan@example.com",
    address: "Calle 123 #45-67",
    city: "Bogotá",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would update the user profile in your backend
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-electroestelar-blue mb-6">
        Mi Perfil
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres Completos</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} className="pl-10" />
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} className="pl-10" />
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} className="pl-10" />
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} className="pl-10" />
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} className="pl-10" />
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Guardar Cambios
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserProfile;
