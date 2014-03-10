(function (root) {
  var PT = root.PT || (root.PT = {});

  var PhotoFormView = PT.PhotoFormView = function () {
    this.$el = $("<div></div>");
    this.$el.on("submit", "form", this.submit.bind(this));
  };

  _.extend(PhotoFormView.prototype, {
    render: function () {
      var view = this;

      this.$el.html(JST["photo_form"]());

      return this;
    },

    submit: function (event) {
      event.preventDefault();

      var data = $(event.currentTarget).serializeJSON();

      var photo = new PT.Photo(data.photo);
      photo.create(function (photo) {
        console.log("Photo got saved!");
      });
    }
  });
})(this);
