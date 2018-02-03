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
exports.searchVideo = function (str, callback) {
	MongoClient.connect(url, function (err, db) {
		if (!err) {
			db.collection('videos_mbds').find({ legende: { '$regex': str, '$options': 'i' } }).toArray()
				.then(arr => callback(arr));
		} else {
			callback(-1);
		}
	});
}

exports.findAllVideos = function (page, pagesize, callback) {
	MongoClient.connect(url, function (err, db) {
		
		if (!err) {
			db.collection('videos_mbds')
				.find({ "url": { $exists: true, $ne: null } })
				//.limit(pagesize)
				.toArray()
				.then(arr => { console.log(arr); callback(arr) });
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


exports.createUser = function (formData, callback) {
	MongoClient.connect(url, function (err, db) {
		if (!err) {
			let toInsert = formData.body;
			console.log("Insertion de l'utilisateur: " + toInsert);
			db.collection("videos_mbds")
				.insertOne(toInsert, function (err, result) {
					if (!err) {
						console.log("User inseré")
						callback(result)
					} else {
						console.log(err)
					}
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

exports.addVote = function (formData, callback) {
	MongoClient.connect(url, function (err, db) {
		if (!err) {
			let toPut = formData.body;
			console.log(toPut);
			// verifier l'existance du vote en question
			db.collection("videos_mbds")
				.findOne({ userId: toPut.user, votes: { $elemMatch: { video: toPut.vote.video } } }, function (err, data) {
					if (err) throw err;
					if (data != null) {
						console.log("vote existe deja!")
						callback({ already: true })

					}
					else {
						// ajouter le vote
						db.collection("videos_mbds").update(
							{ "userId": toPut.user },
							{
								"$push": {
									"votes": toPut.vote
								}
							}, function (err, data) {
								if (err) throw err;
							}
						);
						db.collection("videos_mbds").update(
							{ "_id": ObjectId(toPut.vote.video) },
							{
								"$set": {
									"vote": toPut.vote.value
								}
							}
							, function (err, data) {
								if (err) throw err;

								callback({ already: false });

							}
						);
					}
					db.close();
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

