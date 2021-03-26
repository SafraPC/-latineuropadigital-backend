const router = require('express').Router();

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const JobController = require('./controllers/JobController');
const TagsController = require('./controllers/TagsController');

const Role = require('./helpers/roles');
const authorized = require('./middlewares/authorize');

router.post("/auth/authenticate", AuthController.authenticate);
router.post("/auth/signup", AuthController.signUp);

router.get("/user/list", UserController.getAllUsers);
router.get("/user/:id", UserController.find);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);
router.post("/user/addAdmin", UserController.create); /*Única forma de criar um usuário ADM*/

router.get("/post/list", PostController.list);
router.get("/post/:id", PostController.find);
router.post("/post/create", authorized(Role.Admin), PostController.create);
router.put("/post/:id", authorized(Role.Admin), PostController.update);
router.delete("/post/:id", authorized(Role.Admin), PostController.delete);

router.get("/posts/:tag", PostController.findByTag);

router.get("/job/list", JobController.list);
router.get("/job/:id", JobController.find);
router.post("/job/create", authorized(Role.Admin), JobController.create);
router.put("/job/:id", authorized(Role.Admin), JobController.update);
router.delete("/job/:id", authorized(Role.Admin), JobController.delete);
//router.get("/jobs/wipe", JobController.deleteAll);

router.get("/tag/list", TagsController.list);
router.get("/tag/:id", TagsController.find);
router.post("/tag/create", TagsController.create);
router.put("/tag/:id", TagsController.update);
router.delete("/tag/:id", TagsController.delete);
//router.get("/tags/wipe", TagsController.deleteAll);

router.get("/tags/used", TagsController.tagsUsed);

router.route('/auth/testAuthMiddleware')
	.get(
		authorized(Role.Admin), 
		(request, response) => {
			response.status(200).json({
				success: true,
				message: 'Rota acessada!'
			});
		}
	);

module.exports = router;