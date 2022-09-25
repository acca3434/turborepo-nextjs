import Image from "next/future/image";
import pic1 from "../public/images/pic1.jpg";
import pic2 from "../public/images/pic2.jpg";
import pic3 from "../public/images/pic3.jpg";
import pic4 from "../public/images/pic4.jpg";
import pic5 from "../public/images/pic5.jpg";
import pic6 from "../public/images/pic6.jpg";

const Gallery = () => {
  return (
    <div style={{ position: "relative", display: "grid", gap: "1rem" }}>
      <Image src={pic1} alt="Pic 1" width={800} priority />
      <Image src={pic2} alt="Pic 2" width={800} />
      <Image src={pic3} alt="Pic 3" width={800} priority />
      <Image src={pic4} alt="Pic 4" width={800} />
      <Image src={pic5} alt="Pic 5" width={800} />
      <Image src={pic6} alt="Pic 6" width={800} />
    </div>
  );
};

export default Gallery;
