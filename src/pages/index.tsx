import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const tils = api.til.getAllTils.useQuery();

  return <div></div>;
}
