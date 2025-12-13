// imageLoader.ts
export default function shopifyLoader({ 
  src, 
  width, 
  quality 
}: { 
  src: string; 
  width: number; 
  quality?: number 
}) {
  // For local images from /public, append width as query param
  // Next.js needs this to know which size to generate
  if (src.startsWith('/')) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  // Handle Shopify CDN images
  if (src.includes('cdn.shopify.com')) {
    // Remove any existing size parameters
    const url = new URL(src);
    url.searchParams.delete('width');
    url.searchParams.delete('height');
    
    // Add Shopify's transformation parameters
    url.searchParams.set('width', width.toString());
    
    // Set quality (Shopify uses different naming)
    if (quality) {
      url.searchParams.set('quality', quality.toString());
    }
    
    return url.toString();
  }

  // Handle other external images (Unsplash, mydearnikes.com)
  if (src.includes('images.unsplash.com')) {
    return `${src}?w=${width}&q=${quality || 75}&fm=webp&fit=crop`;
  }

  if (src.includes('mydearnikes.com')) {
    return `${src}?w=${width}&q=${quality || 75}`;
  }

  // Fallback for any other images
  return src;
}