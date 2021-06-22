
import React, { useRef, useState } from "react";
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import "./Carousel.css";


// import Swiper core and required modules
import SwiperCore, { Navigation } from 'swiper/core';
import { OfferCard } from "../OfferCard/OfferCard";

// install Swiper modules
SwiperCore.use([Navigation]);


export const Carousel  = (props) => {
    const gpus = props.cards;

    const renderCards = () => {
        if(gpus.length) {
            return gpus.map(gpu => {
                return (
                    <SwiperSlide>
                        <article>
                            <img src={gpu.imgURL} />
                            <h6>{gpu.supplier.name} {gpu.name}</h6>
                            <div className="buttons">
                                {renderButtons(gpu)}
                            </div>
                        </article>
                    </SwiperSlide> 
                )
            })
        }
    }

    const renderButtons = (gpu) => {
        if (props.view === 'manage') {
            return (
                <>
                    <button onClick={() => props.openForm(gpu)}>Edit</button>
                    <button onClick={() => props.onDelete(gpu.id)}>Delete</button>
                </>
            )
        } else {
            return (
                <>
                    <Link to={`/product/${gpu.id}`}>
                        <button>Info</button>
                    </Link>
                    {renderReserveButton(gpu)}
                </>
            )
        }
    }

    const renderReserveButton = (gpu) => {
        if(gpu.reserved) {
            return <button className='disabled'>Reserved</button>
        } else {
            return (
                <button
                    className='primary' 
                    onClick={() => props.startRes(gpu)}>
                    Reserve
                </button>
            )
        }
    }

  return (
    <>
        <Swiper slidesPerView={'auto'} centeredSlides={true} spaceBetween={30} slidesPerGroup={1} loop={true} loopFillGroupWithBlank={true} navigation={true} className="mySwiper">
            {renderCards()}
            <SwiperSlide/>
        </Swiper>
    </>
  )
}