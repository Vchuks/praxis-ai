import { useCoursesStore } from "@/stores/courses.store"

function CourseProgress() {
  // Only subscribes to what it needs
  const { currentCourse } = useCoursesStore()
  const { courseProgress } = useCoursesStore(state => ({
    courseProgress: state.courseProgress[state.currentCourse?.id] || {}
  }))
  const { updateProgress } = useCoursesStore()
  
  const completedModules = Object.values(courseProgress).filter(p => p.completed).length
  const totalModules = currentCourse?.modules?.length || 0
  const progressPercentage = (completedModules / totalModules) * 100
  
  return (
    <div>
      <h3>{currentCourse?.title}</h3>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p>{completedModules}/{totalModules} modules completed</p>
    </div>
  )
}

export default CourseProgress