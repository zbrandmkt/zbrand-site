import { redirect } from "next/navigation";

interface Props {
  params: { clientId: string };
}

export default function ClientAprovacoesPage({ params }: Props) {
  redirect(`/admin/calendario?clientId=${params.clientId}&status=pending_approval`);
}
