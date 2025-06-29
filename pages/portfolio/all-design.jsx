"use client";

import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle, SectionSubtitle } from "../../components";
import { portfolioList } from "../../constants/data";
import { ThemeContext } from "../../context/ThemeContext";
import { fadeIn, staggerContainer } from "../../utils/motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

function AllDesignPage() {
  const { theme } = useContext(ThemeContext);
  const [openImageModal, setOpenImageModal] = useState(null);
  const [zoomEnabled, setZoomEnabled] = useState(false);

  const designList = portfolioList.filter(
    (item) => item.category === "Design Perancangan Sistem"
  );

  return (
    <section className="pt-36 pb-20 px-5 lg:px-16">
      <h2 className="text-2xl font-bold text-center text-[#00B14F] mb-2">
        All Portfolio
      </h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="xl:max-w-sectionWidth max-w-[62.5rem] mx-auto"
      >
        <p className="text-center text-gray-600 dark:text-gray-300 text-sm mb-8">
          These projects showcase system analysis, flowcharts, and process
          designs.
        </p>

        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8"
        >
          {designList.map(({ img }, index) => (
            <div
              key={index}
              className={`cursor-pointer overflow-hidden rounded-lg shadow-md border-2 transition duration-300 ${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-[#1a202c] border-gray-700"
              } hover:shadow-lg`}
              onClick={() => {
                setOpenImageModal(img);
                setZoomEnabled(false);
              }}
            >
              <img
                src={img}
                alt={`Design ${index}`}
                className="w-full h-64 object-contain p-4"
              />
            </div>
          ))}
        </motion.div>

        {/* Modal */}
        {openImageModal && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 pt-20"
            onClick={() => {
              setOpenImageModal(null);
              setZoomEnabled(false);
            }}
          >
            <div
              className="bg-white rounded-lg overflow-auto max-w-6xl w-full max-h-[90vh] p-4"
              onClick={(e) => {
                e.stopPropagation();
                setZoomEnabled(true);
              }}
            >
              {zoomEnabled ? (
                <Zoom>
                  <img
                    src={openImageModal}
                    alt="Zoom Preview"
                    className="w-full h-auto object-contain rounded-md"
                  />
                </Zoom>
              ) : (
                <img
                  src={openImageModal}
                  alt="Full Preview"
                  className="w-full h-auto object-contain rounded-md cursor-zoom-in"
                />
              )}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default AllDesignPage;
