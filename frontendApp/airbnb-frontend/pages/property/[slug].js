import React from 'react'
import Image from '../../components/Image';
import { sanityClient } from '../../sanity'
import { isMultiple } from '../../utils'
import Link from 'next/link';
import Review from '../../components/Review';

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

    const reviewAMount = reviews ? reviews.length : 0;
    console.log(images)
  return (
    <div className='container'>
        <h1>
            <b>{title}</b>
        </h1>
        <p>
            {reviewAMount} review{isMultiple(reviewAMount)}
        </p>
        <div className='images-section'>
            <Image identifier="main-image" image={mainImage}/>
            {images.map(({_key, asset}, image)=>(
                <Image key={_key} identifier="image" image={asset}/>
            ))}
        </div>

        <div className="section">
        <div className="information">
          <h2>
            <b>
              {propertyType} hosted by {host?.name}
            </b>
          </h2>
          <h4>
            {bedrooms} bedroom{isMultiple(bedrooms)}
          </h4>
          <hr />
          <h4>
            <b>Enhanced Clean</b>
          </h4>
          <p>
            This host is committed to Airbnb's 5-step enhanced cleaning process.
          </p>
          <h4>
            <b>Amenities for everyday living</b>
          </h4>
          <p>
            The host has equipped this place for long stays - kitchen, shampoo,
            conditioner, hairdryer included.
          </p>
          <h4>
            <b>House rules</b>
          </h4>
          <p>
            This place isn't suitable for pets andthe host does not allow
            parties or smoking.
          </p>

        </div>
        <div className="price-box">
          <h2>£{pricePerNignt}</h2>
          <h4>
            {reviewAMount} review{isMultiple(reviewAMount)}
          </h4>
          <Link href="/">
            <div className="button link">Change Dates</div>
          </Link>
        </div>

        
      </div>
      <hr />
        <h4>{description}</h4>
        
        <hr />
        <h2>{reviewAMount} review{isMultiple(reviewAMount)}</h2>
        {reviewAMount > 0 && reviews.map((review) => <Review key={review._key} review={review}/>)}


    <hr />
    <h2>Location</h2>
    <h4>{location.lat}, {location.lng}</h4>
    
            
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
            traveller->{
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