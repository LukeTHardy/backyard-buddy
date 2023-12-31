import { useRef } from "react";
import { Link } from "react-router-dom";
import { TabLink } from "./TabLink";

export const NavBar = ({ token }) => {
  const navbar = useRef();

  return (
    <nav
      className="z-3 flex justify-center"
      role="navigation"
      aria-label="main navigation"
    >
      <nav
        className="navbar-container z-3 h-12 flex w-7/8 justify-evenly text-darker-green items-center"
        ref={navbar}
      >
        <TabLink path="/" text="Home" />
        <TabLink path="/plants" text="Plants" />
        <TabLink path="/critters" text="Critters" />
        <TabLink path="/plants/favorites" text="Favorites" />
        <TabLink path="/gardenbuilder" text="Garden Builder" />
      </nav>
      <div className="navbar-end">
        <div className="buttons">
          {token ? (
            ""
          ) : (
            <>
              <Link to="/register" className="button is-link">
                Register
              </Link>
              <Link to="/login" className="button is-outlined">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// export const NavBar = ({ token }) => {
//   const navbar = useRef();

//   return (
//     <nav className="z-3" role="navigation" aria-label="main navigation">
//       <div
//         className="navbar-container z-3 h-12 flex justify-evenly text-logo-green items-center bg-amber-100"
//         ref={navbar}
//       >
//         <div className="">
//           {token ? (
//             <>
//               <Link to="/" className="text-3xl">
//                 Home
//               </Link>
//             </>
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="">
//           {token ? (
//             <>
//               <Link to="/plants" className="text-3xl">
//                 Plants
//               </Link>
//             </>
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="">
//           {token ? (
//             <>
//               <Link to="/critters" className="text-3xl">
//                 Critters
//               </Link>
//             </>
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="">
//           {token ? (
//             <Link to="/plants/favorites" className="text-3xl">
//               Favorites
//             </Link>
//           ) : (
//             ""
//           )}
//         </div>
//         <div className="">
//           {token ? (
//             <Link to="/gardenbuilder" className="text-3xl">
//               Garden Builder
//             </Link>
//           ) : (
//             ""
//           )}
//         </div>
//       </div>
//       <div className="navbar-end">
//         <div className="buttons">
//           {token ? (
//             ""
//           ) : (
//             <>
//               <Link to="/register" className="button is-link">
//                 Register
//               </Link>
//               <Link to="/login" className="button is-outlined">
//                 Login
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };
