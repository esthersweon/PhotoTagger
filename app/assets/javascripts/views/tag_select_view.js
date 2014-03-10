(function (root) {
  var PT = root.PT || (root.PT = {});

  var TagSelectView = PT.TagSelectView = function (photo, event) {
    this.$el = $("<div></div>");
    this.photo = photo;

    var imgPos = $(event.currentTarget).position();
    this.$el.css({
      position: "absolute",
      left: event.offsetX + imgPos.left - 50,
      top: event.offsetY + imgPos.top - 50
    });
  };

  _.extend(TagSelectView.prototype, {
    render: function () {
      this.$el.empty();

      var $tagBox = $("<div></div>");
      $tagBox.addClass("photo-tag");
      this.$el.append($tagBox);

      this.$el.append(JST["photo_tag_options"]({
        users: USERS
      }));

      return this;
    }
  });
})(this);
