import  SitebarMain from '@/Components/Sitebar/sitebarMain';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <SitebarMain />
      <main className="flex-1 p-4 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold">Bienvenido a la aplicación</h1>
      </main>
    </div>
  );
}
