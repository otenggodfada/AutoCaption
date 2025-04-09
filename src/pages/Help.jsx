/** @format */

import { useState } from "react";
import {
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  Cog6ToothIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const Help = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const faqs = [
    {
      category: "Getting Started",
      icon: <DocumentTextIcon className="w-6 h-6" />,
      questions: [
        {
          question: "How do I upload a video?",
          answer:
            "Click the 'Upload' button or drag and drop your MP4 video file into the upload area. We support MP4 format with a maximum file size of 500MB.",
        },
        {
          question: "What video formats are supported?",
          answer:
            "We support a wide range of video and audio formats including MP4, MOV, AVI, WMV, WEBM, MKV, FLV, 3GP, TS, MP3, and WAV. We recommend using H.264 codec for video files for best compatibility.",
        },
      ],
    },
    {
      category: "Caption Generation",
      icon: <VideoCameraIcon className="w-6 h-6" />,
      questions: [
        {
          question: "How accurate is the automatic captioning?",
          answer:
            "Our AI-powered captioning is highly accurate, typically achieving 90-95% accuracy. However, accuracy may vary depending on audio quality and background noise.",
        },
        {
          question: "Can I edit the generated captions?",
          answer:
            "Yes, you can edit the captions after generation. Click on any caption to edit the text, timing, or style.",
        },
      ],
    },
    {
      category: "Customization",
      icon: <Cog6ToothIcon className="w-6 h-6" />,
      questions: [
        {
          question: "How do I customize caption styles?",
          answer:
            "Use the theme selector to choose from preset styles or create your own custom theme with our theme editor.",
        },
        {
          question: "Can I adjust caption timing?",
          answer:
            "Yes, you can adjust the timing of each caption by dragging the edges of the caption in the timeline.",
        },
      ],
    },
    {
      category: "Export & Share",
      icon: <ShareIcon className="w-6 h-6" />,
      questions: [
        {
          question: "What formats can I export my video in?",
          answer:
            "You can export your video with captions in MP4, WebM, or MOV formats. We also support SRT and VTT caption files.",
        },
        {
          question: "How do I share my captioned video?",
          answer:
            "After exporting, you can download the video or share it directly to social media platforms.",
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Help Center</h1>
        <p className="text-light/60">
          Find answers to common questions and learn how to use DelpCap
          effectively.
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((section) => (
          <div key={section.category} className="bg-dark/50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-primary">{section.icon}</div>
              <h2 className="text-xl font-semibold">{section.category}</h2>
            </div>
            <div className="space-y-4">
              {section.questions.map((faq, index) => (
                <div
                  key={index}
                  className="border border-light/10 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between p-4 hover:bg-dark/30 transition-colors"
                    onClick={() =>
                      toggleSection(`${section.category}-${index}`)
                    }
                  >
                    <span className="text-left font-medium">
                      {faq.question}
                    </span>
                    {openSections[`${section.category}-${index}`] ? (
                      <ChevronUpIcon className="w-5 h-5" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5" />
                    )}
                  </button>
                  {openSections[`${section.category}-${index}`] && (
                    <div className="p-4 bg-dark/30 border-t border-light/10">
                      <p className="text-light/60">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Still Need Help?</h3>
        <p className="text-light/60 mb-6">
          Can't find what you're looking for? Contact our support team.
        </p>
        <button className="btn btn-primary">Contact Support</button>
      </div>
    </div>
  );
};

export default Help;
