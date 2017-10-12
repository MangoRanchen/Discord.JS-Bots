const { connect } = require(`mongodb`);

class Database {
	constructor() {
		this.url = process.env.MONGODB_URI;
	}

	insert(objects) {
		return new Promise((resolve, reject) => {
			connect(this.url, (error, db) => {
				if (error) return reject(error);
				console.log(`Connected successfully to server`);

				var collection = db.collection(`documents`);
				collection.insertMany(objects, (error, result) => {
					if (error) return reject(error);
					console.log(`Inserted document(s) into the collection`);
					resolve(result);
				});
			});
		});
	}

	find(object) {
		return new Promise((resolve, reject) => {
			connect(this.url, (error, db) => {
				if (error) return reject(error);
				console.log(`Connected successfully to server`);

				var collection = db.collection(`documents`);
				collection.find(object).toArray((error, result) => {
					if (error) return reject(error);
					console.log(`Found the following records`);
					console.log(result);
					resolve(result);
				});
			});
		});
	}

	update(object, object2) {
		return new Promise((resolve, reject) => {
			connect(this.url, (error, db) => {
				if (error) return reject(error);
				console.log(`Connected successfully to server`);

				var collection = db.collection(`documents`);
				collection.updateOne(object, { $set: object2 }, (error, result) => {
					if (error) return reject(error);
					console.log(`Updated the document`);
					resolve(result);
				});
			});
		});
	}

	remove(object) {
		return new Promise((resolve, reject) => {
			connect(this.url, (error, db) => {
				if (error) return reject(error);
				console.log(`Connected successfully to server`);

				var collection = db.collection(`documents`);
				collection.deleteOne(object, (error, result) => {
					if (error) return reject(error);
					console.log(`Removed the document with the field a equal to 3`);
					resolve(result);
				});
			});
		});
	}
}

module.exports = Database;
