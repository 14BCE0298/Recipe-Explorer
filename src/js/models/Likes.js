export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, publisher, image) {
        const like = {
            id,
            title,
            publisher,
            image
        };
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(current => current.id === id);
        this.likes.splice(index, 1);
    }

    isLiked(id) {
        return this.likes.findIndex(current => current.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }
};