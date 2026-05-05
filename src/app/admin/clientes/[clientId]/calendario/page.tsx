import { redirect } from "next/navigation";

interface Props {
  params: { clientId: string };
}

export default function ClientCalendarioPage({ params }: Props) {
  redirect(`/admin/calendario?clientId=${params.clientId}`);
}
