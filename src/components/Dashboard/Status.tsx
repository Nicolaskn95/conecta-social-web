import { Check, CheckCircle, Info, XCircle } from "@phosphor-icons/react";
interface StatusProps {
  status: string;
}

function Status({ status }: StatusProps) {
  return (
    <div className="flex justify-center self-center py-1 text-sm text-success bg-success_light rounded-md">
      <Check size={20} className="text-success" />
      {status}
    </div>
  );
}

export default Status;
