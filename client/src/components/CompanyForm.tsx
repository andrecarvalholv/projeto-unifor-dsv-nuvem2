import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertCompanySchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Company } from "@shared/schema";

// Extended schema with validation
const formSchema = insertCompanySchema.extend({
  name: z.string().min(1, "O nome da empresa é obrigatório"),
});

type CompanyFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  company: Company | null;
  onCancel: () => void;
  isPending: boolean;
};

export default function CompanyForm({ onSubmit, company, onCancel, isPending }: CompanyFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company?.name || "",
    },
  });

  // Update form when editing company changes
  useEffect(() => {
    if (company) {
      form.reset({ name: company.name });
    } else {
      form.reset({ name: "" });
    }
  }, [company, form]);

  return (
    <Card className="bg-white shadow rounded-lg mb-6">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          {company ? "Editar Empresa" : "Adicionar Empresa"}
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite o nome da empresa" 
                      {...field}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              {company && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="mr-3"
                >
                  Cancelar
                </Button>
              )}
              <Button 
                type="submit" 
                disabled={isPending}
                className="bg-primary text-white hover:bg-blue-700"
              >
                {isPending ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
