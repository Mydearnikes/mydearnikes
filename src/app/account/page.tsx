"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  const router = useRouter();
  const {
    customer,
    isAuthenticated,
    logout,
    refreshCustomer,
    checkAndRenewToken,
  } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    checkAndRenewToken();
    refreshCustomer();
  }, [isAuthenticated, router, refreshCustomer, checkAndRenewToken]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "FULFILLED":
        return "bg-green-100 text-green-800";
      case "UNFULFILLED":
        return "bg-yellow-100 text-yellow-800";
      case "PARTIALLY_FULFILLED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFinancialStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REFUNDED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-[60px] px-8">
        <div className="max-w-full mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-48 bg-gray-200 rounded-lg"></div>
              <div className="h-48 bg-gray-200 rounded-lg lg:col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-16 px-[8px]">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-xl font-semibold text-gray-900 mb-0 pt-4 font-inter tracking-tighter">
            Welcome back, {customer.firstName || customer.displayName}!
          </h1>
          <p className="text-gray-600 text-sm">{customer.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Default Address Card */}
          {customer.defaultAddress && (
            <div className="   ">
              <h2 className="text-sm font-semibold  text-gray-900 mb-2 flex items-center font-inter tracking-tight ">
                Default Address
              </h2>
              <div className="text-gray-900 text-xs ">
                <p className="font-medium text-md ">
                  {customer.defaultAddress.firstName}{" "}
                  {customer.defaultAddress.lastName}
                </p>
                <p className="text-gray-600 mt-1 ">
                  {customer.defaultAddress.address1}
                </p>
                {customer.defaultAddress.address2 && (
                  <p className="text-gray-600">
                    {customer.defaultAddress.address2}
                  </p>
                )}
                <p className="text-gray-600">
                  {customer.defaultAddress.city},{" "}
                  {customer.defaultAddress.province}{" "}
                  {customer.defaultAddress.zip}
                </p>
                <p className="text-gray-600">
                  {customer.defaultAddress.country}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Orders Section */}
        <div className="">
          <h2 className="text-sm font-semibold text-gray-900 mb-6 flex items-center font-inter tracking-tight ">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            Recent Orders
          </h2>

          {customer.orders.edges.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {customer.orders.edges.slice(0, 10).map(({ node: order }) => {
                const isCancelledOrClosed =
                  order.canceledAt || order.cancelledAt || order.closed;

                const handleTrackOrder = () => {
                  const message = `Hi, I would like to track my order #${order.orderNumber}`;
                  const whatsappUrl = `https://wa.me/919166668224?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                };

                return (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all hover:shadow-md bg-white group"
                  >
                    {/* Product Image - Full width at top */}
                    <div className="relative w-full aspect-square bg-gray-50">
                      {order.lineItems.edges[0]?.node.variant.image ? (
                        <Image
                          src={order.lineItems.edges[0].node.variant.image.url}
                          alt={order.lineItems.edges[0].node.variant.image.altText || order.lineItems.edges[0].node.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg
                            className="w-16 h-16 text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      {order.lineItems.edges.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                          +{order.lineItems.edges.length - 1}
                        </div>
                      )}
                    </div>

                    {/* Order Details */}
                    <div className="p-4">
                      <p className="text-xs font-semibold text-gray-900 mb-2">
                        Order #{order.orderNumber}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${getOrderStatusColor(
                            order.fulfillmentStatus
                          )}`}
                        >
                          {order.fulfillmentStatus || "Processing"}
                        </span>
                        {isCancelledOrClosed && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-medium">
                            {order.closed ? "Archived" : "Cancelled"}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-500 mb-3">
                        {new Date(order.processedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>

                      {/* Order Total */}
                      <div className="pt-1 border-t border-gray-100 mb-3">
                        <p className="text-sm font-bold text-gray-900">
                          ₹{parseFloat(order.totalPrice.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {order.lineItems.edges.length} {order.lineItems.edges.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>

                      {/* Track Order Button */}
                      <Button
                        onClick={handleTrackOrder}
                        className="w-full  text-white text-xs font-medium py-2 px-3 rounded-none transition-colors flex items-center justify-center gap-2"
                      >
                    
                        Track Order
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-gray-600 text-lg mb-4">
                You have not placed any orders yet
              </p>
              <button
                onClick={() => router.push("/")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center pb-8">
          <Button
            variant={"default"}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}