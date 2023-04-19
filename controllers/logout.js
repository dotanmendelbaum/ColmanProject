logout = (req, res) => {
    if (req.session) {
        console.log("logout")
        req.session.destroy(err => {
            if (err) {
                res.status(400)
            } else {
                res.status(200).redirect('/login')
            }
        });
    } else {
        res.end()
    }
}

module.exports = {
    logout
}