"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/app/menu/products";

export interface MenuProps {
  isExpanded: boolean;
  expandedWidthClass?: string;
  items?: MenuItem[];
}

function Menu({ isExpanded, expandedWidthClass, items = [] }: MenuProps) {
  const widthWhenExpanded = expandedWidthClass ?? "w-1/2 overflow-auto";
  const containerClass =
    (isExpanded ? widthWhenExpanded : "w-0 overflow-hidden opacity-0") +
    " transition-all rounded-xl duration-200 ease-in-out flex flex-col bg-white";

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <div className={containerClass}>
      {isExpanded && (
        <>
          <div className="flex items-center justify-between px-6 py-3.5 sticky top-0 z-10 text-base border-b bg-white rounded-t-xl">
            <span className="font-semibold">Menú</span>
          </div>
          <div className="p-6 text-sm text-gray-700 leading-relaxed space-y-4 h-full flex flex-col">
            {items.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Image
                    src="/logoagua.webp"
                    alt="Logo mesero.ai"
                    fill
                    className="object-contain opacity-30"
                    sizes="100vw"
                  />
                </div>
              </div>
            ) : (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="text-base font-semibold text-gray-900">
                          {item.name}
                        </div>
                        {item.description && (
                          <div className="text-sm text-gray-700 mt-1">
                            {item.description}
                          </div>
                        )}
                        {item.price !== undefined && (
                          <div className="text-xs text-gray-600 font-medium mt-1">
                            {item.price} pesos
                          </div>
                        )}
                      </div>
                      {item.imageUrl && (
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                            unoptimized
                            onClick={() => setSelectedItem(item)}
                            role="button"
                            aria-label={`Ver ${item.name}`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedItem && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-30"
              onClick={() => setSelectedItem(null)}
            >
              <div
                className="bg-white rounded-lg shadow-2xl max-w-lg w-[90%] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedItem.imageUrl && (
                  <div className="relative w-full h-64 bg-gray-100">
                    <Image
                      src={selectedItem.imageUrl}
                      alt={selectedItem.name}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      unoptimized
                    />
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedItem.name}
                    </h3>
                    {selectedItem.price !== undefined && (
                      <span className="text-sm text-gray-700 font-medium">
                        {selectedItem.price} pesos
                      </span>
                    )}
                  </div>
                  {selectedItem.description && (
                    <p className="text-sm text-gray-700">
                      {selectedItem.description}
                    </p>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm px-3 py-1 rounded-md bg-gray-900 text-white"
                      onClick={() => setSelectedItem(null)}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Menu;
