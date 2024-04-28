module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id: { type: Number, required: true, unique: true }, 
        nom: String,
        genre: String,
        synopsis: String,
        realisateur: String,
        anneeSortie: Number,
      }
    );
  
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Movie = mongoose.model("movie", schema);
    return Movie;
  };