import Link from "@/components/Link";
import { Heading } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <Heading size="5">Hello World</Heading>
      <Link href="/product">Product</Link>
    </>
  )
}
