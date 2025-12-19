import { Map, Marker } from '@vis.gl/react-google-maps';
const ShopMap = () => {
  // Coordinates for your shop (you'll need to find the lat/lng for your address)
  const shopLocation = { lat: 1.500, lng: 103.500 }; // Example coordinates for Johor
  return (
    <div className="w-full h-[250px] rounded-xl overflow-hidden shadow-lg">
      <Map
        zoom={15}
        center={shopLocation}
        gestureHandling={'greedy'}
        disableDefaultUI={false}
        mapId={'YOUR_MAP_ID_IF_ANY'} // Optional: for custom map styles
      >
        <Marker position={shopLocation} />
      </Map>
    </div>
  );
};
export default ShopMap;