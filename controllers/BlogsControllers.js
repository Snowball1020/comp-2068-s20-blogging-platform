const viewPath = ("blogs")

const Blog = require("../models/Blog")

exports.index = async (req, res) => {

    try {
        const blogs = await Blog.find().sort({
            updatedAt: "desc"
        });

        res.render(`${viewPath}/index`, {
            pageTitle: "Archive",
            blogs: blogs
        })

    } catch (error) {
        req.flash("danger", `There was an error: ${error}`)
        res, redirect("/");
    }
}

exports.show = async (req, res) => {

    try {
        const blog = await Blog.findById(req.params.id);
        res.render(`${viewPath}/show`, {
            pageTitle: blog.title,
            blog: blog
        })

    } catch (error) {
        req.flash("danger", `There was an error: ${error}`)
        res, redirect("/blogs");

    }

}

exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: "New Blog"
    })
}

exports.create = async (req, res) => {

    try {
        const blog = await Blog.create(req.body)
        req.flash("success", "Blog created successfuly")
        res.redirect(`/blogs/${blog.id}`)
    } catch (error) {
        req.flash("danger", `There was an error creating this blog: ${error}`)
        req.session.formData = req.body;
        res.redirect("/blogs/new")
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
        let blog = await Blog.findById(req.body.id);

        if (!blog) throw Error("blog could not be found")


        await Blog.validate(req.body)
        await Blog.updateOne(req.body)

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
        req.flash("success", "Blog Deleted successfuly")
        res.redirect(`/blogs`)



    } catch (error) {
        req.flash("danger", `There was an error: ${error}`)

        res, redirect(`/blogs`);

    }

}
