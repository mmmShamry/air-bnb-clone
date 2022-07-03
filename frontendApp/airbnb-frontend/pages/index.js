import React from 'react'
import { sanityClient,urlFor } from '../sanity'
import Link from 'next/link'

const Home = ({properties}) => {
  console.log(properties)
  return (
    <>
      {properties && (
        <div className='main'>
          <div className='feed-container'>
              <h1>Places to stay near you</h1>
              <div className='feed'>
                {properties.map((property, index) =>(
                  <Link href={`property/${property.slug.current}`}>
                  <div key={property._id} className='card link'>
                    <img src={urlFor(property.mainImage)}/>
                    <p>{property.reviews.length} review</p>
                    <h3>{property.title}</h3>
                    <h3>{property.pricePerNignt}/per Night</h3>
                  </div>
                  </Link>
                ))}
              </div>
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
    const query = '*[ _type == "property"]'
    const properties = await sanityClient.fetch(query)

    if(!properties.length){
      return {
        props : {
          properties : [],
        },
      }
    }else {
      return {
        props : {
          properties 
        }
      }
    }
}

export default Home
