import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

function RecipeCardLoading() {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative aspect-video w-full">
        <Skeleton className='absolute inset-0 rounded-none' />
      </div>

      <CardHeader>
        <CardTitle>
          <Skeleton className='h-7 w-32' />
        </CardTitle>
        <CardDescription>
          <Skeleton className='h-5 w-64 bg-white' />
        </CardDescription>
      </CardHeader>

      <CardContent>
      <Skeleton className='h-6 w-full' />
      </CardContent>

      <CardFooter className="justify-end">
        <Skeleton className='h-9 w-32' />
      </CardFooter>
    </Card>
  )
}

export { RecipeCardLoading }
