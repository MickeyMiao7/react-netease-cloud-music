const express = require('express')
const app = express()

const request = require('request')


app.get('/', function (req, res) {
	request('http://music.163.com/api/song/lyric?id=29775505', function(error, response, body) {
		res.send(`Error: ${error}, response: ${response}, body: ${body}`)
	})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})