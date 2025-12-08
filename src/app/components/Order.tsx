"use client";

import React from "react";
import Image from "next/image";
import { OrderItem } from "@/app/order/types";

export interface OrderProps {
  isExpanded: boolean;
  expandedWidthClass?: string;
  items?: OrderItem[];
  showPayment?: boolean;
}

function Order({ isExpanded, expandedWidthClass, items = [], showPayment = false }: OrderProps) {
  const widthWhenExpanded = expandedWidthClass ?? "w-1/2 overflow-auto";
  const containerClass =
    (isExpanded ? widthWhenExpanded : "w-0 overflow-hidden opacity-0") +
    " transition-all rounded-xl duration-200 ease-in-out flex flex-col bg-white";

  const total = items.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0);

  return (
    <div className={containerClass}>
      {isExpanded && (
        <>
          <div className="flex items-center justify-between px-6 py-3.5 sticky top-0 z-10 text-base border-b bg-white rounded-t-xl">
            <span className="font-semibold">Orden</span>
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
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm flex items-start gap-3"
                  >
                    {item.imageUrl && (
                      <div className="relative w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-gray-900">
                          {item.name}
                        </span>
                        <span className="text-sm text-gray-700 font-medium">
                          {item.quantity} x {item.price ?? 0} pesos
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Subtotal: {(item.price ?? 0) * item.quantity} pesos
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center border-t border-gray-200 pt-3 text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{total} pesos</span>
                </div>
              </div>
            )}
            {showPayment && (
              <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-inner space-y-3">
                <div className="text-base font-semibold text-gray-900">
                  Pago con tarjeta
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Nombre en la tarjeta
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="Como aparece en la tarjeta"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Expiración (MM/AA)
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        placeholder="***"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-black text-white rounded-md py-2 text-sm font-semibold hover:bg-gray-900"
                  >
                    Pagar
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Order;
