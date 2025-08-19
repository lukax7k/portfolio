import { useNavigate } from 'react-router-dom'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  image: string
}

const ProjectCard = ({ id, title, description, image }: ProjectCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/projeto/${id}`)}
      className="bg-white rounded-lg shadow hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  )
}

export default ProjectCard
