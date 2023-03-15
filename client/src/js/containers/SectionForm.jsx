import React from 'react'
import { Form } from './Form';
import { Navigation } from './Navigation';
import { Header } from '../../js/containers/Header'
import 'animate.css';

export const SectionForm = () => {
  
  return (
    <section className='container animate__animated animate__fadeIn'>
      <Header></Header>
      <Navigation></Navigation>
      <Form></Form>
      
    </section>
  )
}
