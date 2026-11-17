import { Header } from "@/components/custom/header/header";

export default function Layout({children}: {children: React.ReactNode}) {
  return <>
    <div className="relative mx-5 md:mx-10 lg:mx-15">
      <div className='pt-4 md:pt-8'>
        <Header />
      </div>
      <main>
        {children}
      </main>
    </div>
  </>
}