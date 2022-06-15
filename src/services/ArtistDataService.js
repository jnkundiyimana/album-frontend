import http from "../http-common";
class ArtistDataService {
  getAll() {
    return http.get("/artists/");
  }
  get(id) {
    return http.get(`/artists/${id}`);
  }
  //implement display albums for artist
//   getAlbums(id) {
//     return http.get(`/albums/${id}/tracks`);
//   }
  create(data) {
    return http.post("/artists/", data);
  }
  update(id, data) {
    return http.put(`/artists/${id}`, data);
  }
  delete(id) {
    return http.delete(`/artists/${id}`);
  }

  getArtistAlbums(artistId){
    return http.get(`/artists/albums/${artistId}`);
  }

}
export default new ArtistDataService();