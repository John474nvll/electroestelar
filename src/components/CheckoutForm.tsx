
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const formSchema = z.object({
  // Datos de contacto
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().min(10, "Número de teléfono inválido"),
  name: z.string().min(2, "Nombre muy corto"),
  
  // Datos de envío
  address: z.string().min(5, "Dirección muy corta"),
  city: z.string().min(3, "Ciudad inválida"),
  neighborhood: z.string().min(3, "Barrio inválido"),
  additionalInfo: z.string().optional(),
  
  // Método de pago
  paymentMethod: z.enum(["creditCard", "nequi", "pse", "sistecredito", "cashOnDelivery"])
});

const CheckoutForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      name: "",
      address: "",
      city: "",
      neighborhood: "",
      additionalInfo: "",
      paymentMethod: "creditCard"
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast.success("Procesando tu orden", {
      description: "Serás redirigido al método de pago seleccionado."
    });
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Sección de Contacto */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-electroestelar-blue">1. Datos de Contacto</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="tucorreo@ejemplo.com" {...field} />
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
                    <Input placeholder="3101234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Sección de Envío */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-electroestelar-blue">2. Datos de Envío</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle / Carrera / Avenida" {...field} />
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
                    <Input placeholder="Tu ciudad" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barrio</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu barrio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Información adicional (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartamento, oficina, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Sección de Método de Pago */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-electroestelar-blue">3. Método de Pago</h2>
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="creditCard" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Tarjeta de Crédito/Débito
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="nequi" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Nequi
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="pse" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        PSE
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sistecredito" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Sistecredito
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="cashOnDelivery" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Contra Entrega
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-electroestelar-orange hover:bg-electroestelar-orange/90"
        >
          Continuar con el pago
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
