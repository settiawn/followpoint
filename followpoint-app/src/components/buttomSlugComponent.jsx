"use client";

import Link from "next/link";

export default function ButtonSlugComponent({ data }) {
  return (
    <>
      <div className="mt-10  mb-10 flex justify-center gap-4">
        <Link href={`/event/${data.slug}/map`} passHref>
          <button className="btn">Show event map</button>
        </Link>
        <Link href={`/event/${data.slug}/buy`} passHref>
          <button className="btn">Buy event ticket</button>
        </Link>
      </div>
      <style jsx>{`
        .btn {
          --color: #f6bd43;
          --color2: rgb(10, 25, 30);
          padding: 0.8em 1.75em;
          background-color: transparent;
          border-radius: 6px;
          border: 0.3px solid var(--color);
          transition: 0.5s;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          z-index: 1;
          font-weight: 300;
          font-size: 13px;
          font-family: "Roboto", "Segoe UI", sans-serif;
          text-transform: uppercase;
          color: var(--color);
        }

        .btn::after,
        .btn::before {
          content: "";
          display: block;
          height: 100%;
          width: 100%;
          transform: skew(90deg) translate(-50%, -50%);
          position: absolute;
          inset: 50%;
          left: 25%;
          z-index: -1;
          transition: 0.5s ease-out;
          background-color: var(--color);
        }

        .btn::before {
          top: -50%;
          left: -25%;
          transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
        }

        .btn:hover::before {
          transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
        }

        .btn:hover::after {
          transform: skew(45deg) translate(-50%, -50%);
        }

        .btn:hover {
          color: var(--color2);
        }

        .btn:active {
          filter: brightness(0.7);
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
}
