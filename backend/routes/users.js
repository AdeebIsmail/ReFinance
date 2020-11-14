const router = require("express").Router();
let User = require("../models/user.models.js");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const salary = req.body.salary;

  const newUser = new User({ email, password, salary });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then((users) => {
      if (password === users.password) {
        res.json(users._id);
      } else {
        res.status(404).json("Wrong Credentials!");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/category/:id").post((req, res) => {
  const category = req.body.category;
  const id = req.params.id;

  User.findById(id).then((users) =>
    User.updateOne(
      { email: users.email },
      { $addToSet: { category: category } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send("It works");
        }
      }
    )
  );
});

router.route("/category/get/:id").get((req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((users) => res.json(users.category))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/category/delete/:id").post((req, res) => {
  const category = req.body.category;
  const id = req.params.id;

  User.findById(id).then((users) =>
    User.findOneAndUpdate(
      { email: users.email },
      { $pull: { category: category } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send("It works" + result);
        }
      }
    )
  );
});

router.route("/transaction/:id").post((req, res) => {
  const category = req.body.category;
  const id = req.params.id;
  const fee = req.body.fee;
  const date = req.body.date;
  const info = req.body.info;

  User.findById(id).then((users) =>
    User.updateOne(
      { email: users.email },
      {
        $addToSet: {
          transaction: {
            fee: fee,
            date: date,
            info: info,
            category: category,
          },
        },
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
        }
      }
    )
  );
});

router.route("/transaction/get/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users.transaction))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/transaction/delete/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((users) =>
      User.update(
        {
          email: users.email,
        },
        { $pull: { transaction: { _id: req.body.id } } },
        { safe: true },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send("It works" + result);
          }
        }
      )
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/transaction/update/:id").post((req, res) => {
  User.findOneAndUpdate(
    { "transaction._id": req.body.id },
    {
      $set: {
        "transaction.$.fee": req.body.fee,
        "transaction.$.date": req.body.date,
        "transaction.$.info": req.body.info,
        "transaction.$.category": req.body.category,
      },
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send("It works" + result);
      }
    }
  );
});

router.route("/savings/:id").post((req, res) => {
  const saving = req.body.saving;
  const goal = req.body.goal;
  const amount = req.body.amount;
  const id = req.params.id;

  User.findById(id).then((users) =>
    User.updateOne(
      { email: users.email },
      {
        $addToSet: {
          savings: {
            saving: saving,
            goal: goal,
            amount: amount,
          },
        },
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send("It works");
        }
      }
    )
  );
});

router.route("/savings/get/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users.savings))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/savings/delete/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((users) =>
      User.update(
        {
          email: users.email,
        },
        { $pull: { savings: { _id: req.body.id } } },
        { safe: true },
        function (err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send("It works" + result);
          }
        }
      )
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
