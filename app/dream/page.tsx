"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "react-uploader";
import { Uploader } from "uploader";
import { CompareSlider } from "../../components/CompareSlider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import Toggle from "../../components/Toggle";
import appendNewToName from "../../utils/appendNewToName";
import downloadPhoto from "../../utils/downloadPhoto";
import DropDown from "../../components/DropDown";
import { useSession, signIn } from "next-auth/react";
import { roomType, rooms, themeType, themes } from "../../utils/dropdownTypes";

// Configuration for the uploader
const uploader = Uploader({
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_API_KEY ?? "free",
});
const options = {
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#2563EB", // Primary buttons & links
      error: "#d23f4d", // Error messages
      shade100: "#fff", // Standard text
      shade200: "#fffe", // Secondary button text
      shade300: "#fffd", // Secondary button text (hover)
      shade400: "#fffc", // Welcome text
      shade500: "#fff9", // Modal close button
      shade600: "#fff7", // Border
      shade700: "#fff2", // Progress indicator background
      shade800: "#fff1", // File item background
      shade900: "#ffff", // Various (draggable crop buttons, etc.)
    },
  },
};

export default function DreamPage() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [theme, setTheme] = useState<themeType>("Modern");
  const [room, setRoom] = useState<roomType>("Living Room");
  const { data: session, status } = useSession();

  const UploadDropZone = () => (
    <UploadDropzone
      uploader={uploader}
      options={options}
      onUpdate={(file) => {
        if (file.length !== 0) {
          setPhotoName(file[0].originalFile.originalFileName);
          setOriginalPhoto(file[0].fileUrl.replace("raw", "thumbnail"));
        }
      }}
      width="670px"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    const res = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: fileUrl, theme, room }),
    });

    let newPhoto = await res.json();
    if (res.status !== 200) {
      setError(newPhoto);
    } else {
      setRestoredImage(newPhoto[1]);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1300);
  }

  const [selectedRooms, setSetselectedRooms] = useState<string[]>([]);

  const toggleSelectRoom = (room: themeType) => {
    if (selectedRooms.includes(room)) {
      setSetselectedRooms((prev) =>
        prev.filter((actualRoom) => actualRoom !== room)
      );
    } else {
      setSetselectedRooms([room]);
      setTheme(room);
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header photo={session?.user?.image || undefined} />
      <main
        className={`flex  ${
          sideBySide
            ? "flex-col items-center"
            : status === "authenticated"
            ? "flex-col lg:flex-row-reverse"
            : "flex-col  items-center"
        }  flex-1 w-full  justify-center text-center px-4 mt-4 sm:mb-0 mb-8`}
      >
        <div className="w-[-webkit-fill-available] px-3 md:mt-8 mt-0">
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-slate-100 sm:text-6xl mb-5">
            Redesign your <span className="text-[#FFCF45]">room</span> in
            seconds
          </h1>
          {restoredImage && originalPhoto && !sideBySide && (
            <div className="sm:mt-0 mt-8">
              <h2 className="mb-1 font-medium text-lg">Generated Room</h2>
              <a href={restoredImage} target="_blank" rel="noreferrer">
                <Image
                  alt="restored photo"
                  src={restoredImage}
                  className="rounded-2xl relative sm:mt-0 mt-2 cursor-zoom-in w-full h-96"
                  width={475}
                  height={475}
                  onLoadingComplete={() => setRestoredLoaded(true)}
                />
              </a>
            </div>
          )}
        </div>

        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col-reverse mt-4">
              <div className="flex space-x-2 justify-center">
                {!loading && !restoredImage && status == "authenticated" && (
                  <div className="flex items-center justify-between gap-6 my-6">
                    <button
                      onClick={() => {
                        if (originalPhoto) generatePhoto(originalPhoto);

                        // downloadPhoto(
                        //   restoredImage!,
                        //   appendNewToName(photoName!)
                        // );
                      }}
                      className="rounded-lg bg-[#FFCF45] text-black font-medium px-4 py-2 hover:opacity-75 transition"
                    >
                      Render design
                    </button>
                    <span>
                      Cost: <strong>O crédit</strong>{" "}
                    </span>
                  </div>
                )}
                {loading && (
                  <button
                    disabled
                    className="bg-[#FFCF45] rounded-full text-black font-medium px-4 pt-2 pb-3 mt-8 w-40"
                  >
                    <span className="pt-4">
                      <LoadingDots color="white" style="large" />
                    </span>
                  </button>
                )}
              </div>
              {!restoredImage && status == "authenticated" && (
                <>
                  <div className="space-y-4 w-full max-w-sm">
                    <div className="flex mt-3 items-center space-x-3">
                      <Image
                        src="/number-3-white.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="text-left font-medium">
                        Choose your room theme.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 grid-rows-2 gap-2 mb-6">
                      {themes.map((theme) => (
                        <div className="flex flex-col space-y-2 items-center">
                          <button
                            className="disabled:cursor-not-allowed"
                            onClick={() => toggleSelectRoom(theme)}
                          >
                            <div className="relative">
                              {selectedRooms.includes(theme) && (
                                <div className="absolute bg-black rounded-md right-1 top-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="feather feather-check"
                                  >
                                    <path d="M20 6L9 17 4 12"></path>
                                  </svg>
                                </div>
                              )}
                              <img
                                alt=""
                                loading="lazy"
                                width="100"
                                height="100"
                                decoding="async"
                                data-nimg="1"
                                className={`w-24 h-24 rounded-md ${
                                  selectedRooms.includes(theme) &&
                                  "border-2 border-white -p-2"
                                }`}
                                src={`/${theme.toLocaleLowerCase()}-room.webp`}
                              />
                            </div>
                          </button>
                          <div className="text-sm pb-2"> {theme} </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 w-full max-w-sm -mt-6">
                    <div className="flex mt-10 items-center space-x-3">
                      <Image
                        src="/number-2-white.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="text-left font-medium">
                        Choose your room type.
                      </p>
                    </div>
                    <DropDown
                      theme={room}
                      setTheme={(newRoom) => setRoom(newRoom as typeof room)}
                      themes={rooms}
                    />
                  </div>
                </>
              )}
              {restoredImage && (
                <div>
                  Here's your remodeled <b>{room.toLowerCase()}</b> in the{" "}
                  <b>{theme.toLowerCase()}</b> theme!{" "}
                </div>
              )}
              <div
                className={`${
                  restoredLoaded ? "visible mt-6 -ml-8" : "invisible"
                }`}
              >
                <Toggle
                  className={`${restoredLoaded ? "visible mb-6" : "invisible"}`}
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>
              {restoredLoaded && sideBySide && (
                <CompareSlider
                  original={originalPhoto!}
                  restored={restoredImage!}
                />
              )}

              {status === "authenticated" && !originalPhoto && (
                <>
                  <UploadDropZone />
                  <div className="mt-4 w-full max-w-sm">
                    <div className="flex mt-6 w-96 items-center space-x-3">
                      <Image
                        src="/number-1-white.svg"
                        width={30}
                        height={30}
                        alt="1 icon"
                      />
                      <p className="text-left font-medium">
                        Upload a photo of your room.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {status === "unauthenticated" && !originalPhoto && (
                <div className="h-[250px] flex flex-col items-center space-y-6 max-w-[670px]">
                  <div className="max-w-xl text-gray-600">
                    Sign in below with Google to create a free account and
                    restore your photos today. You will be able to restore 5
                    photos per day for free.
                  </div>
                  <button
                    onClick={() => signIn("google")}
                    className="bg-gray-200 text-black font-semibold py-3 px-6 rounded-2xl flex items-center space-x-2"
                  >
                    <Image
                      src="/google.png"
                      width={20}
                      height={20}
                      alt="google's logo"
                    />
                    <span>Sign in with Google</span>
                  </button>
                </div>
              )}
              {originalPhoto && !restoredImage && (
                <>
                  <div className="bg-neutral-800 p-3 rounded-xl">
                    <div className="flex justify-between mb-2 mx-2">
                      <div className="text-sm text-gray-400">Original Room</div>
                      <button onClick={() => setOriginalPhoto(null)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-trash text-[#9ca3af] hover:text-white transition"
                        >
                          <path d="M3 6L5 6 21 6"></path>
                          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="flex justify-center items-center">
                      <img
                        alt="2018-04-17sans-titre-30-1024x576.jpg"
                        loading="lazy"
                        width="350"
                        height="350"
                        decoding="async"
                        data-nimg="1"
                        className="rounded-lg"
                        style={{ color: "transparent" }}
                        src={originalPhoto}
                      />
                    </div>
                  </div>
                </>
              )}
              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h2 className="mb-1 font-medium text-lg">Original Room</h2>
                    <img
                      alt="2018-04-17sans-titre-30-1024x576.jpg"
                      loading="lazy"
                      width="350"
                      height="350"
                      decoding="async"
                      data-nimg="1"
                      className="rounded-lg"
                      style={{ color: "transparent" }}
                      src={originalPhoto}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-8"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
}
