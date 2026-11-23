export default async function RecipeEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <h1>Form to add a recipe</h1>
      <p>Recipe id : {id}</p>
    </>
  )
}
