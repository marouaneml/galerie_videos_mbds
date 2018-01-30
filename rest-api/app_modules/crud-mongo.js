var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';

exports.connexionMongo = function (callback) {
	MongoClient.connect(url, function (err, db) {
		assert.equal(null, err);
		callback(err, db);
	});
}

exports.findAllVideos = function (page, pagesize, callback) {
	MongoClient.connect(url, function (err, db) {

		if (!err) {
			db.collection('videos_mbds')
				.find()
				//.skip(page * pagesize)
				.limit(pagesize)
				.toArray()
				.then(arr => callback(arr));
		}
		else {
			callback(-1);
		}
	});
};

exports.createVideo = function (formData, callback) {
	MongoClient.connect(url, function (err, db) {
		if (!err) {
			let toInsert = formData.body;
			db.collection("videos_mbds")
				.insertOne(toInsert, function (err, result) {
					let reponse;

					if (!err) {
						reponse = {
							succes: true,
							result: result,
							error: null,
							msg: "Ajout réussi"
						};
					} else {
						reponse = {
							succes: false,
							error: err,
							msg: "Problème à l'insertion"
						};
					}
					callback(reponse);
				});
		} else {
			let reponse = reponse = {
				succes: false,
				error: err,
				msg: "Problème lors de l'insertion, erreur de connexion."
			};
			callback(reponse);
		}
	});
}

exports.findVideo = function (id, callback) {
	var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
	if (checkForHexRegExp.test(id)) {
		MongoClient.connect(url, function (err, db) {
			if (!err) {
				db.collection('videos_mbds')
					.findOne({ '_id': ObjectId(id) }, function (err, data) {
						if (err) throw err;
						if (data != null) {
							callback(data)
						}
						else {
							callback(-1)
						}
						db.close();
					});
			}
			else {
				callback(-1);
			}
		});
	}
	else {
		callback(-1)
	}

};

exports.deleteVideo = function (id, callback) {
	MongoClient.connect(url, function (err, db) {

		if (!err) {
			
			db.collection('videos_mbds')
				.remove({ '_id': ObjectId(id) }, function (err, obj) {
					if (err) throw err;
					console.log(obj.result.n + " document(s) deleted");
					callback(obj.result.n)
					db.close();
				});
		}
		else {
			callback(-1);
		}
	});
};
