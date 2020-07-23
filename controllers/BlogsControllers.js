const viewPath = ("blogs")

const Blog = require("../models/Blog")
const User = require("../models/User")

exports.index = async (req, res) => {

    try {
        const blogs = await Blog
            .find()
            .populate("user")
            .sort({
                updatedAt: "desc"
            });

        res.status(200).json(blogs);


    } catch (error) {
        res.status(400).json({ message: "There was an error fetching blogs", error })
    }
}

exports.show = async (req, res) => {

    try {
        const blog = await Blog.findById(req.params.id)
            .populate("user")
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({ message: "There was an error fetching the blog" })
    }

}

exports.new = (req, res) => {

    res.render(`${viewPath}/new`, {
        pageTitle: "New Blog"
    })
}

exports.create = async (req, res) => {

    try {
        const { user: email } = req.session.passport;
        const user = await User.findOne({ email: email })
        const blog = await Blog.create({ user: user._id, ...req.body })

        res.status(200).json(blog)

    } catch (error) {
        res.status(400).json({ message: "There was an error creating the blog post", error })
    }

}

exports.edit = async (req, res) => {


    try {
        const blog = await Blog.findById(req.params.id);
        res.render(`${viewPath}/edit`, {
            pageTitle: blog.title,
            formData: blog
        })

    } catch (error) {
        req.flash("danger", `There was an error: ${error}`)

        res, redirect("/blogs");

    }

}

exports.update = async (req, res) => {

    try {

        const { user: email } = req.session.passport;
        const user = await User.findOne({ email: email })

        let blog = await Blog.findById(req.body.id);

        if (!blog) throw Error("blog could not be found")

        const attributes = { user: user._id, ...req.body }
        await Blog.validate(attributes)
        await Blog.updateOne(attributes)

        req.flash("success", "Blog updated successfuly")
        res.redirect(`/blogs/${req.body.id}`)



    } catch (error) {
        req.flash("danger", `There was an error: ${error}`)

        res, redirect(`/blogs/${req.body.id}/edit`);

    }

}

exports.delete = async (req, res) => {



    try {

        await Blog.deleteOne({ _id: req.body.id })
        res.status(200).json({ message: "Yay" })



    } catch (error) {
        res.status(400).json({ message: "Error deleting a blog" })
    }

}
