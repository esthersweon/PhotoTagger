(function (root) {
  var PT = root.PT || (root.PT = {});

  var Photo = PT.Photo = function (data) {
    this.attributes = _.extend({}, data);
  }

  _.extend(Photo, {
    _events: {},

    all: [],

    fetchByUserId: function (userId, callback) {
      $.ajax({
        url: "/api/users/" + userId + "/photos",
        type: "GET",
        success: function (photosData) {
          var photos = _(photosData).map(function (photoData) {
            return new Photo(photoData);
          });

          Photo.all = Photo.all.concat(photos);

          callback(photos);
        }
      });
    },

    find: function (id) {
      return _(this.all).find(function (photo) {
        return photo.get("id") == id;
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

  _.extend(Photo.prototype, {
    get: function (attrName) {
      return this.attributes[attrName];
    },

    set: function (attrName, val) {
      this.attributes[attrName] = val
    },

    create: function (callback) {
      var photo = this;

      $.ajax({
        url: "/api/photos",
        type: "POST",
        data: { photo: this.attributes },
        success: function (newAttrs) {
          _(photo.attributes).extend(newAttrs);

          Photo.all.push(photo);
          Photo.trigger("add");

          callback(photo);
        }
      });
    }
  });
})(this);
