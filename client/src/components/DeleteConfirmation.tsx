import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Company } from "@shared/schema";

type DeleteConfirmationProps = {
  company: Company;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
};

export default function DeleteConfirmation({ company, onConfirm, onCancel, isPending }: DeleteConfirmationProps) {
  return (
    <AlertDialog open={!!company} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="bg-white rounded-lg max-w-md w-full mx-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-medium text-gray-900">
            Confirmar exclusão
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500">
            Tem certeza que deseja excluir a empresa "{company.name}"? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end">
          <AlertDialogCancel 
            onClick={onCancel}
            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            disabled={isPending}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
            disabled={isPending}
          >
            {isPending ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
