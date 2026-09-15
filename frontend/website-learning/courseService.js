import api from "./api";

/**
 * Matches the RESTful contract expected from the Node/Express backend:
 *   GET    /api/courses?search=&level=&page=&limit=
 *   GET    /api/courses/:id
 *   POST   /api/courses
 *   PUT    /api/courses/:id
 *   DELETE /api/courses/:id
 */
export const courseService = {
  async list({ search = "", level = "", page = 1, limit = 9 } = {}) {
    const { data } = await api.get("/courses", {
      params: { search, level, page, limit },
    });
    // Expected shape: { items: Course[], total, page, pages }
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`/courses/${id}`);
    return data;
  },

  async create(payload) {
    const { data } = await api.post("/courses", payload);
    return data;
  },

  async update(id, payload) {
    const { data } = await api.put(`/courses/${id}`, payload);
    return data;
  },

  async remove(id) {
    await api.delete(`/courses/${id}`);
  },
};
