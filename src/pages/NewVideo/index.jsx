import styled from "styled-components"
import Form from "../../components/Form"
import AddCategoryModal from "../../components/AddCategoryModal"
import { useState } from "react"
import { useVideosContext } from "../../context/Videos"

const StyledNewVideoContainer = styled.section`
  width: 100%;
  max-width: 1440px;
  margin: 90px auto 120px;
  padding: 0 10px;
  position: sticky;
`
const StyledTitle = styled.h2`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 20px;
`
const StyledParagraph = styled.p`
  text-align: center;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 40px;
`
const StyledFormContainer = styled.div`
  padding: 0 50px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const StyledSubTitle = styled.h3`
  padding: 15px;
  font-size: 2.25rem;
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-weight: 600;
  border-top: 3px solid #393939;
  border-bottom: 3px solid #393939;
  margin-bottom: 20px;
`
const StyledNewCategoryButton = styled.button`
  position: absolute;
  top: -80px;
  right: 20px;
  background-color: transparent;
  border: 3px solid #ffffff;
  border-radius: 10px;
  padding: 20px;
  color: #ffffff;
  font-size: 1rem;
`

const NewVideo = () => {
  const videoContext = useVideosContext()

  return (
    <StyledNewVideoContainer>
      <StyledTitle> NOVO VÍDEO </StyledTitle>
      <StyledParagraph>
        Preencha todo o formulário para criar um novo vídeo
      </StyledParagraph>
      <StyledFormContainer>
        <StyledSubTitle>CRIAR VIDEO</StyledSubTitle>
        <Form />
      </StyledFormContainer>
      <StyledNewCategoryButton onClick={() => videoContext.categoryModal(true)}>
        Nova Categoria
      </StyledNewCategoryButton>
      <AddCategoryModal />
    </StyledNewVideoContainer>
  )
}

export default NewVideo
