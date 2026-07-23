import { ReviewCenter } from "@/components/review/ReviewCenter";
import { getReviewReferenceData } from "@/services/reviewService";

export default async function ReviewPage() {
  const references = await getReviewReferenceData();

  return <ReviewCenter references={references} />;
}
