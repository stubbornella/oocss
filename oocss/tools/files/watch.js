var EventEmitter = require("events").EventEmitter, util = require("util");
var watchDelay = 2000;

var WatchClass = function() {
    "use strict";
    function Watch(options) {
        EventEmitter.call(this);
        this.__topLvlWatchers = [];
        this.__watchedItems = {};
        this.fs = require("fs");
        this.path = require("path");
    }
    util.inherits(Watch, EventEmitter);
    Watch.prototype.add = function(str_file_or_path, recursive) {
        recursive = recursive || false;
        return this.__handle(true, str_file_or_path, recursive);
    };
    Watch.prototype.remove = function(str_file_or_path) {
        return this.__handle(false, str_file_or_path);
    };
    Watch.prototype.onChange = function(cb) {
        if (typeof cb === "function") {
            this.on("change", cb);
        } else {
            throw new Error("Non-function provided as the callback for onChange");
        }
        return this;
    };
    Watch.prototype.clearListeners = function() {
        this.removeAllListeners("change");
        this.removeAllListeners();
        return this;
    };
    Watch.prototype.__handle = function(add, str_file_or_path, recursive) {
        str_file_or_path = this.path.resolve(str_file_or_path);
        if (add) {
            if (this.__topLvlWatchers.indexOf(str_file_or_path) === -1) {
                this.__topLvlWatchers.push(str_file_or_path);
            }
        } else {
            var index = this.__topLvlWatchers.indexOf(str_file_or_path);
            if (index >= 0) {
                this.__topLvlWatchers.splice(index, 1);
            }
        }
        var stat = null;
        try {
            stat = this.fs.statSync(str_file_or_path);
        } catch (e) {
            if (add) {
                throw e;
            } else {
                stat = false;
                if (self.__watchedItems.hasOwnProperty(str_file_or_path)) {
                    self.fs.unwatchFile(str_file_or_path);
                    delete self.__watchedItems[str_file_or_path];
                }
            }
        }
        if (stat) {
            if (stat.isFile()) {
                return this.__file(add, str_file_or_path);
            }
            if (stat.isDirectory()) {
                return this.__dir(add, str_file_or_path, recursive);
            }
        }
    };
    Watch.prototype.__dir = function(add, dir, recursive) {
        var self = this;
        recursive = recursive || false;
        if (add) {
            if (!self.__watchedItems.hasOwnProperty(dir)) {
                self.__watchedItems[dir] = {
                    recursive: recursive
                };
                self.__rescan(add, dir, recursive, false);
                self.fs.watchFile(dir, function(curr, prev) {
                    self.__rescan(add, dir, recursive, true);
                });
            } else {
                throw new Error("Folder already being watched");
            }
        } else {
            if (self.__watchedItems.hasOwnProperty(dir)) {
                self.__rescan(add, dir, self.__watchedItems[dir].recursive, false);
                delete self.__watchedItems[dir];
            }
            self.fs.unwatchFile(dir);
        }
        return self;
    };
    Watch.prototype.__file = function(add, file) {
        var self = this;
        var is_file = false;
        try {
            is_file = self.fs.statSync(file).isFile();
        } catch (e) {
            is_file = false;
        }
        if (!is_file) {
            return self;
        }
        if (add) {
            if (self.__watchedItems.hasOwnProperty(file)) {
                throw new Error("File already being watched");
                return self;
            }
            self.__watchedItems[file] = true;
            self.fs.watchFile(file, { interval: watchDelay}, function watchMe(prev, curr) {
                try {
                    var stat = self.fs.statSync(file).isFile();
                    if (prev.mtime.getTime() !== curr.mtime.getTime()) {
                        self.emit("change", file, prev, curr, "change");
                    }
                } catch (e) {
                    if (e.code === "ENOENT") {
                        self.emit("change", file, prev, curr, "delete");
                        if (self.__topLvlWatchers.indexOf(file) < 0) {
                            self.fs.unwatchFile(file);
                            delete self.__watchedItems[file];
                        }
                        return;
                    } else {
                        throw e;
                    }
                }
            });
        } else {
            self.fs.unwatchFile(file);
            delete self.__watchedItems[file];
        }
        return self;
    };
    Watch.prototype.__rescan = function(add, folder, recursive, reportNew) {
        var self = this;
        self.fs.stat(folder, function(err, stat) {
            if (err) {
                if (err.code !== "ENOENT") {
                    throw err;
                    return;
                }
                console.log("__rescan");
                if (self.__topLvlWatchers.indexOf(folder) < 0) {
                    self.fs.unwatchFile(folder);
                    delete self.__watchedItems[folder];
                }
            } else {
                var files = self.fs.readdirSync(folder);
                files.forEach(function(file) {
                    var full_path = self.path.join(folder, file);
                    var stat;
                    if (!add || !self.__watchedItems.hasOwnProperty(full_path)) {
                        stat = self.fs.statSync(full_path);
                        if (stat.isFile()) {
                            self.__file(add, full_path);
                            if (add && reportNew) {
                                self.emit("change", full_path, stat, stat, "new");
                            }
                        } else if (recursive && stat.isDirectory()) {
                            self.__dir(add, full_path, recursive);
                        }
                    }
                });
            }
        });
    };
    return Watch;
}();

module.exports = new WatchClass;