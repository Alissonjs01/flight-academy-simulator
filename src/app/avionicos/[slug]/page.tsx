import { notFound } from "next/navigation";
import { AvionicDetail } from "@/components/avionics/AvionicDetail";
import { getAvionicProfileBySlug } from "@/services/avionicsService";

export default async function AvionicDetailPage({ params }: { params: { slug: string } }) {
  const profile = await getAvionicProfileBySlug(params.slug);

  if (!profile) {
    notFound();
  }

  return <AvionicDetail profile={profile} />;
}
