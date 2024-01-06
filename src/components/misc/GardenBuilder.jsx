import "/src/components/plants/PlantsCritters.css";
import "/src/components/plants/PixelBorder.scss";
import testpic from "/assets/graphics/not_bad.png";

export const GardenBuilder = () => {
  return (
    <div className="comp-container flex flex-col items-center bg-amber-100 flex justify-start relative min-h-[80vh]">
      <div className="home-comp text-xl italic mt-12 px-8 mb-8 py-4 h-[4rem]">
        in development...
      </div>
      <div className="border-step4">
        <div className="image-container">
          <img src={testpic} alt="Test Image" />
        </div>
      </div>
    </div>
  );
};
