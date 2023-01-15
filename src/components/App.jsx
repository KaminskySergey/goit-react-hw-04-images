
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import {Loader} from './Loader/Loader';

import { Container } from './App.styled';
import {Toast} from './ToastContainer/ToastContainer'
import Modal from './Modal/Modal';
import ModalInfo from './Modal/ModalInfo';
import { useState, useEffect } from 'react';




const KEY = '31274653-67696640fdcd1e011de901f6c'
const BASE_URL = 'https://pixabay.com/api/?'

export const  App = () => {
  const [name, setName] = useState('')
  const [page, setPage] = useState(1)
  const [image, setImage] = useState([])
  const [isLoader, setIsLoader] = useState(false)
  const [imageHits, setImageHits] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [url, setUrl] = useState('')
  const [alt, setAlt] = useState('')
  
  
  const addFormState = (data) => {
    setName(data)
    setPage(1)
    setImage([])
    }

  const loadMore = () => {
    setPage(pS => pS + 1)
  }
  
  

  useEffect(() => {
    if(!name){
      return;
    }
    const fetchData = async () => {
      setIsLoader(true)
      
    try {
        const {data} = await axios.get(`${BASE_URL}q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        setImage(pS => [...pS, ...data.hits])
        setImageHits(data)
        if(page === 1){
          toast.success(`Found ${data.total} photos`)
        }

        
        
        
      
      } 
    catch (error) {
      setImage([])
        toast.error('We were unable to process your request')
      } 
    finally {
        setIsLoader(false)
      }
  }
    fetchData()
    
  }, [ name, page]);


  const toggleModal = () => {
    setShowModal(pS => !pS)
    
}
  const handleModalInfo = (url, alt) => {
    toggleModal()
    setUrl(url)
    setAlt(alt)
  }


  return (
      <Container>
      <Searchbar onSubmit={addFormState}/>
      {<ImageGallery>
      { <ImageGalleryItem img={image} handleModalInfo={handleModalInfo}/>}
      </ImageGallery> }
      <Loader visible={isLoader}/>
      { <Toast />}
      {showModal && <Modal onClose={toggleModal}>
        <ModalInfo url={url} alt={alt}/>
        </Modal>}
      {image.length === 0 || imageHits.totalHits ===  image.length ||  <Button onClick={loadMore}/>}
      </Container>
    );
  }
