
import ImageSwap from "../components/image-swap/ImageSwap";
import InputItem from "../components/input-dns/InputItem";

function DashBoard() {
  
  
  return (
    <>
    <div className="flex justify-between items-center p-[10%]  gap-[8%] z-1000000000000">

      <div className="basis-2/3">
        <InputItem />
      </div>
      <div>
        <ImageSwap></ImageSwap>
      </div>
    </div>
  </>
  )
}

export default DashBoard