import Api from "./Api";

export default {
  getPosts() {
    return Api().get("posts");
  },
  // Modify the submitPost method to handle FormData for image upload
  submitPost(postData) {
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("image", postData.image); // Assuming you have an image file

    return Api().post("https://localhost:8081/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  likePost({ id, jwtToken }) {
    return Api().post(`posts/${id}/like`, { like: 1, jwtToken });
  },
  dislikePost({ id, jwtToken }) {
    return Api().post(`posts/${id}/like`, { like: -1, jwtToken });
  },
};
