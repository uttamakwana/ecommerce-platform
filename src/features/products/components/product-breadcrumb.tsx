import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui";
import { Link } from "react-router";

type TProductBreadcrumbProps = {
    title: string;
}
export function ProductBreadcrumb({ title }: TProductBreadcrumbProps) {
    return <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <Link to="/">
                    <BreadcrumbLink>Home</BreadcrumbLink></Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <Link to="/">
                    <BreadcrumbLink>Products</BreadcrumbLink>
                </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
    </Breadcrumb>
}