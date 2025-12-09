"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { OrderItem } from "@/app/order/types";

export interface OrderProps {
  isExpanded: boolean;
  expandedWidthClass?: string;
  items?: OrderItem[];
  showPayment?: boolean;
}

type PaymentMethod = "cash" | "card" | "points";

function Order({ isExpanded, expandedWidthClass, items = [], showPayment = false }: OrderProps) {
  const widthWhenExpanded = expandedWidthClass ?? "w-1/2 overflow-auto";
  const containerClass =
    (isExpanded ? widthWhenExpanded : "w-0 overflow-hidden opacity-0") +
    " transition-all rounded-xl duration-200 ease-in-out flex flex-col bg-white";

  const total = items.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("card");

  const paymentOptions = useMemo(
    () => [
      { key: "cash" as PaymentMethod, label: "Efectivo" },
      { key: "card" as PaymentMethod, label: "Tarjeta" },
      { key: "points" as PaymentMethod, label: "Enlace Gourmet" },
    ],
    []
  );

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
              <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-inner space-y-4">
                <div className="text-base font-semibold text-gray-900">
                  Opciones de pago
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {paymentOptions.map((option) => {
                    const isActive = selectedPayment === option.key;
                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setSelectedPayment(option.key)}
                        className={`px-3 py-2 text-sm font-semibold rounded-md border transition-colors ${
                          isActive
                            ? "bg-gray-900 text-white border-gray-900"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>

                {selectedPayment === "cash" && (
                  <div className="border border-gray-200 rounded-md p-4 bg-white space-y-3">
                    <div className="flex flex-col items-center text-center gap-3">
                      <svg
                        width="96"
                        height="96"
                        viewBox="0 0 96 96"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-900"
                      >
                        <rect x="6" y="24" width="84" height="48" rx="6" stroke="currentColor" strokeWidth="4" fill="#F7F7F7" />
                        <rect x="16" y="32" width="64" height="32" rx="4" stroke="currentColor" strokeWidth="3" fill="white" />
                        <circle cx="48" cy="48" r="10" stroke="currentColor" strokeWidth="4" fill="#E5E7EB" />
                        <path d="M44 42h8c1.8 0 3.2 1.4 3.2 3.2 0 1.8-1.4 3.2-3.2 3.2h-5.2c-1.8 0-3.2 1.4-3.2 3.2S45 55 46.8 55H56" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        <path d="M48 39v5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        <path d="M48 55v5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      <div className="text-sm text-gray-800">
                        Pagarás en efectivo al mesero. Avísanos y lo registramos.
                      </div>
                    </div>
                    <button
                      type="button"
                      className="w-full bg-gray-900 text-white rounded-md py-2 text-sm font-semibold hover:bg-gray-800"
                    >
                      Pagar en efectivo
                    </button>
                  </div>
                )}

                {selectedPayment === "card" && (
                  <div className="flex flex-col gap-3 border border-gray-200 rounded-md p-4 bg-white">
                    <div className="text-sm font-semibold text-gray-900">
                      Pago con tarjeta
                    </div>
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
                )}

                {selectedPayment === "points" && (
                  <div className="border border-gray-200 rounded-md p-4 bg-white space-y-3">
                    <Image
                      src="/eg2.png"
                      alt="Enlace Gourmet"
                      width={96}
                      height={96}
                      className="object-contain rounded-md"
                    />
                    <div className="text-sm text-gray-800">
                      Saldo disponible: <span className="font-semibold">540 puntos</span>
                    </div>
                    <button
                      type="button"
                      className="w-full bg-gray-900 text-white rounded-md py-2 text-sm font-semibold hover:bg-gray-800"
                    >
                      Pagar con mis puntos
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Order;
