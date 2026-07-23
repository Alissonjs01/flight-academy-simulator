import { notFound } from "next/navigation";
import { AircraftDetail } from "@/components/aircraft/AircraftDetail";
import { getAircraftProfileBySlug } from "@/services/aircraftService";

export default async function AircraftDetailPage({ params }: { params: { slug: string } }) {
  const profile = await getAircraftProfileBySlug(params.slug);

  if (!profile) {
    notFound();
  }

  return <AircraftDetail profile={profile} />;
}
