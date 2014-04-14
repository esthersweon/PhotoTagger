(function (root) {
  var PT = root.PT || (root.PT = {});

  var TagSelectView = PT.TagSelectView = function (photo, event) {
    this.$el = $("<div></div>");
    this.photo = photo;
    var imgPos = $(event.currentTarget).position();
    this.xPos = event.offsetX + imgPos.left - 50
    this.yPos = event.offsetY + imgPos.top - 50
    var that = this 
    
  
    this.$el.css({
      position: "absolute",
      left: that.xPos,
      top: that.yPos
    });
    

    
    this.$el.on("click", "li", function(event) {
      that.selectTagOption.bind(that)(event);
      event.stopPropagation();
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
    },
    
    selectTagOption: function (event) {
      var that = this;
      var userId = $(event.currentTarget).attr("data-id");
      new PT.PhotoTagging({
        user_id: userId,
        photo_id: that.photo.get("id"),
        x_pos: that.xPos,
        y_pos: that.yPos
      }).create(function(){
         $(event.currentTarget).addClass('tagged')
         that.$el.unbind('click')
       });
    }
  });
})(this);
