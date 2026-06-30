import { ShoppingCart } from "lucide-react";
import { Badge, Button } from "../ui";
import { Link } from "react-router";
import { useProductFilter } from "@/contexts/product/useProductFilters";

export function Cart() {
    const { cartItems } = useProductFilter();
    const totalItems = cartItems.length;
    const hasTotalItems = totalItems > 0;

    return <div className="relative"><Link to="/cart">
        {hasTotalItems && <Badge className="absolute -top-2 -right-2 text-xs">{totalItems}</Badge>}
        <Button variant="outline"><ShoppingCart /></Button></Link>
    </div>
}