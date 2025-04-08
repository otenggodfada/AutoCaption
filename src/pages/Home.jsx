/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpTrayIcon,
  PlayIcon,
  PencilIcon,
  ShareIcon,
  SparklesIcon,
  ClockIcon,
  GlobeAltIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      navigate("/editor", { state: { videoFile: file } });
    } else {
      alert("Please upload a valid MP4 video file");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      navigate("/editor", { state: { videoFile: file } });
    } else {
      alert("Please upload a valid MP4 video file");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-dark text-light"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative overflow-hidden"
        variants={itemVariants}
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent -z-10" />

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          DelpCap©️
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-light/60 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transform your videos with professional captions. Our AI-powered tool
          makes it easy to create, edit, and export captions in minutes.
        </motion.p>

        {/* Upload Section */}
        <motion.div
          className="max-w-2xl mx-auto mb-20"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-primary bg-primary/10 scale-105"
                : "border-light/20 hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-8 mx-auto ring-4 ring-primary/10">
                <ArrowUpTrayIcon className="w-16 h-16 text-primary" />
              </div>
              <p className="text-2xl font-semibold">Upload Your Video</p>
              <p className="text-light/60">
                Drag and drop your MP4 video here, or click the button below to
                select a file
              </p>
              <motion.label
                className="btn btn-primary mt-4 cursor-pointer group flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="file"
                  accept="video/mp4"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Choose Video
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.label>
              <p className="text-sm text-light/40 mt-4">
                Supported format: MP4
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              icon: <SparklesIcon className="w-8 h-8" />,
              title: "AI-Powered Accuracy",
              description:
                "Our advanced AI technology generates accurate captions in seconds, saving you hours of manual work.",
            },
            {
              icon: <ClockIcon className="w-8 h-8" />,
              title: "Time-Saving",
              description:
                "Automate your captioning workflow and save valuable time. Focus on creating great content.",
            },
            {
              icon: <GlobeAltIcon className="w-8 h-8" />,
              title: "Global Reach",
              description:
                "Make your content accessible to a global audience with accurate captions in multiple languages.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-dark/50 p-8 rounded-2xl border border-light/10 hover:border-primary/30 transition-colors"
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="text-primary mb-6 bg-primary/10 p-4 rounded-xl w-fit mx-auto"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-light/60">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            How It Works
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {[1, 2, 3, 4].map((step) => (
              <motion.div
                key={step}
                className="text-center group"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl font-bold text-primary">
                    {step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {step === 1
                    ? "Upload"
                    : step === 2
                    ? "Transcribe"
                    : step === 3
                    ? "Edit"
                    : "Export"}
                </h3>
                <p className="text-light/60">
                  {step === 1
                    ? "Upload your MP4 video file"
                    : step === 2
                    ? "AI generates accurate captions"
                    : step === 3
                    ? "Customize captions to your needs"
                    : "Download or share your video"}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mb-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl font-bold mb-6"
            variants={itemVariants}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-xl text-light/80 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Join thousands of creators who are already using DelpCap to enhance
            their videos with professional captions.
          </motion.p>
          <motion.label
            className="btn btn-primary cursor-pointer group flex items-center justify-center gap-2 mx-auto w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={itemVariants}
          >
            <input
              type="file"
              accept="video/mp4"
              onChange={handleFileChange}
              className="hidden"
            />
            Start Free Trial
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.label>
        </motion.div>

        {/* Footer Section */}
        <motion.footer
          className="mt-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4">About DelpCap</h3>
              <p className="text-light/60">
                DelpCap is an AI-powered video captioning tool that helps
                creators make their content more accessible and engaging.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Features", "How It Works", "Pricing", "Blog"].map((link) => (
                  <motion.li
                    key={link}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href="#"
                      className="text-light/60 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <div className="flex items-center space-x-2 text-light/60 mb-2">
                <EnvelopeIcon className="w-5 h-5" />
                <span>support@delpcap.com</span>
              </div>
              <div className="flex space-x-4 mt-4">
                {[
                  { Component: TwitterShareButton, Icon: TwitterIcon },
                  { Component: FacebookShareButton, Icon: FacebookIcon },
                  { Component: LinkedinShareButton, Icon: LinkedinIcon },
                  { Component: WhatsappShareButton, Icon: WhatsappIcon },
                  { Component: TelegramShareButton, Icon: TelegramIcon },
                  { Component: EmailShareButton, Icon: EmailIcon },
                ].map(({ Component, Icon }) => (
                  <motion.div
                    key={Icon.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Component
                      url="https://delpcap.com"
                      className="hover:opacity-80 transition-opacity"
                    >
                      <Icon size={32} round />
                    </Component>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="border-t border-light/10 pt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-light/40 text-sm">
              © 2025 DelpCap. All rights reserved.
            </p>
          </motion.div>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
};

export default Home;
