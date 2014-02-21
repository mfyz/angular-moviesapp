var htmlSnapshots = require('html-snapshots');
var result = htmlSnapshots.run({
	input: "sitemap",
	source: "../sitemap.xml",
	hostname: "movies.app",
	outputDir: "../snapshots",
	//outputDirClean: true,
	selector: ".content-loaded",
	phantomjs: "phantomjs"
});