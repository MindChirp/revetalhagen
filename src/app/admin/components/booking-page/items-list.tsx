import BookableItemCard from "@/app/utleie/components/bookable-item-card";
import Banner from "@/components/ui/banner";
import { Card } from "@/components/ui/card";
import Illustration from "@/components/ui/illustration";
import { SimpleBookableItemDto } from "@/lib/api";

interface ItemsListProps {
  items: SimpleBookableItemDto[];
}
export default function ItemsList({ items }: ItemsListProps) {
  return (
    <div className="grid md:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-2.5">
      {items.map((item, index) => (
        <BookableItemCard type="admin" item={item} key={index} />
      ))}
      {!Boolean(items.length) && (
        <Banner>
          <Illustration src="empty-cart.svg" />
          Det finnes ingen gjenstander enda
        </Banner>
      )}
    </div>
  );
}
