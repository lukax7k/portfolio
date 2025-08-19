import { useParams, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return <div className="p-10 text-center text-red-500">Projeto não encontrado.</div>
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-500 hover:underline"
      >
        ← Voltar
      </button>

      <div className="max-w-4xl mx-auto">
        <img src={project.image} alt={project.title} className="w-full rounded-lg shadow" />
        <h1 className="text-3xl font-bold mt-6 text-gray-800">{project.title}</h1>
        <p className="mt-4 text-gray-700">{project.description}</p>
      </div>
    </div>
  )
}

export default ProjectPage
