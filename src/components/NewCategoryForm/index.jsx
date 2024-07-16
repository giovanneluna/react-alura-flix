import styled from "styled-components"
import FormInput from "../Form/FormInput"
import { useState } from "react"
import { useVideosContext } from "../../context/Videos"

const StyledNewCategoryForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: 575px;
  margin: 0 auto;
`
const StyledNewCategoryButton = styled.button`
  width: 180px;
  height: 54px;
  background-color: transparent;
  font-size: 1.25rem;
  font-weight: 900;
  color: #ffffff;
  border: 3px solid #2271d1;
  border-radius: 15px;
  align-self: center;
  cursor: pointer;
`
const NewCategoryForm = () => {
  const videoContext = useVideosContext()
  const [newCategory, setNewCategory] = useState("")
  const [newColor, setNewColor] = useState("#000000")

  function formSubmit(event) {
    event.preventDefault()
    const addCategory = {
      gender: newCategory,
      color: newColor,
    }
    videoContext.addCategory(addCategory)
    videoContext.categoryModal(false)
  }

  return (
    <StyledNewCategoryForm onSubmit={(event) => formSubmit(event)}>
      <FormInput
        color="#6BD1FF"
        label="Nova Categoria"
        id="newCategory"
        type="text"
        value={newCategory}
        placeholder="Insira o nome da Categoria"
        handleChange={(value) => setNewCategory(value)}
      />
      <FormInput
        color="#6BD1FF"
        label="Cor da Categoria"
        id="newCategory"
        type="color"
        value={newColor}
        handleChange={(value) => setNewColor(value)}
      />
      <StyledNewCategoryButton type="submit">Cadastrar</StyledNewCategoryButton>
    </StyledNewCategoryForm>
  )
}

export default NewCategoryForm
