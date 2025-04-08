/** @format */

import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const captionThemes = {
  default: {
    className: "bg-black/80 text-white",
    style: {
      fontFamily: "Arial, sans-serif",
      fontSize: "20px",
      padding: "8px 16px",
      borderRadius: "4px",
    },
  },
  modern: {
    className: "bg-white/80 text-black",
    style: {
      fontFamily: "'Helvetica Neue', sans-serif",
      fontSize: "22px",
      padding: "10px 20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
  },
  minimal: {
    className: "bg-transparent text-white",
    style: {
      fontFamily: "'SF Pro Display', sans-serif",
      fontSize: "24px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
      padding: "8px 16px",
    },
  },
  bold: {
    className: "bg-yellow-400/90 text-black",
    style: {
      fontFamily: "'Impact', sans-serif",
      fontSize: "26px",
      padding: "6px 12px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  },
  subtitle: {
    className: "bg-black/60 text-white",
    style: {
      fontFamily: "'Times New Roman', serif",
      fontSize: "20px",
      padding: "8px 16px",
      borderTop: "2px solid white",
      borderBottom: "2px solid white",
    },
  },
  capcut: {
    className: "bg-gradient-to-r from-black/80 to-black/60 text-white",
    style: {
      fontFamily: "'SF Pro Display', sans-serif",
      fontSize: "24px",
      padding: "12px 24px",
      borderRadius: "12px",
      backdropFilter: "blur(4px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
      border: "1px solid rgba(255,255,255,0.1)",
    },
  },
  neon: {
    className: "bg-black/80 text-white",
    style: {
      fontFamily: "'SF Pro Display', sans-serif",
      fontSize: "24px",
      padding: "12px 24px",
      borderRadius: "12px",
      textShadow:
        "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00ff00, 0 0 40px #00ff00",
      border: "1px solid rgba(255,255,255,0.3)",
      boxShadow: "0 0 10px rgba(0,255,0,0.3)",
      color: "#fff",
    },
  },
  glass: {
    className: "bg-white/10 text-white",
    style: {
      fontFamily: "'SF Pro Display', sans-serif",
      fontSize: "24px",
      padding: "12px 24px",
      borderRadius: "12px",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.2)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
  },
  cinematic: {
    className: "bg-gradient-to-r from-black/90 to-black/70 text-white",
    style: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "26px",
      padding: "16px 32px",
      borderRadius: "4px",
      letterSpacing: "1px",
      textTransform: "uppercase",
      boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
    },
  },
  retro: {
    className: "bg-yellow-400/80 text-black",
    style: {
      fontFamily: "'Courier Prime', monospace",
      fontSize: "22px",
      padding: "8px 16px",
      border: "2px solid #000",
      borderRadius: "0px",
      textTransform: "uppercase",
      letterSpacing: "2px",
      boxShadow: "4px 4px 0px #000",
    },
  },
  social: {
    className: "bg-gradient-to-r from-pink-500/80 to-purple-500/80 text-white",
    style: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "24px",
      padding: "12px 24px",
      borderRadius: "16px",
      fontWeight: "600",
      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    },
  },
  gaming: {
    className: "bg-gradient-to-r from-green-500/80 to-blue-500/80 text-white",
    style: {
      fontFamily: "'Rajdhani', sans-serif",
      fontSize: "26px",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "2px solid rgba(255,255,255,0.3)",
      textShadow: "0 0 10px rgba(0,255,255,0.5)",
      boxShadow: "0 0 20px rgba(0,255,255,0.2)",
      fontWeight: "bold",
    },
  },
};

const getThemeDescription = (theme) => {
  switch (theme) {
    case "default":
      return "Classic black background with white text";
    case "modern":
      return "Clean and minimal with light background";
    case "minimal":
      return "Transparent with text shadow";
    case "bold":
      return "High contrast yellow with black text";
    case "subtitle":
      return "Traditional subtitle style";
    case "capcut":
      return "Professional CapCut-style captions";
    case "neon":
      return "Glowing neon effect";
    case "glass":
      return "Frosted glass effect";
    case "cinematic":
      return "Movie-style dramatic captions";
    case "retro":
      return "Vintage typewriter style";
    case "social":
      return "Modern social media style";
    case "gaming":
      return "Dynamic gaming stream style";
    default:
      return "Custom theme";
  }
};

const Editor = () => {
  const location = useLocation();
  const videoFile = location.state?.videoFile;
  const [error, setError] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [utterances, setUtterances] = useState([]);
  const [activeUtterances, setActiveUtterances] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [previewTheme, setPreviewTheme] = useState(null);
  const [isEditingTheme, setIsEditingTheme] = useState(false);
  const [customTheme, setCustomTheme] = useState({
    fontFamily: "Arial, sans-serif",
    fontSize: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    textColor: "#ffffff",
    padding: "8px 16px",
    borderRadius: "4px",
    textShadow: "none",
  });
  const videoRef = useRef(null);
  const [currentWords, setCurrentWords] = useState([]);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isEditingTranscript, setIsEditingTranscript] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportFormat, setExportFormat] = useState("webm");
  const [exportQuality, setExportQuality] = useState("high");
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportStatus, setExportStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeaker, setSelectedSpeaker] = useState("all");
  const [filteredUtterances, setFilteredUtterances] = useState([]);

  // Sample video URL for testing
  const sampleVideoUrl =
    "https://storage.googleapis.com/aai-web-samples/news.mp4";

  // Sample preview text for theme preview
  const previewText = "This is a preview of the caption theme";

  // Handle video URL creation and cleanup
  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setVideoUrl(sampleVideoUrl);
    }
  }, [videoFile]);

  // Handle video ready state
  useEffect(() => {
    if (videoRef.current) {
      const handleCanPlay = () => {
        setIsVideoReady(true);
      };

      const handleWaiting = () => {
        setIsVideoReady(false);
      };

      const handleSeeking = () => {
        setIsVideoReady(false);
      };

      const handleSeeked = () => {
        setIsVideoReady(true);
      };

      videoRef.current.addEventListener("canplay", handleCanPlay);
      videoRef.current.addEventListener("waiting", handleWaiting);
      videoRef.current.addEventListener("seeking", handleSeeking);
      videoRef.current.addEventListener("seeked", handleSeeked);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("canplay", handleCanPlay);
          videoRef.current.removeEventListener("waiting", handleWaiting);
          videoRef.current.removeEventListener("seeking", handleSeeking);
          videoRef.current.removeEventListener("seeked", handleSeeked);
        }
      };
    }
  }, []);

  // Update active utterances and current words based on video time
  useEffect(() => {
    if (!videoRef.current || utterances.length === 0 || !isVideoReady) return;

    let lastUpdateTime = 0;
    const UPDATE_INTERVAL = 16; // Update every 16ms for precise timing
    let lastActiveWords = [];
    let animationFrameId;

    const handleTimeUpdate = () => {
      const currentTime = videoRef.current.currentTime * 1000; // Convert to milliseconds

      // Only update if enough time has passed
      if (currentTime - lastUpdateTime < UPDATE_INTERVAL) {
        animationFrameId = requestAnimationFrame(handleTimeUpdate);
        return;
      }
      lastUpdateTime = currentTime;

      // Find all active utterances
      const active = utterances.filter(
        (u) => currentTime >= u.start && currentTime <= u.end
      );

      // Sort utterances by start time to maintain proper order
      const sortedActive = [...active].sort((a, b) => a.start - b.start);
      setActiveUtterances(sortedActive);

      // Calculate current words based on timing with adjusted timing
      const words = [];
      active.forEach((utterance) => {
        const wordsInUtterance = utterance.text.split(" ");
        const wordDuration =
          (utterance.end - utterance.start) / wordsInUtterance.length;
        const adjustedWordDuration = wordDuration * 0.9; // Slightly faster word display

        // Group words into chunks of 4-5 words
        const wordChunks = [];
        for (let i = 0; i < wordsInUtterance.length; i += 4) {
          const chunk = wordsInUtterance.slice(i, i + 4);
          const chunkStart = utterance.start + i * wordDuration;
          const chunkEnd = utterance.start + (i + chunk.length) * wordDuration;
          const progress = Math.min(
            1,
            (currentTime - chunkStart) / (chunkEnd - chunkStart)
          );

          const opacity =
            progress < 0.1
              ? progress * 10
              : progress > 0.9
              ? (1 - progress) * 10
              : 1;
          const scale =
            progress < 0.1
              ? 0.8 + progress * 0.2
              : progress > 0.9
              ? 1 - (progress - 0.9) * 0.2
              : 1;
          const translateY = progress < 0.1 ? (1 - progress) * 20 : 0;

          wordChunks.push({
            text: chunk.join(" "),
            start: chunkStart,
            end: chunkEnd,
            opacity,
            scale,
            translateY,
            speaker: utterance.speaker,
          });
        }

        // Add chunks that are currently active
        wordChunks.forEach((chunk) => {
          if (currentTime >= chunk.start && currentTime <= chunk.end) {
            words.push(chunk);
          }
        });
      });

      // Only update if the words have actually changed
      if (JSON.stringify(words) !== JSON.stringify(lastActiveWords)) {
        setCurrentWords(words);
        lastActiveWords = words;
      }

      animationFrameId = requestAnimationFrame(handleTimeUpdate);
    };

    handleTimeUpdate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [utterances, isVideoReady]);

  // Filter utterances based on search query and selected speaker
  useEffect(() => {
    let filtered = [...utterances];

    // Filter by speaker
    if (selectedSpeaker !== "all") {
      filtered = filtered.filter((u) => u.speaker === selectedSpeaker);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((u) => u.text.toLowerCase().includes(query));
    }

    setFilteredUtterances(filtered);
  }, [utterances, searchQuery, selectedSpeaker]);

  const getFileType = (file) => {
    // Get file extension
    const extension = file.name.split(".").pop().toLowerCase();

    // Map extensions to MIME types
    const mimeTypes = {
      mp4: "video/mp4",
      mov: "video/quicktime",
      avi: "video/x-msvideo",
      wmv: "video/x-ms-wmv",
      webm: "video/webm",
      mp3: "audio/mpeg",
      wav: "audio/wav",
      m4a: "audio/mp4",
      m4v: "video/mp4",
      mkv: "video/x-matroska",
      flv: "video/x-flv",
      "3gp": "video/3gpp",
      ts: "video/mp2t",
    };

    // If we have a mapping for this extension, use it
    if (mimeTypes[extension]) {
      return mimeTypes[extension];
    }

    // If the file already has a valid type, use it
    if (file.type && file.type !== "application/octet-stream") {
      return file.type;
    }

    // If we can't determine the type, throw an error
    throw new Error(
      `Could not determine file type for extension: ${extension}`
    );
  };

  const validateVideoFile = (file) => {
    // Check if file exists
    if (!file) {
      throw new Error("No file selected");
    }

    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      throw new Error("File size too large. Maximum size is 100MB");
    }

    try {
      // Get the correct MIME type
      const fileType = getFileType(file);

      // Check file type
      const allowedTypes = [
        "video/mp4",
        "video/quicktime",
        "video/x-msvideo",
        "video/x-ms-wmv",
        "video/webm",
        "video/x-matroska",
        "video/x-flv",
        "video/3gpp",
        "video/mp2t",
        "audio/mpeg",
        "audio/wav",
        "audio/mp4",
      ];

      if (!allowedTypes.includes(fileType)) {
        throw new Error(
          `Unsupported file type: ${fileType}. Supported types are: MP4, MOV, AVI, WMV, WEBM, MKV, FLV, 3GP, TS, MP3, WAV`
        );
      }

      return fileType;
    } catch (err) {
      throw new Error(`Invalid file: ${err.message}`);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const transcribeVideo = async () => {
    setIsTranscribing(true);
    setError(null);
    setTranscript("");
    setUtterances([]);

    try {
      let audioUrl;

      if (videoFile) {
        // Handle uploaded file
        console.log("Original file details:", {
          name: videoFile.name,
          type: videoFile.type,
          size: videoFile.size,
        });

        const fileType = validateVideoFile(videoFile);
        console.log("Validated file type:", fileType);

        // First, upload the file
        const uploadResponse = await fetch(
          "https://api.assemblyai.com/v2/upload",
          {
            method: "POST",
            headers: {
              Authorization: import.meta.env.VITE_ASSEMBLYAI_API_KEY,
            },
            body: videoFile, // Send the raw file
          }
        );

        if (!uploadResponse.ok) {
          throw new Error(
            `Upload failed with status: ${uploadResponse.status}`
          );
        }

        const uploadResult = await uploadResponse.json();
        console.log("Upload response:", uploadResult);
        audioUrl = uploadResult.upload_url;
      } else {
        // Use sample video URL
        console.log("Using sample video URL:", sampleVideoUrl);
        audioUrl = sampleVideoUrl;
      }

      if (!audioUrl) {
        throw new Error("Failed to get audio URL");
      }

      // Start transcription
      console.log("Starting transcription...");
      const transcribeResponse = await fetch(
        "https://api.assemblyai.com/v2/transcript",
        {
          method: "POST",
          headers: {
            Authorization: import.meta.env.VITE_ASSEMBLYAI_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audio_url: audioUrl,
            speaker_labels: true,
          }),
        }
      );

      if (!transcribeResponse.ok) {
        throw new Error(
          `Transcription request failed with status: ${transcribeResponse.status}`
        );
      }

      const transcriptionResult = await transcribeResponse.json();
      console.log("Transcription started:", transcriptionResult);
      const transcriptId = transcriptionResult.id;

      if (!transcriptId) {
        throw new Error("Failed to get transcript ID");
      }

      // Poll for the transcription result
      let pollingResponse;
      let attempts = 0;
      const maxAttempts = 60;

      while (attempts < maxAttempts) {
        console.log(`Polling attempt ${attempts + 1}...`);

        const pollResponse = await fetch(
          `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
          {
            headers: {
              Authorization: import.meta.env.VITE_ASSEMBLYAI_API_KEY,
            },
          }
        );

        if (!pollResponse.ok) {
          throw new Error(`Polling failed with status: ${pollResponse.status}`);
        }

        pollingResponse = await pollResponse.json();
        console.log("Polling response:", pollingResponse);

        if (pollingResponse.status === "completed") {
          setTranscript(pollingResponse.text);
          if (pollingResponse.utterances) {
            setUtterances(pollingResponse.utterances);
          }
          break;
        } else if (pollingResponse.status === "error") {
          throw new Error(pollingResponse.error || "Transcription failed");
        }

        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      if (attempts >= maxAttempts) {
        throw new Error("Transcription timed out. Please try again.");
      }
    } catch (err) {
      console.error("Transcription error:", err);
      if (err.response?.data?.error) {
        setError(`Transcription error: ${err.response.data.error}`);
      } else if (err.message) {
        setError(`Error: ${err.message}`);
      } else {
        setError("Failed to transcribe video. Please try again.");
      }
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleTranscriptEdit = (index, newText) => {
    const updatedUtterances = [...utterances];
    updatedUtterances[index].text = newText;
    setUtterances(updatedUtterances);
  };

  const handleThemeChange = (property, value) => {
    setCustomTheme((prev) => ({
      ...prev,
      [property]: value,
    }));
  };

  const saveCustomTheme = () => {
    const newTheme = {
      className: "custom-theme",
      style: {
        fontFamily: customTheme.fontFamily,
        fontSize: customTheme.fontSize,
        backgroundColor: customTheme.backgroundColor,
        color: customTheme.textColor,
        padding: customTheme.padding,
        borderRadius: customTheme.borderRadius,
        textShadow:
          customTheme.textShadow === "none"
            ? undefined
            : customTheme.textShadow,
      },
    };

    setCaptionThemes((prev) => ({
      ...prev,
      custom: newTheme,
    }));
    setSelectedTheme("custom");
    setIsEditingTheme(false);
  };

  // Function to generate WebVTT content
  const generateWebVTT = () => {
    let vttContent = "WEBVTT\n\n";
    utterances.forEach((utterance, index) => {
      const startTime = formatTimeForVTT(utterance.start / 1000);
      const endTime = formatTimeForVTT(utterance.end / 1000);
      vttContent += `${index + 1}\n${startTime} --> ${endTime}\n${
        utterance.text
      }\n\n`;
    });
    return vttContent;
  };

  // Helper function to format time for VTT
  const formatTimeForVTT = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours().toString().padStart(2, "0");
    const mm = date.getUTCMinutes().toString().padStart(2, "0");
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    const ms = date.getUTCMilliseconds().toString().padStart(3, "0");
    return `${hh}:${mm}:${ss}.${ms}`;
  };

  // Function to download WebVTT file
  const downloadWebVTT = () => {
    const vttContent = generateWebVTT();
    const blob = new Blob([vttContent], { type: "text/vtt" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "captions.vtt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Export quality settings
  const qualitySettings = {
    high: { videoBitsPerSecond: 8000000, audioBitsPerSecond: 128000 },
    medium: { videoBitsPerSecond: 4000000, audioBitsPerSecond: 96000 },
    low: { videoBitsPerSecond: 2000000, audioBitsPerSecond: 64000 },
  };

  // Function to generate preview
  const generatePreview = async () => {
    try {
      const canvas = document.createElement("canvas");
      const video = videoRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current frame with captions
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Draw current captions
      currentWords.forEach((chunk) => {
        const progress =
          (video.currentTime * 1000 - chunk.start) / (chunk.end - chunk.start);
        if (progress >= 0 && progress <= 1) {
          const opacity =
            progress < 0.1
              ? progress * 10
              : progress > 0.9
              ? (1 - progress) * 10
              : 1;
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.font = `${captionThemes[selectedTheme].style.fontSize} ${captionThemes[selectedTheme].style.fontFamily}`;
          ctx.fillStyle = captionThemes[selectedTheme].style.color;
          ctx.textAlign = "center";
          ctx.fillText(chunk.text, canvas.width / 2, canvas.height - 50);
          ctx.restore();
        }
      });

      // Convert to blob and create URL
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.95)
      );
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setShowPreview(true);
    } catch (error) {
      console.error("Error generating preview:", error);
      setError("Failed to generate preview");
    }
  };

  // Function to export video with captions
  const exportVideoWithCaptions = async () => {
    setIsExporting(true);
    setExportProgress(0);
    setShowExportModal(true);
    setExportStatus("Preparing export...");
    try {
      const video = videoRef.current;
      if (!video) {
        throw new Error("Video element not found");
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Create a new video element for streaming
      const streamVideo = document.createElement("video");
      streamVideo.src = videoUrl;
      streamVideo.crossOrigin = "anonymous";
      streamVideo.preload = "auto";
      streamVideo.muted = false;
      streamVideo.playbackRate = 1.0; // Ensure normal playback speed

      // Wait for video to be ready
      await new Promise((resolve, reject) => {
        const handleError = (e) => {
          console.error("Video error:", e);
          reject(
            new Error(
              `Stream video error: ${
                e.target.error?.message || "Unknown error"
              }`
            )
          );
        };

        const handleLoadedMetadata = () => {
          console.log("Video metadata loaded:", {
            duration: streamVideo.duration,
            readyState: streamVideo.readyState,
            videoWidth: streamVideo.videoWidth,
            videoHeight: streamVideo.videoHeight,
          });
          resolve();
        };

        streamVideo.onloadedmetadata = handleLoadedMetadata;
        streamVideo.onerror = handleError;
        streamVideo.onstalled = () => reject(new Error("Video stalled"));
        streamVideo.onabort = () => reject(new Error("Video loading aborted"));

        // Add timeout to prevent hanging
        setTimeout(() => reject(new Error("Stream video load timeout")), 5000);
      });

      // Create audio context with error handling
      let audioContext;
      let videoStream;
      try {
        audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(streamVideo);
        const destination = audioContext.createMediaStreamDestination();
        source.connect(destination);
        source.connect(audioContext.destination); // Connect to speakers as well

        // Create video stream
        videoStream = canvas.captureStream(30); // 30fps for smoother video

        // Create audio stream from the video element
        const audioStream = streamVideo.captureStream();
        const audioTrack = audioStream.getAudioTracks()[0];

        // Create combined stream with both video and audio
        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          audioTrack,
        ]);

        // Check MediaRecorder support and set options
        let options;
        if (exportFormat === "webm") {
          if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")) {
            options = {
              mimeType: "video/webm;codecs=vp9,opus",
              ...qualitySettings[exportQuality],
            };
          } else if (
            MediaRecorder.isTypeSupported("video/webm;codecs=h264,opus")
          ) {
            options = {
              mimeType: "video/webm;codecs=h264,opus",
              ...qualitySettings[exportQuality],
            };
          } else if (MediaRecorder.isTypeSupported("video/webm")) {
            options = { mimeType: "video/webm" };
          } else {
            throw new Error("WebM format not supported");
          }
        } else if (exportFormat === "mp4") {
          if (MediaRecorder.isTypeSupported("video/mp4;codecs=h264,aac")) {
            options = {
              mimeType: "video/mp4;codecs=h264,aac",
              ...qualitySettings[exportQuality],
            };
          } else if (MediaRecorder.isTypeSupported("video/mp4")) {
            options = { mimeType: "video/mp4" };
          } else {
            throw new Error("MP4 format not supported");
          }
        }

        const mediaRecorder = new MediaRecorder(combinedStream, options);
        const chunks = [];
        let lastFrameTime = 0;
        const frameInterval = 1000 / 30; // 30fps

        // Track progress more frequently
        const updateProgress = () => {
          if (streamVideo && !streamVideo.paused) {
            const progress =
              (streamVideo.currentTime / streamVideo.duration) * 100;
            setExportProgress(Math.min(Math.round(progress), 99));
            if (progress < 100) {
              requestAnimationFrame(updateProgress);
            }
          }
        };

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: options.mimeType });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `video_with_captions.${exportFormat}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          setIsExporting(false);
          setExportProgress(100);
          setExportStatus("Export completed successfully!");
          audioContext.close();
        };

        // Get the selected theme's styles
        const theme = captionThemes[selectedTheme];
        const themeStyle = theme.style;

        // Start recording
        mediaRecorder.start(100);

        // Start progress tracking
        requestAnimationFrame(updateProgress);

        // Render frames with captions
        const renderFrame = async (timestamp) => {
          if (mediaRecorder.state === "recording") {
            // Only render if enough time has passed
            if (timestamp - lastFrameTime >= frameInterval) {
              lastFrameTime = timestamp;

              // Clear canvas
              ctx.clearRect(0, 0, canvas.width, canvas.height);

              // Draw video frame
              ctx.drawImage(streamVideo, 0, 0, canvas.width, canvas.height);

              // Find current active utterances based on video time
              const currentTime = streamVideo.currentTime * 1000;
              const activeUtterances = utterances.filter(
                (u) => currentTime >= u.start && currentTime <= u.end
              );

              // Draw captions for active utterances
              activeUtterances.forEach((utterance) => {
                const words = utterance.text.split(" ");
                const wordDuration =
                  (utterance.end - utterance.start) / words.length;
                const currentWordIndex = Math.floor(
                  (currentTime - utterance.start) / wordDuration
                );

                if (currentWordIndex >= 0 && currentWordIndex < words.length) {
                  // Group words into chunks of 4-5 words
                  const wordChunks = [];
                  for (let i = 0; i < words.length; i += 4) {
                    const chunk = words.slice(i, i + 4);
                    wordChunks.push({
                      text: chunk.join(" "),
                      start: utterance.start + i * wordDuration,
                      end: utterance.start + (i + chunk.length) * wordDuration,
                    });
                  }

                  // Find the current chunk
                  const currentChunk = wordChunks.find(
                    (chunk) =>
                      currentTime >= chunk.start && currentTime <= chunk.end
                  );

                  if (currentChunk) {
                    const progress =
                      (currentTime - currentChunk.start) /
                      (currentChunk.end - currentChunk.start);
                    const opacity =
                      progress < 0.1
                        ? progress * 10
                        : progress > 0.9
                        ? (1 - progress) * 10
                        : 1;

                    // Draw text with theme style
                    ctx.save();
                    ctx.globalAlpha = opacity;
                    ctx.font = `${themeStyle.fontSize || "24px"} ${
                      themeStyle.fontFamily || "Arial"
                    }`;

                    // Get text color from theme
                    let textColor = themeStyle.color;
                    if (!textColor) {
                      // If theme uses className for color, extract it
                      const colorClass = theme.className
                        .split(" ")
                        .find((cls) => cls.includes("text-"));
                      if (colorClass) {
                        switch (colorClass) {
                          case "text-white":
                            textColor = "#ffffff";
                            break;
                          case "text-black":
                            textColor = "#000000";
                            break;
                          default:
                            textColor = "#ffffff"; // Default to white
                        }
                      } else {
                        textColor = "#ffffff"; // Default to white if no color specified
                      }
                    }
                    ctx.fillStyle = textColor;

                    // Get background color from theme
                    let bgColor = themeStyle.backgroundColor;
                    if (!bgColor) {
                      // If theme uses className for background, extract it
                      const bgClass = theme.className
                        .split(" ")
                        .find((cls) => cls.includes("bg-"));
                      if (bgClass) {
                        switch (bgClass) {
                          case "bg-black/80":
                            bgColor = "rgba(0, 0, 0, 0.8)";
                            break;
                          case "bg-white/80":
                            bgColor = "rgba(255, 255, 255, 0.8)";
                            break;
                          case "bg-transparent":
                            bgColor = "transparent";
                            break;
                          case "bg-yellow-400/90":
                            bgColor = "rgba(250, 204, 21, 0.9)";
                            break;
                          case "bg-black/60":
                            bgColor = "rgba(0, 0, 0, 0.6)";
                            break;
                          case "bg-white/10":
                            bgColor = "rgba(255, 255, 255, 0.1)";
                            break;
                          default:
                            bgColor = "rgba(0, 0, 0, 0.8)"; // Default background
                        }
                      }
                    }

                    // Draw background with proper color
                    const textMetrics = ctx.measureText(currentChunk.text);
                    const padding =
                      parseInt(themeStyle.padding?.split(" ")[0]) || 10;

                    if (bgColor && bgColor !== "transparent") {
                      ctx.save();
                      ctx.globalAlpha = opacity * 0.8;

                      // Handle gradient background
                      if (theme.className.includes("bg-gradient-to-r")) {
                        const gradient = ctx.createLinearGradient(
                          canvas.width / 2 - textMetrics.width / 2 - padding,
                          0,
                          canvas.width / 2 + textMetrics.width / 2 + padding,
                          0
                        );
                        gradient.addColorStop(0, "rgba(0, 0, 0, 0.8)");
                        gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");
                        ctx.fillStyle = gradient;
                      } else {
                        ctx.fillStyle = bgColor;
                      }

                      // Apply background with border radius if specified
                      const radius = parseInt(themeStyle.borderRadius) || 0;
                      if (radius > 0) {
                        ctx.beginPath();
                        ctx.roundRect(
                          canvas.width / 2 - textMetrics.width / 2 - padding,
                          canvas.height - 70,
                          textMetrics.width + padding * 2,
                          40,
                          radius
                        );
                        ctx.fill();
                      } else {
                        ctx.fillRect(
                          canvas.width / 2 - textMetrics.width / 2 - padding,
                          canvas.height - 70,
                          textMetrics.width + padding * 2,
                          40
                        );
                      }
                      ctx.restore();
                    }

                    // Apply text shadow if specified
                    if (themeStyle.textShadow) {
                      const shadowParts = themeStyle.textShadow.split(" ");
                      ctx.shadowColor = shadowParts[3] || "rgba(0,0,0,0.8)";
                      ctx.shadowBlur = parseInt(shadowParts[2]) || 0;
                      ctx.shadowOffsetX = parseInt(shadowParts[0]) || 0;
                      ctx.shadowOffsetY = parseInt(shadowParts[1]) || 0;
                    }

                    // Apply text transform if specified
                    let text = currentChunk.text;
                    if (themeStyle.textTransform === "uppercase") {
                      text = text.toUpperCase();
                    } else if (themeStyle.textTransform === "lowercase") {
                      text = text.toLowerCase();
                    }

                    // Draw text with proper color and style
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = textColor;
                    ctx.fillText(text, canvas.width / 2, canvas.height - 50);
                    ctx.restore();
                  }
                }
              });
            }

            requestAnimationFrame(renderFrame);
          }
        };

        // Start rendering
        renderFrame(0);

        // Play the video at normal speed
        await streamVideo.play();

        // Stop recording when video ends
        streamVideo.onended = () => {
          mediaRecorder.stop();
          streamVideo.pause();
        };
      } catch (error) {
        console.error("Stream creation error:", error);
        throw new Error(`Failed to create stream: ${error.message}`);
      }
    } catch (error) {
      console.error("Error exporting video:", error);
      setError(`Failed to export video: ${error.message}`);
      setExportStatus(`Error: ${error.message}`);
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Video Player with Captions */}
      <div className="lg:col-span-2">
        <div className="sticky top-20 z-20 md:static bg-dark/50 rounded-xl p-4 border border-light/10">
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full"
              controls
              autoPlay
              preload="auto"
              onError={(e) => {
                console.error("Video error:", e.target.error);
                setError("Error playing video: " + e.target.error.message);
              }}
            />
            {/* Caption Overlay */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] flex flex-col items-center space-y-2">
              {currentWords.map((chunk, index) => (
                <div
                  key={`${chunk.start}-${chunk.end}-${index}`}
                  className={`${captionThemes[selectedTheme].className} max-w-[90%] text-center transition-all duration-150`}
                  style={{
                    ...captionThemes[selectedTheme].style,
                    opacity: chunk.opacity,
                    transform: `translateY(${chunk.translateY}px) scale(${chunk.scale})`,
                    transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                    pointerEvents: "none",
                    display: "block",
                    margin: "0 auto",
                    animation:
                      selectedTheme === "neon" ? "pulse 2s infinite" : "none",
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {chunk.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Selection and Customization */}
        <div className="mt-4 bg-dark/50 rounded-xl p-4 border border-light/10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Caption Themes</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditingTheme(!isEditingTheme)}
                className="btn btn-secondary"
              >
                {isEditingTheme ? "Cancel" : "Customize Theme"}
              </button>
            </div>
          </div>

          {isEditingTheme ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Font Family</label>
                  <select
                    value={customTheme.fontFamily}
                    onChange={(e) =>
                      handleThemeChange("fontFamily", e.target.value)
                    }
                    className="w-full p-2 rounded bg-dark/30 border border-light/10"
                  >
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Helvetica Neue', sans-serif">
                      Helvetica
                    </option>
                    <option value="'SF Pro Display', sans-serif">
                      SF Pro Display
                    </option>
                    <option value="'Playfair Display', serif">
                      Playfair Display
                    </option>
                    <option value="'Poppins', sans-serif">Poppins</option>
                    <option value="'Rajdhani', sans-serif">Rajdhani</option>
                    <option value="'Courier Prime', monospace">
                      Courier Prime
                    </option>
                    <option value="'Times New Roman', serif">
                      Times New Roman
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Font Size</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="16"
                      max="32"
                      step="2"
                      value={parseInt(customTheme.fontSize)}
                      onChange={(e) =>
                        handleThemeChange("fontSize", `${e.target.value}px`)
                      }
                      className="flex-1"
                    />
                    <span className="text-sm text-light/60">
                      {customTheme.fontSize}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Background Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={customTheme.backgroundColor
                        .replace(/[^,]+(?=\))/, "1")
                        .replace("rgba", "rgb")}
                      onChange={(e) => {
                        const color = e.target.value;
                        const r = parseInt(color.substr(1, 2), 16);
                        const g = parseInt(color.substr(3, 2), 16);
                        const b = parseInt(color.substr(5, 2), 16);
                        handleThemeChange(
                          "backgroundColor",
                          `rgba(${r}, ${g}, ${b}, 0.8)`
                        );
                      }}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={
                        parseFloat(
                          customTheme.backgroundColor.match(/[\d.]+(?=\))/)[0]
                        ) * 100
                      }
                      onChange={(e) => {
                        const rgba =
                          customTheme.backgroundColor.match(/[\d.]+/g);
                        handleThemeChange(
                          "backgroundColor",
                          `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${
                            e.target.value / 100
                          })`
                        );
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Text Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={customTheme.textColor}
                      onChange={(e) =>
                        handleThemeChange("textColor", e.target.value)
                      }
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    <span className="text-sm text-light/60">Text Color</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Border Radius</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="2"
                      value={parseInt(customTheme.borderRadius)}
                      onChange={(e) =>
                        handleThemeChange("borderRadius", `${e.target.value}px`)
                      }
                      className="flex-1"
                    />
                    <span className="text-sm text-light/60">
                      {customTheme.borderRadius}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1">Text Shadow</label>
                  <select
                    value={customTheme.textShadow || "none"}
                    onChange={(e) =>
                      handleThemeChange("textShadow", e.target.value)
                    }
                    className="w-full p-2 rounded bg-dark/30 border border-light/10"
                  >
                    <option value="none">None</option>
                    <option value="1px 1px 2px rgba(0,0,0,0.5)">Light</option>
                    <option value="2px 2px 4px rgba(0,0,0,0.8)">Medium</option>
                    <option value="0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00ff00">
                      Neon
                    </option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button onClick={saveCustomTheme} className="btn btn-primary">
                  Save Custom Theme
                </button>
                <div className="text-sm text-light/60">
                  Preview your changes in real-time above
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(captionThemes).map(([theme, config]) => (
                  <div
                    key={theme}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedTheme === theme ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedTheme(theme)}
                  >
                    <div className="aspect-video bg-gradient-to-b from-dark/20 to-dark/40 p-4 relative">
                      <div
                        className={`${config.className} absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] text-center transition-all duration-150`}
                        style={{
                          ...config.style,
                          fontSize: "14px",
                          padding: "6px 12px",
                          animation:
                            theme === "neon" ? "pulse 2s infinite" : "none",
                        }}
                      >
                        Preview Text
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="text-sm font-medium text-white">
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </div>
                        <div className="text-xs text-light/60">
                          {getThemeDescription(theme)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-light/10">
                <div className="text-sm text-light/60">
                  Selected:{" "}
                  <span className="text-primary font-medium">
                    {selectedTheme.charAt(0).toUpperCase() +
                      selectedTheme.slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => setIsEditingTheme(true)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Create Custom Theme →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls and Transcript */}
      <div className="lg:col-span-1">
        <div className="flex flex-col space-y-4">
          {/* Transcribe Button */}
          <div className="bg-dark/50 rounded-xl p-4 border border-light/10">
            <div className="flex items-center space-x-3">
              <button
                onClick={transcribeVideo}
                disabled={isTranscribing}
                className={`btn ${
                  isTranscribing ? "btn-secondary" : "btn-primary"
                } flex-1 relative overflow-hidden`}
              >
                <span
                  className={`${
                    isTranscribing ? "opacity-0" : "opacity-100"
                  } transition-opacity`}
                >
                  Transcribe Video
                </span>
                {isTranscribing && (
                  <div className="absolute inset-0 flex items-center justify-center space-x-2">
                    <div
                      className="w-2 h-2 bg-light rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-light rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-light rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                )}
              </button>
              {isTranscribing && (
                <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1.5 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm text-primary font-medium">
                    Processing
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Transcript Section */}
          <div className="bg-dark/50 rounded-xl border border-light/10 overflow-hidden">
            <div className="p-4 border-b border-light/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold">Transcript</h3>
                  {utterances.length > 0 && (
                    <span className="text-sm text-light/60">
                      {utterances.length} segments
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {isEditingTranscript && (
                    <button
                      onClick={() => setIsEditingTranscript(false)}
                      className="btn btn-secondary btn-sm"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => setIsEditingTranscript(!isEditingTranscript)}
                    className={`btn btn-sm ${
                      isEditingTranscript ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {isEditingTranscript ? "Save Changes" : "Edit Transcript"}
                  </button>
                </div>
              </div>

              {utterances.length > 0 && (
                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search transcript..."
                    className="flex-1 px-3 py-1.5 bg-dark/30 border border-light/10 rounded-lg text-sm text-light/80 placeholder-light/40 focus:outline-none focus:border-primary/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                    className="px-3 py-1.5 bg-dark/30 border border-light/10 rounded-lg text-sm text-light/80 focus:outline-none focus:border-primary/50"
                    value={selectedSpeaker}
                    onChange={(e) => setSelectedSpeaker(e.target.value)}
                  >
                    <option value="all">All Speakers</option>
                    {Array.from(new Set(utterances.map((u) => u.speaker))).map(
                      (speaker) => (
                        <option key={speaker} value={speaker}>
                          Speaker {speaker}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}
            </div>

            <div className="max-h-[calc(100vh-400px)] overflow-y-auto p-4 space-y-3">
              {filteredUtterances.length > 0 ? (
                <div className="space-y-3">
                  {filteredUtterances.map((utterance, index) => (
                    <div
                      key={index}
                      className={`group relative p-3 rounded-lg transition-all duration-200 hover:bg-dark/40 ${
                        activeUtterances.some(
                          (u) => u.start === utterance.start
                        )
                          ? "bg-primary/20 hover:bg-primary/30"
                          : "bg-dark/20"
                      }`}
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = utterance.start / 1000;
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="flex justify-between text-sm mb-2">
                        <span className="px-2 py-0.5 bg-dark/30 rounded text-primary/80 text-xs font-medium">
                          Speaker {utterance.speaker}
                        </span>
                        <span className="text-light/60 font-mono text-xs">
                          {formatTime(utterance.start / 1000)} →{" "}
                          {formatTime(utterance.end / 1000)}
                        </span>
                      </div>
                      {isEditingTranscript ? (
                        <textarea
                          value={utterance.text}
                          onChange={(e) =>
                            handleTranscriptEdit(index, e.target.value)
                          }
                          className="w-full p-2.5 rounded-lg bg-dark/30 border border-light/10 text-light/80 focus:outline-none focus:border-primary/50 resize-none"
                          rows={2}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <p className="text-light/80 leading-relaxed">
                          {utterance.text}
                        </p>
                      )}
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1 hover:bg-dark/50 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add copy functionality
                            navigator.clipboard.writeText(utterance.text);
                          }}
                          title="Copy text"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-light/60"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : transcript ? (
                <div className="space-y-2">
                  {isEditingTranscript ? (
                    <textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      className="w-full p-3 rounded-lg bg-dark/30 border border-light/10 text-light/80 focus:outline-none focus:border-primary/50"
                      rows={10}
                    />
                  ) : (
                    <p className="text-light/80 whitespace-pre-wrap leading-relaxed">
                      {transcript}
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-dark/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-light/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-light/60 mb-2">No transcript available</p>
                  <p className="text-sm text-light/40">
                    Click 'Transcribe Video' to generate one
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Export Options */}
            {/* Export Options */}
          <div className="mt-4 bg-dark/50 rounded-xl p-4 border border-light/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Export Video</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={generatePreview}
                  disabled={isExporting || !utterances.length}
                  className="btn btn-secondary btn-sm"
                >
                  Preview
                </button>
                <button
                  onClick={downloadWebVTT}
                  disabled={!utterances.length}
                  className="btn btn-secondary btn-sm"
                >
                  Download VTT
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Format Selection */}
              <div className="space-y-2">
                <label className="text-sm text-light/80">Format</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setExportFormat("webm")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                      exportFormat === "webm"
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-dark/30 border-light/10 text-light/80 hover:bg-dark/40"
                    }`}
                  >
                    WebM
                  </button>
                  <button
                    onClick={() => setExportFormat("mp4")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                      exportFormat === "mp4"
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-dark/30 border-light/10 text-light/80 hover:bg-dark/40"
                    }`}
                  >
                    MP4
                  </button>
                </div>
              </div>

              {/* Quality Selection */}
              <div className="space-y-2">
                <label className="text-sm text-light/80">Quality</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setExportQuality("high")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                      exportQuality === "high"
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-dark/30 border-light/10 text-light/80 hover:bg-dark/40"
                    }`}
                  >
                    High
                  </button>
                  <button
                    onClick={() => setExportQuality("medium")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                      exportQuality === "medium"
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-dark/30 border-light/10 text-light/80 hover:bg-dark/40"
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setExportQuality("low")}
                    className={`flex-1 px-3 py-2 rounded-lg border transition-colors ${
                      exportQuality === "low"
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-dark/30 border-light/10 text-light/80 hover:bg-dark/40"
                    }`}
                  >
                    Low
                  </button>
                </div>
              </div>

              {/* Export Button */}
              <button
                onClick={exportVideoWithCaptions}
                disabled={isExporting || !utterances.length}
                className={`w-full btn ${
                  isExporting || !utterances.length
                    ? "btn-secondary"
                    : "btn-primary"
                } relative overflow-hidden`}
              >
                <span
                  className={`${
                    isExporting ? "opacity-0" : "opacity-100"
                  } transition-opacity`}
                >
                  {utterances.length
                    ? "Export Video with Captions"
                    : "No Captions Available"}
                </span>
                {isExporting && (
                  <div className="absolute inset-0 flex items-center justify-center space-x-2">
                    <div
                      className="w-2 h-2 bg-light rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-light rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-light rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                )}
              </button>

              {/* Export Progress */}
              {isExporting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-light/80">Export Progress</span>
                    <span className="text-primary">
                      {Math.round(exportProgress)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-dark/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${exportProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-light/60">
                    Please wait while we process your video. This may take a few
                    minutes depending on the video length.
                  </p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-dark/90 rounded-xl p-4 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Export Preview</h3>
              <button
                onClick={() => {
                  setShowPreview(false);
                  URL.revokeObjectURL(previewUrl);
                }}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
            <div className="relative aspect-video">
              <img
                src={previewUrl}
                alt="Export Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-dark/90 rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Exporting Video</h3>
              {!isExporting && (
                <button
                  onClick={() => setShowExportModal(false)}
                  className="text-light/60 hover:text-light"
                >
                  <svg
                    xmlns="http://www.w3.org/2002000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {isExporting && (
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                )}
                <div className="flex-1">
                  <p className="text-light/80">{exportStatus}</p>
                  {isExporting && (
                    <div className="mt-2">
                      <div className="w-full h-2 bg-dark/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${exportProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-light/60 mt-1">
                        {Math.round(exportProgress)}%
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                  {error}
                </div>
              )}

              {!isExporting && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="btn btn-primary"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
