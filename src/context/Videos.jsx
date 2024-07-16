import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const videosApiUrl =
  "https://my-json-server.typicode.com/giovanneluna/alura-flix-api/videos"
const categoriesApiUrl =
  "https://my-json-server.typicode.com/giovanneluna/alura-flix-api/categories"
export const VideosContext = createContext()
VideosContext.displayName = "Videos"

export default function VideosProvider({ children }) {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get(videosApiUrl).then((response) => {
      setVideos(response.data)
    })
  }, [])

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(categoriesApiUrl).then((response) => {
      setCategories(response.data)
    })
  }, [])

  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)

  return (
    <VideosContext.Provider
      value={{
        videos,
        setVideos,
        categories,
        setCategories,
        selectedVideo,
        setSelectedVideo,
        isCategoryModalOpen,
        setIsCategoryModalOpen,
      }}
    >
      {children}
    </VideosContext.Provider>
  )
}

export function useVideosContext() {
  const { videos, setVideos } = useContext(VideosContext)
  const { categories, setCategories } = useContext(VideosContext)
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext)
  const { isCategoryModalOpen, setIsCategoryModalOpen } =
    useContext(VideosContext)

  function editCard(video) {
    video ? window.scrollTo(0, 350) : ""
    setSelectedVideo(video)
  }

  function categoryModal(boolean) {
    setIsCategoryModalOpen(boolean)
  }

  function addVideo(video) {
    axios
      .post(videosApiUrl, {
        title: video.title,
        cover: video.cover,
        link: video.link,
        gender: video.gender,
        description: video.description,
      })
      .then((response) => {
        setVideos([...videos, response.data])
        alert("Video Adicionado com Sucesso!")
      })
      .catch(() =>
        alert("Houve um erro ao adicionar o video, tente novamente!")
      )
  }

  function updateVideo(video) {
    axios
      .put(`${videosApiUrl}/${video.id}`, {
        title: video.title,
        cover: video.cover,
        link: video.link,
        gender: video.gender,
        description: video.description,
      })
      .then(() => {
        setVideos(
          videos.map((thisvideo) =>
            thisvideo.id === video.id ? video : thisvideo
          )
        )
        alert("Video editado com sucesso!")
      })
      .catch(() => alert("Houve um erro ao editar o video. Tente novamente"))
  }

  function deleteVideo(video) {
    axios
      .delete(`${videosApiUrl}/${video.id}`)
      .then(() => {
        setVideos(videos.filter((thisvideo) => thisvideo.id !== video.id))
      })
      .catch(() =>
        alert("Houve um problema ao deletar o video. Tente novamente")
      )
  }

  function addCategory(category) {
    axios
      .post(categoriesApiUrl, {
        gender: category.gender,
        color: category.color,
      })
      .then((response) => {
        setCategories([...categories, response.data])
        alert("Categoria Adicionada com Sucesso!")
      })
      .catch(() =>
        alert("Houve um erro ao adicionar a categoria, tente novamente!")
      )
  }

  return {
    videos,
    categories,
    selectedVideo,
    isCategoryModalOpen,
    categoryModal,
    editCard,
    addVideo,
    updateVideo,
    deleteVideo,
    addCategory,
  }
}
