class Place {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;

  constructor(
    id: string,
    title: string,
    imageUri: string,
    address: string,
    lat: number,
    lng: number
  ) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
  }
}

export default Place;
