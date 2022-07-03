import React from 'react'
import { sanityClient } from '../../sanity'

const Property = ({
    title,
    location, 
    propertyType,
    mainImage,
    images,
    pricePerNignt,
    bedrooms,
    description,
    host,
    reviews
}) => {
  return (
    <div className='container'>
        <h1><b>{title}</b></h1>
        <h2><b>{propertyType} hosted by {host?.name}</b></h2>
        <h4>{bedrooms} bedrooms</h4>
        
    </div>
  )
}

export const getServerSideProps = async (pageContext) => {
    const pageSlug = pageContext.query.slug
    
    const query = `*[_type == "property" && slug.current == $pageSlug][0]{
        title,
        location, 
        propertyType,
        mainImage,
        images,
        pricePerNignt,
        bedrooms,
        description,
        host-> {
            _id, 
            name,
            slug,
            image
        },
        reviews[]{
            ...,
            traveller=>{
                _id,
                name,
                slug,
                image
            }
        }
    }`

    const property = await sanityClient.fetch(query, {pageSlug})

    //console.log(property)
    if(!property){
        return {
            props : null,
            notFound : true,
        }
    }else{
        return {
            props : {
                title : property.title,
                location : property.location,
                bedrooms : property.bedrooms,
                host : property.host,
                propertyType : property.propertyType,
                mainImage : property.mainImage,
                images : property.images,
                pricePerNignt : property.pricePerNignt,
                reviews : property.reviews,
                description : property.description
            }
        }
    }
}

export default Property