import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function ShareButtons({ property }) {
  
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex justify-center gap-2 py-2">
        <FacebookShareButton url={shareUrl}
        quote={property.name}
        hashtag={`#${property.type}For Rent`}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton url={shareUrl}
        title={property.name}
        summary={property.description}
        source={"Real Estate"}
        >
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <TwitterShareButton url={shareUrl}
        title={property.name}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl}
        title={property.name}
        separator=":: "
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
      
    </>
  );
}
