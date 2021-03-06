import http from "../http-common";
class AlbumDataService {
  getAll() {
    return http.get("/albums/");
  }
  get(id) {
    return http.get(`/albums/${id}`);
  }
  getTracksForAlbum(id) {
    return http.get(`/albums/${id}/tracks`);
  }
  create(data) {
    return http.post("/albums/", data);
  }
  update(id, data) {
    return http.put(`/albums/${id}`, data);
  }
  delete(id) {
    return http.delete(`/albums/${id}`);
  }
  deleteAll() {
    return http.delete(`/albums`);
  }
  findByTitle(title) {
    return http.get(`/albums/search/${title}`);
  }
}
export default new AlbumDataService();