(function (root) {
  var PT = root.PT || (root.PT = {});

  var PhotoDetailView = PT.PhotoDetailView = function (photo) {
    this.$el = $("<div></div>");
    this.photo = photo;

    this.$el.on("click", "a#photosListView", this.showList.bind(this));
    this.$el.on("click", "img", this.popTagSelectView.bind(this));
  };

  _.extend(PhotoDetailView.prototype, {
    popTagSelectView: function (event) {
      var tagSelectView = new PT.TagSelectView(this.photo, event);
      this.$el.append(tagSelectView.render().$el);
    },

    render: function () {
      var view = this;

      this.$el.html(
        JST["photo_detail"]({ photo: this.photo })
      );

      return this;
    },

    showList: function (event) {
      event.preventDefault();
      PT.showPhotosIndex();
    }
  });
})(this);
