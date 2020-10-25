import bcrypt from 'bcrypt';
import userService from '../../services/userService';
import AuthTokenHelper from '../../helpers/AuthTokenHelper';

export default class User {
  static async getUser() {
    const newUser = {
      firstName: 'Nishimwe',
      lastName: 'Elysee',
      email: 'nishimwelys@gmail.com',
      password: 'elysee123',
      createAt: new Date(),
      updatedAt: new Date(),
    };
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    const createdUser = await userService.createuser(newUser);
    const authToken = AuthTokenHelper.generateToken({ userEmail: createdUser.dataValues.email, userId: createdUser.dataValues.id });
    return { ...createdUser.dataValues, authToken };
  }
}
