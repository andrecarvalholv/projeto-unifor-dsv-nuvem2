import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Company } from "@shared/schema";
import CompanyForm from "@/components/CompanyForm";
import CompaniesList from "@/components/CompaniesList";
import DeleteConfirmation from "@/components/DeleteConfirmation";

export default function Home() {
  const { toast } = useToast();
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  // Fetch companies
  const { data: companies = [], isLoading } = useQuery({
    queryKey: ["/api/companies"],
  });

  // Create company mutation
  const createCompanyMutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      const response = await apiRequest("POST", "/api/companies", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Empresa criada com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/companies"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: `Erro ao criar empresa: ${error.message}`,
      });
    },
  });

  // Update company mutation
  const updateCompanyMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { name: string } }) => {
      const response = await apiRequest("PUT", `/api/companies/${id}`, data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Empresa atualizada com sucesso",
      });
      setEditingCompany(null);
      queryClient.invalidateQueries({ queryKey: ["/api/companies"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: `Erro ao atualizar empresa: ${error.message}`,
      });
    },
  });

  // Delete company mutation
  const deleteCompanyMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/companies/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Empresa excluída com sucesso",
      });
      setCompanyToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["/api/companies"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erro",
        description: `Erro ao excluir empresa: ${error.message}`,
      });
    },
  });

  const handleSubmit = (data: { name: string }) => {
    if (editingCompany) {
      updateCompanyMutation.mutate({ id: editingCompany.id, data });
    } else {
      createCompanyMutation.mutate(data);
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
  };

  const handleDelete = (company: Company) => {
    setCompanyToDelete(company);
  };

  const confirmDelete = () => {
    if (companyToDelete) {
      deleteCompanyMutation.mutate(companyToDelete.id);
    }
  };

  const cancelDelete = () => {
    setCompanyToDelete(null);
  };

  const cancelEdit = () => {
    setEditingCompany(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Gerenciador de Empresas</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Company Form */}
            <div className="lg:col-span-1">
              <CompanyForm 
                onSubmit={handleSubmit} 
                company={editingCompany} 
                onCancel={cancelEdit}
                isPending={createCompanyMutation.isPending || updateCompanyMutation.isPending}
              />
            </div>

            {/* Companies List */}
            <div className="lg:col-span-2">
              <CompaniesList 
                companies={companies} 
                isLoading={isLoading} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-sm text-gray-500">CRUD Básico de Empresas - Criado para Vercel</p>
        </div>
      </footer>

      {/* Delete Confirmation Modal */}
      {companyToDelete && (
        <DeleteConfirmation 
          company={companyToDelete} 
          onConfirm={confirmDelete} 
          onCancel={cancelDelete}
          isPending={deleteCompanyMutation.isPending} 
        />
      )}
    </div>
  );
}
