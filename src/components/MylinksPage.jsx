import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { appConfig } from "../config/appConfig";

import { AiFillDollarCircle } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";
import {
  FaFacebook,
  FaLinkedin,
  FaExternalLinkSquareAlt,
  FaLink,
  FaGoogleDrive,
  FaAddressCard,
  FaRupeeSign,
  FaJsfiddle,
} from "react-icons/fa";
import { FaSquarePinterest } from "react-icons/fa6";
import { IoCallSharp, IoLogoWhatsapp, IoDocumentText } from "react-icons/io5";
import { MdMail, MdPhoto, MdPayments } from "react-icons/md";
import { PiGlobeBold } from "react-icons/pi";
import {
  RiMessage2Fill,
  RiInstagramFill,
  RiTwitterXFill,
  RiFolderVideoFill,
} from "react-icons/ri";

import { PageNotFound } from ".";

const iconComponents = {
  AiFillDollarCircle,
  BiLogoGmail,
  FaFacebook,
  FaLinkedin,
  FaExternalLinkSquareAlt,
  FaLink,
  FaGoogleDrive,
  FaAddressCard,
  FaRupeeSign,
  FaJsfiddle,
  FaSquarePinterest,
  IoCallSharp,
  IoLogoWhatsapp,
  IoDocumentText,
  MdMail,
  MdPhoto,
  MdPayments,
  PiGlobeBold,
  RiMessage2Fill,
  RiInstagramFill,
  RiTwitterXFill,
  RiFolderVideoFill,
};

const DisplayIcon = ({ selectedIcon }) => {
  if (!selectedIcon) return null;
  const IconComponent = iconComponents[selectedIcon];
  if (!IconComponent) return null;
  return <IconComponent size={20} className="mr-2 text-gray-700" />;
};

const MylinksPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showBrokenPage, setShowBrokenPage] = useState(false);
  const [myLinksLinks, setMyLinksLinks] = useState();
  const location = useLocation();

  const getMylinksInfo = async () => {
    setIsLoading(true);
    const currentPagePath = location.pathname.replace(/^\/+/, "");

    try {
      const response = await fetch(
        `${appConfig.baseUrl}/mylinks/get-mylinks?profileName=${currentPagePath}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data?.links) {
        setMyLinksLinks(data.links);
        setIsLoading(false);
      } else {
        setShowBrokenPage(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("getMylinksInfo error", error);
      setShowBrokenPage(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMylinksInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showBrokenPage) {
    return <PageNotFound />;
  }

  return (
    <div className="my-main-bg-1 px-4 py-10 flex flex-col items-center justify-start">
      {isLoading && <p>Loading...</p>}

      {!isLoading && myLinksLinks && (
        <div className="w-full max-w-md">
          {/* Profile Image Placeholder */}
          <div className="bg-wabmGreen w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl text-white font-bold">
            {myLinksLinks.profileName?.charAt(0).toUpperCase()}
          </div>

          {/* Profile Name */}
          <h2 className="mb-6 text-center text-2xl font-semibold">
            @{myLinksLinks.profileName}
          </h2>

          {/* Links */}
          <div className="space-y-4">
            {myLinksLinks.linksDetails?.map((item, index) => (
              <a
                key={index}
                href={item.pageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-4 py-3 flex items-center shadow hover:shadow-md transition rounded-lg text-gray-800 font-medium"
              >
                <DisplayIcon selectedIcon={item.thumbnailLink} />
                <span>{item.pageTitle}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MylinksPage;
