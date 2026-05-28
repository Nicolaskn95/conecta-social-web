'use client';

interface FormActionBarProps {
   onCancel: () => void;
   isLoading?: boolean;
   submitLabel: string;
   loadingLabel?: string;
   cancelLabel?: string;
   cancelWidthClassName?: string;
   submitWidthClassName?: string;
}

export default function FormActionBar({
   onCancel,
   isLoading = false,
   submitLabel,
   loadingLabel = 'Salvando...',
   cancelLabel = 'Cancelar',
   cancelWidthClassName = 'w-32',
   submitWidthClassName = 'w-32',
}: FormActionBarProps) {
   return (
      <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white">
         <button
            type="button"
            className={`btn-danger text-white ${cancelWidthClassName}`}
            onClick={onCancel}
            disabled={isLoading}
         >
            {cancelLabel}
         </button>
         <button
            type="submit"
            className={`btn-primary ${submitWidthClassName}`}
            disabled={isLoading}
         >
            {isLoading ? loadingLabel : submitLabel}
         </button>
      </div>
   );
}
