import "/src/components/plants/PlantsCritters.css";
import "/src/components/plants/PixelBorder.scss";
import testpic from "/assets/graphics/lavender.png";

export const GardenBuilder = () => {
  return (
    <div className="comp-container flex flex-col items-center bg-amber-100 flex justify-start relative min-h-[80vh]">
      <div className="home-comp text-xl italic mt-12 px-8 mb-8 py-4 h-[4rem] pixel-border-green1">
        in development
      </div>
      <div
        className="border-step4"
        style={{
          backgroundImage: `url(${testpic})`,
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};

{
  /* testing */
}
{
  /* <img src={testpic} className="relative z-5 w-[10rem] h-[10rem]" /> */
}
