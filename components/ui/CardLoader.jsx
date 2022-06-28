import React from "react";

function CardLoader(props) {
  return (
    <>
      <article className="link-card card animate-pulse cursor-pointer bg-gray-800 pb-4 Psm:mb-2 Psm:w-full Psm:rounded-none ">
        <figure className="aspect-w-4 aspect-h-2 mb-2"></figure>
        <div className="flex gap-6 p-4">
          <div className="h-10 w-10 rounded-full bg-slate-700"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-slate-700"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-slate-700"></div>
                <div className="col-span-1 h-2 rounded bg-slate-700"></div>
              </div>
              <div className="h-2 rounded bg-slate-700"></div>
            </div>
          </div>
        </div>
      </article>
      <article className="link-card card animate-pulse cursor-pointer bg-gray-800 pb-4 Psm:mb-2 Psm:w-full Psm:rounded-none ">
        <figure className="aspect-w-4 aspect-h-2 mb-2"></figure>
        <div className="flex gap-6 p-4">
          <div className="h-10 w-10 rounded-full bg-slate-700"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-slate-700"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-slate-700"></div>
                <div className="col-span-1 h-2 rounded bg-slate-700"></div>
              </div>
              <div className="h-2 rounded bg-slate-700"></div>
            </div>
          </div>
        </div>
      </article>
      <article className="link-card card animate-pulse cursor-pointer bg-gray-800 pb-4 Psm:mb-2 Psm:w-full Psm:rounded-none ">
        <figure className="aspect-w-4 aspect-h-2 mb-2"></figure>
        <div className="flex gap-6 p-4">
          <div className="h-10 w-10 rounded-full bg-slate-700"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-slate-700"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-slate-700"></div>
                <div className="col-span-1 h-2 rounded bg-slate-700"></div>
              </div>
              <div className="h-2 rounded bg-slate-700"></div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export default CardLoader;
