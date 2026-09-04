import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getIdVisualBySlug,
  getAllIdVisualSlugs,
} from "@/data/propostas-idvisual";
import { IdVisualPage } from "./idvisual-page";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllIdVisualSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getIdVisualBySlug(slug);

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
  const data = getIdVisualBySlug(slug);

  if (!data) {
    notFound();
  }

  return <IdVisualPage data={data} />;
}
