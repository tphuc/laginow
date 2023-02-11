import Card from "@/components/home/card";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import { useSignInModal } from "@/components/layout/sign-in-modal";
import { AddBussiness } from "@/components/layout/add-business";

export default function Page() {

  const { data: session } = useSession()
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <Layout>
      <SignInModal />

      <div className="fixed top-0 h-screen w-full bg-gradient-to-br from-indigo-100 via-gray-50 to-cyan-150" />
      <div className="flex flex-col items-center justify-center">
        {session && <AddBussiness />}
        {!session?.user && <h6
          className="bg-gradient-to-br mt-10 from-indigo-800 to-slate-600 bg-clip-text text-center font-sm text-xl tracking-[-0.02em] text-transparent drop-shadow-sm md:text-4xl md:leading-[5rem]"
        >
          Cần phải đăng nhập trước
        </h6>}
      </div>
      <br />
    </Layout>
  );
}

