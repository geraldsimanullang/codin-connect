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
            <h1 className={styles.h1}>
              Monster Energy Yamaha MotoGP Team Polo
            </h1>
            <p className={styles.p1}>
              Whether you're trackside or hitting the streets in style you can
              easily carry your passion for MotoGP™ and the Monster Energy
              Yamaha team with the official replica teamwear range. The team
              polo features a quarter zip closure at the neck allowing you to
              adjust it as you need, along with a polo-style collar featuring
              team and sponsor branding. A team patch on the chest and graphic
              details on the chest, back and sleeves add genuine MotoGP™ style.
            </p>
            <p className={styles.p1}>
              This item will ship within 6 business days. Please proceed to
              checkout for shipping options and additional transit times.
            </p>
            <p className={styles.p1}>#SemakinDiDepan</p>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <h1 className={styles.h2}>
              Repsol Honda 2024 Team Rider Polo - Red
            </h1>
            <p className={styles.p2}>
              Stand out from the crowd in this Honda Repsol Marc Marquez polo
              shirt a unique design crafted exclusively for our Repsol Honda
              Replica racing collection. Precision-engineered with a self-fabric
              collar and concealed button placket for adjustability, this polo
              elevates any trackside ensemble, while its abstract screen-printed
              graphic ensures you never blend in.
            </p>
            <p className={styles.p2}>
              This item will ship within 1 business day. Please proceed to
              checkout for shipping options and additional transit times.
            </p>
            <p className={styles.p2}>#RepsolHondaTeam</p>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <h1 className={styles.h3}>
              VR46 Racing Valentino Rossi x Monster Poly T-Shirt.
            </h1>
            <p className={styles.p3}>
              Stay cool and comfortable in the heat with these MotoGP™ shorts.
              The racing style means you'll feel ready for anything when the
              heat is turned up!.
            </p>
            <p className={styles.p3}>
              This item will ship within 1 business day. Please proceed to
              checkout for shipping options and additional transit times.
            </p>
            <p className={styles.p3}>#VR46</p>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <h1 className={styles.h4}>
              Ducati Lenovo Team 2024 Francesco Bagnaia T-Shirt - Kids
            </h1>
            <p className={styles.p4}>
              Take an essential garment and give it a real MotoGP™ flourish. No
              item of clothing is likely to accompany you as far and wide as a
              classic tee, so make sure yours reflects your passion and makes
              you look good.
            </p>
            <p className={styles.p4}>
              This item will ship within 1 business day. Please proceed to
              checkout for shipping options and additional transit times.
            </p>
            <p className={styles.p4}>#DucatiLenovo</p>
          </SwiperSlide>
        </Swiper>
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
              src="https://raw.githubusercontent.com/sandhikagalih/portfolio-tailwind-css/main/dist/img/sandhika.png"
              alt=""
              className={styles.img}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://rizafahmi.github.io/assets/img/avatar_riza.jpg"
              alt=""
              className={styles.img}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.footballfanatics.com/vr46-racing/vr46-racing-valentino-rossi-x-monster-poly-t-shirt_ss5_p-201140739+pv-2+u-fajltldflqd0p53fs13i+v-wv2lv8ycglfdripd3pn9.jpg?_hv=2&w=900"
              alt=""
              className={styles.img}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.footballfanatics.com/ducati-lenovo/ducati-lenovo-team-2024-francesco-bagnaia-t-shirt-kids_ss5_p-201082750+pv-2+u-xcbpjemr0g8aybfyxw9l+v-6wg48yw3xtfzafrqm18t.jpg?_hv=2&w=900"
              alt=""
              className={styles.img}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
