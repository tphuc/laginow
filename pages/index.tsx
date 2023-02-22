import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";

import { trpc } from '@/lib/trpc';
import ImageUploader from "@/components/shared/upload-image";

export default function Home() {

  const hello = trpc.hello.useQuery({ text: 'client' });
  const trpcContext = trpc.useContext();

  return (
    <Layout>
      <br />
      <div className="flex flex-col items-center justify-center">
        <motion.div
          className="max-w-xl p-4 py-12 xl:px-0"
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
         
          
          <motion.h1
            className="bg-gradient-to-br from-indigo-800 to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer> Kết nối thương hiệu của bạn  đến mọi người</Balancer>
          </motion.h1>
          <motion.p
            className="mt-6 text-center text-gray-500 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>
               Tạo hồ sơ kinh doanh của bạn trên Lagi Now miễn phí.
            </Balancer>
          </motion.p>
          <motion.div
            className="mx-auto mt-6 flex items-center justify-center space-x-5"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            
            <a
              className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
              href="https://github.com/steven-tey/precedent"
              target="_blank"
              rel="noopener noreferrer"
            >
             
              <p>Tạo hồ sơ ngay</p>
            </a>
          </motion.div>
        </motion.div>
      </div>
      <br />

      {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
      {/* <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))}
      </div> */}
      <div className="">
        <h1 className='text-left text-xl font-bold text-slate-600 pl-[4%]'>Where to go</h1>
        <p className='text-left text-slate-600 pl-[4%]'>Top locations to visit</p>
        <div className="flex flex-row gap-2 w-screen overflow-x-scroll p-[4%]">
          {
            [1, 2, 3, 4, 5, 6, 7]?.map((item, id) => <div key={id} className="cursor-pointer border min-w-[260px] lg:min-w-[320px] relative rounded-xl bg-white p-3 shadow-sm">
              <div className="relative  flex items-end overflow-hidden rounded-lg">
                <img className={`relative aspect-square object-cover rounded-md`} src="https://thumbnails.production.thenounproject.com/gA9eZOvsBYSHrMumgrslmRGoBto=/fit-in/1000x1000/photos.production.thenounproject.com/photos/BCBA88B6-5B41-4B50-A786-E60CAA0ECDA3.jpg" alt="wallpaper" />

                <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>

                  <span className="ml-1 text-sm">4.9</span>
                </div>
              </div>

              <div className="mt-1 p-2 ">
                <h2 className="text-slate-700">The Malta Hotel</h2>
                <p className="mt-1 text-sm text-slate-400">Italy, Europe</p>

                <div className="mt-3 flex items-end justify-between">
                  <p>
                    <span className="text-lg font-bold ">$1,421</span>
                    <span className="text-sm text-slate-400">/night</span>
                  </p>

                  <div className="group inline-flex rounded-xl bg-slate-100 p-2 hover:bg-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400 group-hover:text-black-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>)
          }
        </div>
      </div>

      <br />

      <div className="">
        <h1 className='text-left text-xl font-bold text-slate-600 pl-[4%]'>Where to go</h1>
        <p className='text-left text-slate-600 pl-[4%]'>Top locations to visit</p>

        <div className="flex flex-row snap-mandatory snap-x  gap-2 w-screen overflow-x-scroll p-[4%]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, id) => <div key={id} className="relative snap-center overflow-hidden min-w-[260px] lg:min-w-[320px] rounded-2xl bg-white border shadow-sm">
            <div className="overflow-hidden">
              <img className={`relative aspect-[4/3] rounded-tl-lg rounded-tr-lg object-cover`} src="https://thumbnails.production.thenounproject.com/gA9eZOvsBYSHrMumgrslmRGoBto=/fit-in/1000x1000/photos.production.thenounproject.com/photos/BCBA88B6-5B41-4B50-A786-E60CAA0ECDA3.jpg" alt="Hamburger" />
            </div>

            <div className="p-4">
              <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
                <div>
                  <p className="mt-2 text-gray-400">Fast Food • Burger</p>
                  <h2 className="mt-1 text-lg font-semibold text-gray-800">Beef Hamburger</h2>
                </div>
                {/* <span className="mt-2 inline-block rounded-full bg-orange-400 p-3 text-sm font-medium text-white"> Discount 10% </span> */}
              </div>

              <hr className="mt-4 mb-4" />

              <div className="flex flex-wrap justify-between">
                <p className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span className="ml-2 text-gray-600">10 - 15 Mins</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-400">1Km</span>
                </p>

                <p className="inline-flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>

                  <span className="ml-2"> 5.0 (2.5k) </span>
                </p>
              </div>
            </div>
          </div>)}



        </div>
      </div>


      <div className="bg-stone-100 pt-5 pb-5">
        <h1 className='text-left text-xl font-bold text-slate-600 pl-[4%]'>Where to go</h1>
        <p className='text-left text-slate-600 pl-[4%]'>Top locations to visit</p>

        <div className="flex flex-row snap-mandatory snap-x  gap-2 w-screen overflow-x-scroll p-[4%]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9]?.map((item, id) => <div key={id} className="min-w-[260px] snap-center lg:min-w-[320px] rounded-xl bg-white border shadow-sm">
            <a
              href="#"
              className="group"
            >
              <div className="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587502536575-6dfba0a6e017?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                  className="w-full aspect-square rounded-tl-lg rounded-tr-lg h-auto  ease-in-out"
                  alt="Sample Cover"
                />
              </div>
            </a>


            <div className="mt-6 p-4">
              <div className="grid grid-cols-2 gap-4">
                <time className="text-gray-600">
                  November 6, 2021
                </time>

                <a
                  href="#"
                  className="inline-block text-gray-600 hover:text-sky-400"
                >
                  10 Comments
                </a>

                <a
                  href="#"
                  className="flex items-center"
                >
                  <div className="h-6 w-6 rounded-full bg-sky-400"></div>

                  <span className="ml-2 text-gray-600">
                    John Doe
                  </span>
                </a>
              </div>

              <p className="mt-6 leading-normal line-clamp-3 text-md text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi explicabo ipsa laudantium maxime nemo non numquam praesentium quia quidem reiciendis sint tempora temporibus tenetur, totam unde vel velit voluptas? Alias.
              </p>

              <a href="#" className="inline-block mt-6 text-sky-500 hover:text-sky-400">
                Read More
              </a>
            </div>


          </div>)}



        </div>
      </div>










    </Layout>
  );
}

const features = [
  {
    title: "Beautiful, reusable components",
    description:
      "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)",
    large: true,
  },
  {
    title: "Performance first",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
    demo: <WebVitals />,
  },
  {
    title: "One-click Deploy",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <a href={DEPLOY_URL}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://vercel.com/button"
          alt="Deploy with Vercel"
          width={120}
        />
      </a>
    ),
  },
  {
    title: "Built-in Auth + Database",
    description:
      "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Auth.js logo" src="/authjs.webp" width={50} height={50} />
        <Image alt="Prisma logo" src="/prisma.svg" width={50} height={50} />
      </div>
    ),
  },
  {
    title: "Hooks, utilities, and more",
    description:
      "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
    demo: (
      <div className="grid grid-flow-col grid-rows-3 gap-10 p-10">
        <span className="font-mono font-semibold">useIntersectionObserver</span>
        <span className="font-mono font-semibold">useLocalStorage</span>
        <span className="font-mono font-semibold">useScroll</span>
        <span className="font-mono font-semibold">nFormatter</span>
        <span className="font-mono font-semibold">capitalize</span>
        <span className="font-mono font-semibold">truncate</span>
      </div>
    ),
  },
];
