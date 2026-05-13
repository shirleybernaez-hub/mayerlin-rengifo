"use client";
import * as React from 'react';
import { motion } from 'framer-motion';

export function TestimonialCard({ handleShuffle, testimonial, position, id, author }) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-4deg" : position === "middle" ? "0deg" : "4deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
        scale: position === "front" ? 1 : 0.95,
        opacity: position === "back" ? 0.5 : 1
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => {
        dragRef.current = e.clientX;
      }}
      onDragEnd={(e) => {
        if (dragRef.current - e.clientX > 100) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      className={`absolute left-0 top-0 grid h-[450px] w-[320px] md:w-[380px] select-none place-content-center space-y-6 rounded-3xl border border-neutral-200 bg-white/80 p-10 shadow-2xl backdrop-blur-xl ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-lg bg-neutral-100">
        <img
          src={`https://i.pravatar.cc/150?u=${id}`}
          alt={author}
          className="pointer-events-none h-full w-full object-cover"
        />
      </div>
      <p className="text-center text-lg font-serif italic text-neutral-800 leading-relaxed px-2">
        "{testimonial}"
      </p>
      <div className="flex flex-col items-center gap-2">
        <span className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-neutral-900">
          {author}
        </span>
        <div className="h-[1px] w-8 bg-red-600 opacity-60" />
      </div>
    </motion.div>
  );
};