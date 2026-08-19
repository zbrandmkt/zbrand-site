import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropostaBySlug, getAllPropostaSlugs } from "@/data/propostas";
import { PropostaPage } from "./proposta-page";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPropostaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getPropostaBySlug(slug);

  if (!data) {
    return { title: "Proposta não encontrada" };
  }

  return {
    title: `Proposta · ${data.cliente.nome}`,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = getPropostaBySlug(slug);

  if (!data) {
    notFound();
  }

  return <PropostaPage data={data} />;
}
