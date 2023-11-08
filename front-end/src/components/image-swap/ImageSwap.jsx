import React ,{useState}from "react";
import ImageItem from "./ImageItem";
import AleoImg from "../../assets/a.jpg";
import AleoImg2 from "../../assets/b.jpg";
import "./style.css";

function ImageSwap() {
    const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const nftImgClasses = `nft-img ${isHovered ? 'hover1' : ''}`;
  const nftImg2Classes = `nft-img2 ${isHovered ? 'hover2' : ''}`;
  return (
    <div  className={`ntf-cover ${isHovered ? 'hover' : ''}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}>
      <div className={nftImgClasses}>
        <ImageItem img={AleoImg}></ImageItem>
      </div>
      <div className={nftImg2Classes}>
        <ImageItem img={AleoImg2}></ImageItem>
      </div>
    </div>
  );
}

export default ImageSwap;
