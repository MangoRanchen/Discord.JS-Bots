const { connect } = require(`mongodb`);

class Database {
	constructor() {
		this.url = process.env.MONGODB_URI;
	}

	insert(objects) {
		let value = null;
		connect(this.url, (error, db) => {
			if (error) return console.error(error);
			console.log(`Connected successfully to server`);

			var collection = db.collection(`documents`);
			collection.insertMany(objects, (error, result) => {
				if (error) return console.error(error);
				console.log(`Inserted document(s) into the collection`);
				value = result;
			});
		});
		return value;
	}

	find(object) {
		let value = null;
		connect(this.url, (error, db) => {
			if (error) return console.error(error);
			console.log(`Connected successfully to server`);

			var collection = db.collection(`documents`);
			collection.find(object).toArray((error, docs) => {
				if (error) return console.error(error);
				console.log(`Found the following records`);
				console.log(docs);
				value = docs;
			});
		});
		return value;
	}

	update(object, object2) {
		let value = null;
		connect(this.url, (error, db) => {
			if (error) return console.error(error);
			console.log(`Connected successfully to server`);

			var collection = db.collection(`documents`);
			collection.updateOne(object, { $set: object2 }, (error, result) => {
				if (error) return console.error(error);
				console.log(`Updated the document with the field a equal to 2`);
				value = result;
			});
		});
		return value;
	}

	remove(object) {
		let value = null;
		connect(this.url, (error, db) => {
			if (error) return console.error(error);
			console.log(`Connected successfully to server`);

			var collection = db.collection(`documents`);
			collection.deleteOne(object, (error, result) => {
				if (error) return console.error(error);
				console.log(`Removed the document with the field a equal to 3`);
				value = result;
			});
		});
		return value;
	}
}

module.exports = Database;
