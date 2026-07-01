import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import { Link } from "react-router";
import { toReadableString } from "@/lib";

type TProductBreadcrumbProps = {
  title: string;
  category?: string;
};

export function ProductBreadcrumb({ title, category }: TProductBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {category && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/?category=${category}`}>
                  {toReadableString(category)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1 max-w-60">
            {title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
