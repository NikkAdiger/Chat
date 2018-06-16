const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const posts = await Post.find({});
    // res.status(200).json(posts);
    res.status(200).send(posts);
    // res.send(posts);
});

router.post('/', async (req, res) => {
    const postData = {
        tittle: req.body.tittle,
        text: req.body.text
    }
    const post = new Post(postData);

    await post.save();

    console.log(post);

    res.status(201);
    res.send(post);

});

router.delete('/:postId', async (req, res) => {

    await Post.remove({_id: req.params.postId});

    res.status(200);
    res.send({message: 'Delete success'});

});

module.exports = router;