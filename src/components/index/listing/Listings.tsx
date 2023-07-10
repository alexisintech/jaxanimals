import { api } from "~/utils/api";
import UniqueListing from "./UniqueListing";

export default function Listings() {
  const { data: listings } = api.listing.getAll.useQuery();

  return (
    <div className="flex">
      {listings?.map((listing) => (
        <UniqueListing key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
