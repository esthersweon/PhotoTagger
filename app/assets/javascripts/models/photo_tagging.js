(function (root) {
  var PT = root.PT || (root.PT = {});

  var PhotoTagging = PT.PhotoTagging = function (data) {
    this.attributes = _.extend({}, data);
  }

  _.extend(PhotoTagging, {
    _events: {},

    all: [],

    fetchByPhotoId: function (photoId, callback) {
      $.ajax({
        url: "/api/photos/" + photoId + "/photo_taggings",
        type: "GET",
        success: function (photoTaggingsData) {
          var photoTaggings = _(photoTaggingsData).map(
            function (photoTaggingData) {
              return new PhotoTagging(photoTaggingData);
            }
          );

          PhotoTagging.all = PhotoTagging.all.concat(photoTaggings);

          callback(photoTaggings);
        }
      });
    },

    find: function (id) {
      return _(this.all).find(function (photoTagging) {
        return photoTagging.get("id") == id;
      });
    },

    on: function (eventName, callback) {
      var callbacks = this._events[eventName] || (this._events[eventName] = [])
      callbacks.push(callback);
    },

    trigger: function (eventName) {
      if (!this._events[eventName]) {
        return
      }

      this._events[eventName].forEach(function (callback) { callback() });
    }
  });

  _.extend(PhotoTagging.prototype, {
    get: function (attrName) {
      return this.attributes[attrName];
    },

    set: function (attrName, val) {
      this.attributes[attrName] = val
    },

    create: function (callback) {
      var photoTagging = this;

      $.ajax({
        url: "/api/photo_taggings",
        type: "POST",
        data: { photo_tagging: this.attributes },
        success: function (newAttrs) {
          _(photoTagging.attributes).extend(newAttrs);

          PhotoTagging.all.push(photoTagging);
          PhotoTagging.trigger("add");

          callback(photoTagging);
        },
        error: function(){
          alert("duplicate tagging!")
        }
      });
    }
  });
})(this);
