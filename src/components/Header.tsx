import React from "react";
import {
  Link as RadixLink,
  Button as RadixButton,
} from "@radix-ui/react-toolbar";
import * as Toolbar from "@radix-ui/react-toolbar";
import Link from "next/link";
import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";

const Header = () => {
  return (
    <Toolbar.Root className="flex justify-between items-center p-4 bg-[#D2E6EF] shadow-md sticky top-0 z-50">
      <Box>
        <Avatar
          size={"4"}
          src="/images/logo.svg"
          fallback={"logo"}
          variant="soft"
          color="sky"
        />
      </Box>
      <Flex align={"center"} gap={"7"} direction={"row"}>
        <Button
          asChild
          style={{ marginRight: 10 }}
          variant="ghost"
          color="blue"
        >
          <Link href="/" passHref>
            <Text>Home</Text>
          </Link>
        </Button>

        <Button
          asChild
          style={{ marginRight: 10 }}
          variant="ghost"
          color="blue"
        >
          <Link href="/about" passHref>
            <Text>Sobre</Text>
          </Link>
        </Button>

        <Button
          asChild
          style={{ marginRight: 10 }}
          variant="ghost"
          color="blue"
        >
          <Link href="/contactUs" passHref>
            <Text>Fale Conosco</Text>
          </Link>
        </Button>

        <Button
          asChild
          style={{ marginRight: 10 }}
          variant="solid"
          className="w-40"
        >
          <Link href="/login" passHref>
            <Text>ENTRAR</Text>
          </Link>
        </Button>
      </Flex>
    </Toolbar.Root>
  );
};

export default Header;
