import { Skeleton } from '@/components/ui/skeleton'
import Course from './Course'

function MyLearning() {

  const isLoading = false
  const myLearningCourse =[]


  return (
    <div className='max-w-4xl mx-auto px-4 md:px-8'>
        <h1 className='text-2xl font-bold mt-20'>My learning</h1>
      <div className='mt-8'>
      {
        isLoading ? (
              <SkeletonCard />
        ) : myLearningCourse.length === 0 ? (<p>You are not enrolled in any course</p>) : 
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
         {myLearningCourse.map((item, idx) => <Course key={idx} course={course} />)}
        </div>
      }
      </div>
    </div>
  )
}



function SkeletonCard() {
  const arr = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {arr.map((item, idx) => {
        return (
          <div key={idx} className="space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[190px]" />
              <Skeleton className="h-4 w-[140px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}




export default MyLearning