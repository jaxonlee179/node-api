
class Posts {

	constructor(req, res, db) {
		this.req = req;
		this.res = res;
		this.db = db;
	}

	getPosts() {
		let sql = "SELECT * FROM ay_posts";
		this.db.query(sql, (err, result) => {
			if(err) throw err;
			this.res.json(result);
		});
	}

	singleBlogPost() {
		let param = this.req.body.param;
		if(param != '') {
			let sql = "SELECT * FROM ay_posts WHERE post_name = ?";
			this.db.query(sql, param, (err, result) => {
				if(err) {
					throw err;
					this.res.status(400).send("Something Went Wrong!");
				} 
				if(result.length > 0) {
					this.res.json(result);
				} else {
					this.res.json("invalid");
				}
			});
		}
	}

	addPost() {
		let date = new Date();
		let posted_date = date.getFullYear() + "-" + date.getMonth() + 
			"-" + date.getDate();
		let posted_time = date.getHours() + ":" + date.getMinutes() + 
			":" + date.getSeconds();
		let title = this.req.body.post_title;
		title = title.replace(/\s+/g, '-').toLowerCase();
		this.req.body.post_name = title;
		this.req.body.post_date = posted_date + " " + posted_time;
		this.db.query('INSERT INTO ay_posts SET ?', this.req.body, (err, result) => {
			if(err) throw err;
			this.res.json('posted');
		});
	}

}

module.exports = Posts;