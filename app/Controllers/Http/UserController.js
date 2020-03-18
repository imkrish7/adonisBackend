'use strict'

const User = use('App/Models/User');
class UserController {

	async login({request, auth}){
		const {email, password} = request.only(['email', 'password']);
		const token =  await auth.attempt(email, password)
		return { success: true, token}
	}

	async userInfo({ auth, params, request}){
		try {
			return await auth.getUser();
		} catch (error) {
			return { success: false}
		}
	}

	async logout({request, auth}){

		return await auth.logout();
	}

	async register({request}){
		const { email, password } = request.all();
		await User.create({
			email,
			password,
			username: email
		})
		return { success: true}
	}
}

module.exports = UserController
