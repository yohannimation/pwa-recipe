export default function Layout({children}: {children: React.ReactNode}) {
  return <>
  <div className="flex-1 flex justify-center items-center">
    {children}
  </div>
  </>
}