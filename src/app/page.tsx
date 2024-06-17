import Link from "@/components/Link";
import { Flex, Heading } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <Heading size="5">Hello World</Heading>
      <Flex direction={"column"}>
        <Link href="/product">Product</Link>
        <Link href="/equipment">Equipment</Link>
        <Link href="/machine">Machine</Link>
        <Link href="/production-process">Production Process</Link>
      </Flex>
    </>
  );
}
