import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import MenuDropdown from "./menu-dropdown";
import NavbarLinks from "./navbar-links";

export default function Layout2({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
      <SignInModal />

      <div className="mx-5 flex bg-gray-50 h-14 max-w-screen-xl items-center justify-between xl:mx-auto">
        <Link href="/" className="flex items-center font-display text-2xl">
          {/* <Image
              src="/laginow.png"
              alt="Precedent logo"
              width="120"
              height="60"
              className="mr-2 rounded-sm"
            /> */}
          <svg width="100" height="60" viewBox="0 0 725 208" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M438.542 135.769C438.266 113.703 438.062 91.6358 437.642 69.573C437.572 65.8864 438.326 63.899 442.157 63.9876C447.936 64.1213 453.768 63.6055 459.487 64.2532C464.296 64.7978 467.269 68.2719 467.786 73.5995C467.983 75.6262 468.264 77.6591 468.266 79.6894C468.296 110.489 468.22 141.29 468.371 172.089C468.389 175.906 467.061 177.792 463.86 179.046C455.027 182.507 446.137 182.495 437.218 179.732C432.149 178.162 429.068 174.127 426.895 169.297C417.989 149.501 409.129 129.681 400.245 109.873C400.035 109.404 399.75 108.972 399.019 107.659C399.019 132.105 399.019 155.615 399.019 179.374C392.038 181.21 384.858 181.801 377.659 180.32C372.201 179.198 369.309 175.04 369.16 168.343C368.991 160.715 369.089 153.08 369.088 145.449C369.083 121.735 369.168 98.0215 369 74.3095C368.974 70.6002 370.252 68.3932 373.182 66.8668C383.267 61.6137 393.481 61.7794 403.391 66.9588C406.057 68.3523 408.455 71.426 409.802 74.3324C419.263 94.7539 428.417 115.333 437.967 136.198C438.357 136.278 438.45 136.024 438.542 135.769Z" fill="#442A7B"/>
<path d="M716.047 143.843C713.319 154.304 710.837 164.49 707.953 174.547C707.41 176.441 705.551 178.554 703.806 179.321C695.423 183.008 686.693 183.505 677.868 181.169C673.651 180.052 670.809 177.365 669.588 172.833C665.98 159.443 662.317 146.07 658.658 132.696C658.459 131.967 658.106 131.285 657.838 130.615C653.794 145.277 649.906 159.829 645.661 174.264C645.035 176.389 643.047 178.756 641.119 179.653C632.278 183.765 623.19 183.369 614.19 179.982C610.287 178.513 607.558 175.669 606.509 171.37C602.317 154.194 598.008 137.046 594.108 119.795C592.249 111.573 591.144 103.157 589.872 94.7991C589.684 93.5615 590.044 91.5749 590.86 90.9284C597.358 85.7816 604.612 84.0782 612.495 86.714C618.379 88.6817 620.439 93.6339 621.198 99.5718C623.274 115.817 625.403 132.055 627.538 148.292C627.695 149.489 628.063 150.656 628.566 152.851C631.225 141.832 633.679 131.806 636.058 121.761C637.721 114.739 639.391 107.716 640.838 100.644C641.443 97.6928 642.715 95.971 645.463 94.8003C652.124 91.962 658.861 91.7566 665.71 93.391C670.649 94.5696 673.834 97.6337 675.137 103.088C679.025 119.366 683.154 135.58 687.828 151.966C688.511 147.123 689.292 142.292 689.859 137.434C691.568 122.788 693.266 108.139 694.798 93.472C695.14 90.201 696.239 87.9098 699.42 87.487C704.377 86.8281 709.409 85.7548 714.331 86.0976C720.88 86.5539 724.829 91.4422 724.064 98.468C722.899 109.159 720.886 119.754 719.071 130.359C718.314 134.787 717.139 139.137 716.047 143.843Z" fill="#4E3779"/>
<path d="M273.247 120.06C273.247 135.771 273.242 151.071 273.249 166.372C273.259 187.444 263.43 200.987 244.078 205.798C231.6 208.9 219.014 208.752 206.585 205.179C196.536 202.291 191.657 196.041 192.147 186.837C192.246 184.966 192.673 183.04 193.312 181.289C195.243 176.002 197.099 175.2 201.875 177.407C212.729 182.42 223.899 184.12 235.387 180.455C242.289 178.253 244.882 173.355 243.843 165.472C236.008 167.861 228.106 168.844 219.932 167.841C201.986 165.641 189.554 153.152 186.711 134.058C185.451 125.596 185.468 117.176 187.596 108.876C191.911 92.0429 202.954 82.8268 218.486 79.2705C232.181 76.1347 245.675 77.249 258.529 83.4833C261.767 85.054 264.827 87.2149 267.642 89.5471C271.499 92.7423 273.343 97.1464 273.268 102.437C273.186 108.173 273.248 113.912 273.247 120.06ZM224.437 105.379C216.181 110.783 215.869 119.298 216.772 128.087C218.185 141.841 229.602 148.309 241.263 141.988C242.446 141.346 243.728 139.45 243.756 138.108C243.964 128.026 243.947 117.935 243.765 107.852C243.743 106.674 242.501 104.851 241.456 104.474C235.945 102.489 230.381 102.456 224.437 105.379Z" fill="#3A1D7F"/>
<path d="M516.606 87.0706C529.741 83.4695 542.409 83.4504 554.74 89.2427C570.873 96.8212 578.856 110.614 580.344 128.664C581.534 143.092 579.083 156.746 569.605 168.108C564.689 174.002 558.703 178.133 551.666 180.47C540.044 184.33 528.259 184.619 516.625 180.871C501.982 176.153 492.057 165.999 488.173 150.141C483.413 130.701 485.397 112.39 499.568 97.7754C504.1 93.102 510.674 90.653 516.606 87.0706ZM517.73 128.532C517.364 136.079 517.083 143.625 520.809 150.517C526.089 160.282 540.084 160.785 545.255 151.019C550.856 140.439 550.506 129.21 546.029 118.249C543.695 112.534 538.894 110.021 533.188 110.05C527.47 110.079 522.876 112.769 520.447 118.431C519.186 121.369 518.641 124.653 517.73 128.532Z" fill="#4B3479"/>
<path d="M170.205 147.006C170.205 148.235 170.205 149.054 170.205 149.874C170.206 162.026 167.117 167.335 156.185 171.413C139.032 177.812 121.504 178.361 104.255 172.122C84.9895 165.154 79.2232 138.87 93.5895 124.834C98.9298 119.617 105.747 117.676 112.787 116.717C121.02 115.596 129.278 114.677 137.524 113.658C138.276 113.565 139.018 113.379 139.707 113.248C140.267 107.94 138.864 104.792 133.796 103.775C127.764 102.565 121.445 102.058 115.325 102.472C109.975 102.833 104.666 104.673 99.465 106.306C97.2877 106.989 96.0889 106.492 94.7707 104.894C89.0131 97.9139 90.5659 86.8779 98.4337 82.9789C102.919 80.7562 107.978 79.3937 112.914 78.6817C125.347 76.8884 137.755 76.9149 149.81 81.5137C162.652 86.413 170.153 97.4313 170.2 111.755C170.238 123.369 170.206 134.984 170.205 147.006ZM118.53 150.283C125.255 153.891 132.097 152.766 138.915 150.718C139.568 150.522 140.396 149.415 140.417 148.707C140.552 144.149 140.486 139.584 140.486 134.504C133.795 135.411 127.656 135.675 121.808 137.186C115.091 138.922 113.89 143.964 118.53 150.283Z" fill="#341480"/>
<path d="M76.3683 162.032C75.3126 170.423 72.3903 173.559 64.7114 173.651C48.7959 173.842 32.8738 173.912 16.9604 173.64C5.64672 173.446 0.0138379 166.952 0.00817321 154.954C-0.00649732 123.815 0.00307747 92.6764 0.00298272 61.5374C0.00298272 60.2051 0.00298272 58.8728 0.00298272 56.484C7.26096 56.3493 14.2276 55.5926 21.069 56.262C28.551 56.9941 31.6516 61.752 31.6984 70.6902C31.7799 86.2592 31.7213 101.829 31.7214 117.399C31.7215 126.003 31.7136 134.607 31.7319 143.211C31.7341 144.266 31.8762 145.32 31.9841 146.794C38.4718 146.794 44.7787 146.794 51.0855 146.794C57.2973 146.794 63.5164 146.981 69.7176 146.711C72.6214 146.585 74.1732 147.685 74.6795 150.491C75.3502 154.208 75.8475 157.96 76.3683 162.032Z" fill="#311081"/>
<path d="M292.604 91.9016C292.604 88.5272 292.604 85.5584 292.604 81.4834C299.895 81.4118 306.796 80.8723 313.618 81.4108C320.325 81.9403 323.762 87.2975 323.831 95.9867C323.917 106.765 323.85 117.545 323.85 128.324C323.85 141.832 323.85 155.34 323.85 168.848C323.85 170.322 323.85 171.796 323.85 174.486C316.341 174.518 309.183 175.027 302.11 174.433C295.994 173.918 292.67 168.878 292.636 161.484C292.559 144.702 292.607 127.919 292.604 111.137C292.603 104.86 292.604 98.5837 292.604 91.9016Z" fill="#41267C"/>
<path d="M322.301 66.3689C307.247 66.1772 292.4 66.0091 277.555 65.7638C274.705 65.7168 273.066 63.9648 273.026 61.2812C272.996 59.3012 272.984 57.3196 273.036 55.3403C273.145 51.1682 275.76 48.1206 280.088 47.0918C284.713 45.9925 289.34 46.4909 293.861 47.4748C298.225 48.4242 302.484 49.7976 306.788 50.9866C307.385 51.1515 307.978 51.3277 308.987 51.6176C306.479 44.0386 304.08 36.7881 301.492 28.9679C294.71 32.1611 288.104 35.0832 281.698 38.3523C277.257 40.6187 274.48 39.4596 273.938 34.643C272.507 21.9375 277.801 12.3683 289.131 5.56671C289.741 5.2005 290.295 4.39615 290.411 3.72478C290.709 1.99129 291.6 0.811325 293.325 0.22569C295.006 -0.345025 296.361 0.231081 297.723 1.23219C298.408 1.7356 299.516 2.04486 300.383 1.96444C312.944 0.799057 322.918 5.00472 330.353 14.5959C330.523 14.8159 330.675 15.0501 330.825 15.2835C333.924 20.1079 332.685 22.407 326.832 23.4404C320.508 24.5569 314.246 25.99 307.962 27.3048C307.201 27.464 306.469 27.7459 305.477 28.0451C306.847 31.004 308.133 33.8051 309.437 36.5989C311.712 41.4716 314.034 46.3251 316.256 51.219C316.906 52.6516 317.712 53.6712 319.506 53.7476C322.881 53.8915 326.252 54.1603 329.628 54.2403C332.522 54.3088 335.432 54.0194 338.314 54.1908C341.834 54.4 342.983 55.7539 342.999 59.0686C343.019 63.0866 342.646 63.9804 338.436 64.6942C333.19 65.5837 327.823 65.8374 322.301 66.3689Z" fill="#3E227D"/>
</svg>

          

        </Link>
        <div className="gap-2 hidden sm:flex items-center">
          {/* <NavbarLinks/> */}
          <AnimatePresence>
            {!session && status !== "loading" ? (
              <motion.button
                className="rounded-full bg-black p-1.5 px-4 text-display text-white transition-all hover:bg-indigo-900 hover:text-white"
                onClick={() => setShowSignInModal(true)}
                {...FADE_IN_ANIMATION_SETTINGS}
              >
                Đăng nhập
              </motion.button>
            ) : (
              <UserDropdown />
            )}
          </AnimatePresence>
        </div>

        <div className="gap-2 flex sm:hidden">
          <MenuDropdown />
        </div>
      </div>

      {/* bg-gradient-to-br from-indigo-50 via-white to-cyan-100 */}
      <main className="w-full h-auto bg-gray-50">
        {children}
      </main>

    </>
  );
}
