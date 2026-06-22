type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-900">
        {slug}
      </h1>
    </main>
  );
}
