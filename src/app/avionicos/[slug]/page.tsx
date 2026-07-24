import { notFound } from "next/navigation";
import { AvionicDetail } from "@/components/avionics/AvionicDetail";
import { getAvionicProfileBySlug } from "@/services/avionicsService";

export default async function AvionicDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getAvionicProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  return <AvionicDetail profile={profile} />;
}
