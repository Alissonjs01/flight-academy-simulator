import { notFound } from "next/navigation";
import { AircraftDetail } from "@/components/aircraft/AircraftDetail";
import { getAircraftProfileBySlug } from "@/services/aircraftService";

export default async function AircraftDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getAircraftProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  return <AircraftDetail profile={profile} />;
}
