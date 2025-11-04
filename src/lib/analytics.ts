// lib/analytics.ts

/**
 * Analytics Tracking Utilities
 * Tracks events to Google Analytics (G-VYB14XHQDZ) and Facebook Pixel (982652617172806)
 */

import { SimpleProduct, ProductVariant } from "@/types/shopify";

/**
 * Cart Item Type
 */
interface CartItem {
  id: string;
  productTitle: string;
  variantTitle: string;
  price: {
    amount: string;
  };
  quantity: number;
}

/**
 * ============================================
 * PRODUCT PAGE TRACKING
 * ============================================
 */

/**
 * Track product page view
 * Call when user lands on a product detail page
 */
export const trackProductView = (product: SimpleProduct, selectedVariant?: ProductVariant | null) => {
  if (typeof window === 'undefined') return;

  const price = selectedVariant 
    ? parseFloat(selectedVariant.price.amount) 
    : parseFloat(product.price.amount);

  // Google Analytics - View Item
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: price,
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          item_category: 'T-Shirts',
          item_variant: selectedVariant?.title || 'Default',
          item_brand: 'MyDearNikes',
          price: price,
          quantity: 1,
        },
      ],
    });
  }

  // Facebook Pixel - ViewContent
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: product.title,
      content_ids: [product.id],
      content_type: 'product',
      value: price,
      currency: 'INR',
    });
  }

  console.log('👕 Analytics: Product View -', product.title, '- ₹' + price);
};

/**
 * ============================================
 * CATEGORY PAGE TRACKING
 * ============================================
 */

/**
 * Track category/collection page view
 * Call when user views a category page
 */
export const trackCategoryView = (categoryName: string, productCount: number) => {
  if (typeof window === 'undefined') return;

  // Google Analytics - View Item List
  if (window.gtag) {
    window.gtag('event', 'view_item_list', {
      item_list_id: categoryName.toLowerCase().replace(/\s+/g, '_'),
      item_list_name: categoryName,
    });
  }

  // Facebook Pixel - ViewContent for category
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: categoryName,
      content_category: 'Product Category',
      content_type: 'product_group',
    });
  }

  console.log('📂 Analytics: Category View -', categoryName, '- Products:', productCount);
};

/**
 * Track when user clicks on a product from category/grid
 */
export const trackProductClick = (product: SimpleProduct, listName: string, position: number) => {
  if (typeof window === 'undefined') return;

  const price = parseFloat(product.price.amount);

  // Google Analytics - Select Item
  if (window.gtag) {
    window.gtag('event', 'select_item', {
      item_list_id: listName.toLowerCase().replace(/\s+/g, '_'),
      item_list_name: listName,
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          item_brand: 'MyDearNikes',
          price: price,
          index: position,
        },
      ],
    });
  }

  console.log('🖱️ Analytics: Product Click -', product.title, 'from', listName);
};

/**
 * ============================================
 * ADD TO CART TRACKING
 * ============================================
 */

/**
 * Track add to cart event
 * Call when user successfully adds item to cart
 */
export const trackAddToCart = (
  product: SimpleProduct,
  selectedVariant: ProductVariant,
  quantity: number
) => {
  if (typeof window === 'undefined') return;

  const price = parseFloat(selectedVariant.price.amount);
  const totalValue = price * quantity;

  // Google Analytics - Add to Cart
  if (window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'INR',
      value: totalValue,
      items: [
        {
          item_id: selectedVariant.id,
          item_name: product.title,
          item_variant: selectedVariant.title,
          item_brand: 'MyDearNikes',
          price: price,
          quantity: quantity,
        },
      ],
    });
  }

  // Facebook Pixel - AddToCart
  if (window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: product.title,
      content_ids: [selectedVariant.id],
      content_type: 'product',
      value: totalValue,
      currency: 'INR',
      contents: [
        {
          id: selectedVariant.id,
          quantity: quantity,
        },
      ],
    });
  }

  console.log('🛒 Analytics: Add to Cart -', product.title, '- Qty:', quantity, '- ₹' + totalValue);
};

/**
 * ============================================
 * CART DRAWER TRACKING
 * ============================================
 */

/**
 * Track when cart drawer is opened
 */
export const trackViewCart = (items: CartItem[], totalValue: number) => {
  if (typeof window === 'undefined') return;

  // Google Analytics - View Cart
  if (window.gtag) {
    window.gtag('event', 'view_cart', {
      currency: 'INR',
      value: totalValue,
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.productTitle,
        item_variant: item.variantTitle,
        price: parseFloat(item.price.amount),
        quantity: item.quantity,
        index: index,
      })),
    });
  }

  console.log('🛍️ Analytics: View Cart -', items.length, 'items - ₹' + totalValue);
};

/**
 * Track remove from cart
 */
export const trackRemoveFromCart = (item: CartItem) => {
  if (typeof window === 'undefined') return;

  const price = parseFloat(item.price.amount);
  const totalValue = price * item.quantity;

  // Google Analytics - Remove from Cart
  if (window.gtag) {
    window.gtag('event', 'remove_from_cart', {
      currency: 'INR',
      value: totalValue,
      items: [
        {
          item_id: item.id,
          item_name: item.productTitle,
          item_variant: item.variantTitle,
          price: price,
          quantity: item.quantity,
        },
      ],
    });
  }

  console.log('🗑️ Analytics: Remove from Cart -', item.productTitle);
};

/**
 * ============================================
 * CHECKOUT TRACKING
 * ============================================
 */

/**
 * Track begin checkout (when user clicks checkout button)
 */
export const trackBeginCheckout = (items: CartItem[], totalValue: number) => {
  if (typeof window === 'undefined') return;

  // Google Analytics - Begin Checkout
  if (window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: 'INR',
      value: totalValue,
      items: items.map((item, index) => ({
        item_id: item.id,
        item_name: item.productTitle,
        item_variant: item.variantTitle,
        price: parseFloat(item.price.amount),
        quantity: item.quantity,
        index: index,
      })),
    });
  }

  // Facebook Pixel - InitiateCheckout
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: items.map((item) => item.id),
      contents: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      value: totalValue,
      currency: 'INR',
      num_items: items.length,
    });
  }

  console.log('💳 Analytics: Begin Checkout -', items.length, 'items - ₹' + totalValue);
};

/**
 * ============================================
 * SEARCH TRACKING
 * ============================================
 */

/**
 * Track search event
 */
export const trackSearch = (searchTerm: string, resultCount?: number) => {
  if (typeof window === 'undefined') return;

  // Google Analytics - Search
  if (window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      ...(resultCount !== undefined && { search_results: resultCount }),
    });
  }

  // Facebook Pixel - Search
  if (window.fbq) {
    window.fbq('track', 'Search', {
      search_string: searchTerm,
    });
  }

  console.log('🔍 Analytics: Search -', searchTerm);
};

/**
 * ============================================
 * UTILITY FUNCTIONS
 * ============================================
 */

/**
 * Track custom events
 */
export const trackCustomEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('trackCustom', eventName, eventParams);
  }

  console.log('🎯 Analytics: Custom Event -', eventName, eventParams);
};