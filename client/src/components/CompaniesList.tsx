import { Company } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

type CompaniesListProps = {
  companies: Company[];
  isLoading: boolean;
  onEdit: (company: Company) => void;
  onDelete: (company: Company) => void;
};

export default function CompaniesList({ companies, isLoading, onEdit, onDelete }: CompaniesListProps) {
  return (
    <Card className="shadow rounded-lg overflow-hidden">
      <CardHeader className="px-6 py-4 border-b border-gray-200">
        <CardTitle className="text-lg font-semibold">Lista de Empresas</CardTitle>
      </CardHeader>
      
      {/* Loading state */}
      {isLoading && (
        <CardContent className="p-8 text-center text-gray-500">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
          <p>Carregando empresas...</p>
        </CardContent>
      )}
      
      {/* Empty state */}
      {!isLoading && companies.length === 0 && (
        <CardContent className="p-8 text-center text-gray-500">
          <div className="text-4xl text-gray-300 mb-3 flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M1 21h22" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 10.5h10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 14.5h10" />
            </svg>
          </div>
          <p>Nenhuma empresa cadastrada.</p>
          <p className="text-sm">Adicione uma empresa utilizando o formulário.</p>
        </CardContent>
      )}
      
      {/* Data table - desktop view */}
      {!isLoading && companies.length > 0 && (
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome da Empresa
                </TableHead>
                <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            
            <TableBody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      onClick={() => onEdit(company)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-900"
                      onClick={() => onDelete(company)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Mobile view cards */}
      {!isLoading && companies.length > 0 && (
        <div className="block sm:hidden">
          <ul className="divide-y divide-gray-200">
            {companies.map((company) => (
              <li key={company.id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-900">{company.name}</p>
                  </div>
                  <div className="ml-3 flex-shrink-0 flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 text-blue-600 hover:text-blue-900"
                      onClick={() => onEdit(company)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-2 text-red-600 hover:text-red-900"
                      onClick={() => onDelete(company)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}
