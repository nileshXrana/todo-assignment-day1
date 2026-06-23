type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="min-h-screen  bg-gray-50">
      <h1 className="text-2xl max-h-[20vh] font-bold text-gray-900 p-4 border-b-2 border-gray-200 bg-blue-100 font-serif">
        This is the detail page for the todo item.
      </h1>
      <h1 className="text-6xl font-bold text-gray-900 flex items-center justify-center min-h-[80vh] font-serif">
        This todo is {slug}.
      </h1>
    </main>
  );
}