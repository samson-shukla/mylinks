import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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

import { appConfig, awsBucketConfig } from "../config/appConfig";
import { brandConfig } from "../config/brandConfig";
import { PageNotFound } from ".";

// Color constants
const COLORS = {
  DEFAULT_BG: "#ffffff",
  DEFAULT_TEXT: "#000000",
  DEFAULT_CARD_BG: "#ffffff",
  DEFAULT_CARD_SHADOW: "rgba(0, 0, 0, 0.08)",
  DEFAULT_CARD_HOVER_SHADOW: "rgba(0, 0, 0, 0.12)",
  DEFAULT_ICON_BG: "#f3f4f6",
  LOADING_TEXT: "#6b7280",
  DEFAULT_BG_SECONDARY: "#25D366",
  DEFAULT_BG_TERTIARY: "#3390FF",
};

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

const DisplayIcon = ({ selectedIcon, themeColor }) => {
  if (!selectedIcon) return null;
  const IconComponent = iconComponents[selectedIcon];
  if (!IconComponent) return null;

  const iconColor = themeColor?.text_color_paragraph || COLORS.DEFAULT_TEXT;

  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
      style={{
        backgroundColor:
          themeColor?.bg_tertiary_color || COLORS.DEFAULT_ICON_BG,
        opacity: 0.9,
      }}
    >
      <IconComponent size={24} style={{ color: iconColor }} />
    </div>
  );
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

      // console.log("getMylinksInfo data :", data);

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

  const themeColor = myLinksLinks?.themeColor;
  const bgPrimary = themeColor?.bg_primary_color || COLORS.DEFAULT_BG;
  const bgSecondary = themeColor?.bg_secondary_color || COLORS.DEFAULT_CARD_BG;
  const textHeading = themeColor?.text_color_heading || COLORS.DEFAULT_TEXT;
  const textSubheading =
    themeColor?.text_color_subheading || COLORS.DEFAULT_TEXT;

  return (
    <div
      className="min-h-screen px-4 py-12 flex flex-col items-center justify-start relative overflow-hidden"
      style={{
        backgroundColor: bgPrimary,
        background: themeColor
          ? `linear-gradient(135deg, ${bgPrimary} 0%, ${bgSecondary} 100%)`
          : COLORS.DEFAULT_BG,
      }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          backgroundColor:
            themeColor?.bg_tertiary_color || COLORS.DEFAULT_BG_TERTIARY,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          backgroundColor:
            themeColor?.bg_secondary_color || COLORS.DEFAULT_BG_SECONDARY,
        }}
      />

      {isLoading && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-t-wabmBlue border-gray-200 rounded-full animate-spin" />
          <p
            style={{ color: COLORS.LOADING_TEXT }}
            className="text-lg font-medium"
          >
            Loading your links...
          </p>
        </div>
      )}

      {!isLoading && myLinksLinks && (
        <div className="w-full max-w-2xl relative z-10">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-12">
            {/* Profile Image */}
            <div className="w-32 h-32 mb-6 rounded-full flex items-center justify-center text-5xl font-bold shadow-2xl ring-4 ring-white/50 backdrop-blur-sm">
              <img
                src={
                  myLinksLinks?.profilePicture
                    ? `${awsBucketConfig.openUploadedFilePrefix}${myLinksLinks?.profilePicture}`
                    : myLinksLinks.profileName?.charAt(0).toUpperCase()
                }
                alt="Profile Pic"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Name */}
            <h1
              className="text-4xl font-bold mb-2 tracking-tight"
              style={{ color: textHeading }}
            >
              @{myLinksLinks.profileName}
            </h1>

            {/* Optional bio/tagline space */}
            <p className="text-lg opacity-80" style={{ color: textSubheading }}>
              Connect with me
            </p>
          </div>

          {/* Links Grid */}
          <div className="space-y-4">
            {myLinksLinks.linksDetails?.map((item, index) => (
              <a
                key={index}
                href={item.pageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: bgSecondary || COLORS.DEFAULT_CARD_BG,
                  boxShadow: `0 4px 6px -1px ${COLORS.DEFAULT_CARD_SHADOW}, 0 2px 4px -1px ${COLORS.DEFAULT_CARD_SHADOW}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 25px -5px ${COLORS.DEFAULT_CARD_HOVER_SHADOW}, 0 10px 10px -5px ${COLORS.DEFAULT_CARD_HOVER_SHADOW}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 6px -1px ${COLORS.DEFAULT_CARD_SHADOW}, 0 2px 4px -1px ${COLORS.DEFAULT_CARD_SHADOW}`;
                }}
              >
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <DisplayIcon
                      selectedIcon={item.thumbnailLink}
                      themeColor={themeColor}
                    />
                    <span
                      className="text-lg font-semibold"
                      style={{ color: textHeading }}
                    >
                      {item.pageTitle}
                    </span>
                  </div>

                  {/* Arrow indicator */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:translate-x-1"
                    style={{
                      backgroundColor:
                        themeColor?.bg_tertiary_color || COLORS.DEFAULT_ICON_BG,
                      opacity: 0.6,
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{
                        color:
                          themeColor?.text_color_paragraph ||
                          COLORS.DEFAULT_TEXT,
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${
                      themeColor?.bg_tertiary_color ||
                      "rgba(51, 144, 255, 0.05)"
                    } 100%)`,
                  }}
                />
              </a>
            ))}
          </div>

          {/* Footer branding (optional) */}
          <div className="mt-12 text-center">
            <p className="text-sm opacity-60" style={{ color: textSubheading }}>
              Powered by{" "}
              <a
                href={brandConfig.websites.website1}
                target="_blank"
                rel="noopener noreferrer"
                className="font-Montserrat font-semibold"
              >
                {brandConfig.brandName}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MylinksPage;
