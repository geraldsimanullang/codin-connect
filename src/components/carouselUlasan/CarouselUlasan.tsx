"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/controller";
import styles from "./carousel2.module.css";
import {
  EffectFade,
  EffectCube,
  Controller,
  Mousewheel,
  Autoplay,
} from "swiper/modules";
import { Swiper as SwiperCore } from "swiper/types";

export default function UlasanCarousel() {
  const [textSlider, setTextSlider] = useState<SwiperCore | null>(null);
  const [cubeSlider, setCubeSlider] = useState<SwiperCore | null>(null);

  return (
    <>
      <div className={styles.section}>
        {/* Slider teks berisi nama, peran, dan deskripsi */}
        <Swiper
          modules={[EffectFade, Controller, Mousewheel, Autoplay]}
          onSwiper={setTextSlider}
          controller={{ control: cubeSlider }}
          effect="fade"
          loop
          speed={800}
          mousewheel
          autoplay={{
            delay: 4000,
            pauseOnMouseEnter: true,
          }}
          className={styles.textSlider}
        >
          <SwiperSlide className={styles.swiperSlide}>
            <h1 className={styles.h1}>Gerald Simanullang - Project Leader</h1>
            <p className={styles.p1}>
              Gerald is the project leader. He is responsible for team
              coordination and strategic decision making.
            </p>
            <p className={styles.p1}>
              Gerald ensures the project runs according to plan and on time.
            </p>
          </SwiperSlide>

          <SwiperSlide className={styles.swiperSlide}>
            <h1 className={styles.h2}>
              Muhammad Dicky Taruna - Lead Developer
            </h1>
            <p className={styles.p2}>
              Dicky is a developer who works on system architecture and
              implementation of key features.
            </p>
            <p className={styles.p2}>
              He is a development team and does code reviews.
            </p>
          </SwiperSlide>

          <SwiperSlide className={styles.swiperSlide}>
            <h1 className={styles.h3}>Reiza Akbar - UI/UX Designer</h1>
            <p className={styles.p3}>
              Reiza designs the user interface and ensures optimal user
              experience.
            </p>
            <p className={styles.p3}>
              His creative design provides a modern and intuitive look.
            </p>
          </SwiperSlide>

          <SwiperSlide className={styles.swiperSlide}>
            <h1 className={styles.h3}>ST Fatimah Zahrah - UI/UX Designer</h1>
            <p className={styles.p3}>
              Zahrah designs the user interface and ensures optimal user
              experience.
            </p>
            <p className={styles.p3}>
              Her creative design provides a modern and intuitive look.
            </p>
          </SwiperSlide>

          <SwiperSlide className={styles.swiperSlide}>
            <h1 className={styles.h4}>Fajri Prawira - Quality Assurance</h1>
            <p className={styles.p4}>
              Fajri is responsible for testing the quality and performance of
              the application, ensuring everything runs smoothly.
            </p>
            <p className={styles.p4}>
              He makes sure no bugs are missed before release.
            </p>
          </SwiperSlide>
        </Swiper>

        {/* Slider gambar berisi foto anggota tim */}
        <Swiper
          modules={[EffectCube, Controller, Mousewheel]}
          onSwiper={setCubeSlider}
          controller={{ control: textSlider }}
          effect="cube"
          grabCursor
          loop
          speed={800}
          mousewheel
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 100,
            shadowScale: 0.94,
          }}
          breakpoints={{
            300: {
              cubeEffect: {
                shadowOffset: 60,
              },
            },
            600: {
              cubeEffect: {
                shadowOffset: 100,
              },
            },
          }}
          className={styles.cubeSlider}
        >
          <SwiperSlide>
            <img
              src="https://i.pinimg.com/474x/fb/a5/81/fba5817a4e71c9381fc3ab5895b330cc.jpg"
              alt="Gerald"
              className={styles.img}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://i.pinimg.com/474x/bc/61/35/bc61356eb64b6aa114dabca6550950d0.jpg"
              alt="Dicky"
              className={styles.img}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://i.pinimg.com/474x/5e/f8/1d/5ef81d26d06f1dd9016e77a6cc94d85d.jpg"
              alt="Reiza"
              className={styles.img}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://i.pinimg.com/474x/46/dd/e8/46dde814ae7a42f29166691d2b45e7e9.jpg"
              alt="Zahrah"
              className={styles.img}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://i.pinimg.com/474x/44/df/8c/44df8cbaf3f31b4ee4210b7fcb051514.jpg"
              alt="Fajri"
              className={styles.img}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
