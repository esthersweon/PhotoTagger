(function (root) {
  var PT = root.PT || (root.PT = {});

  var PhotosListView = PT.PhotosListView = function () {
    this.$el = $("<div></div>");

    this.$el.on("click", "a", this.showDetail.bind(this));

    // re-render when new photos get added
    PT.Photo.on("add", this.render.bind(this));
  };

  _.extend(PhotosListView.prototype, {
    render: function () {
      var view = this;

      this.$el.empty();
      var $ul = $("<ul></ul>");
      _(PT.Photo.all).each(function (photo) {
        var $li = $("<li></li>");
        var $a = $("<a></a>");
        $a.text(photo.get("title"));
        $a.attr("href", "#");
        $a.attr("data-id", photo.get("id"));

        $ul.append($li.html($a));
      });

      this.$el.html($ul);

      return this;
    },

    showDetail: function (event) {
      event.preventDefault();

      var $currentTarget = $(event.currentTarget);
      var photo = PT.Photo.find(parseInt($currentTarget.attr("data-id")));
      PT.showPhotoDetail(photo);
    }
  });
})(this);
