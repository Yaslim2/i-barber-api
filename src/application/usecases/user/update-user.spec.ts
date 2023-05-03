import { UpdateUser } from './update-user';
import { makeUser } from '@test/factories/user-factory';
import { InMemoryUserRepository } from '@test/repositories/in-memory-repository';
import { NotFound } from '../errors/user-not-found';

describe('Update user', () => {
  it('should be able to update an user', async () => {
    const userRepository = new InMemoryUserRepository();
    const updateUser = new UpdateUser(userRepository);

    const user = makeUser();
    await userRepository.create(user);

    const { user: userUpdated } = await updateUser.execute({
      userId: user.id,
      fullname: 'John Doe',
      imageUrl:
        'https://www.wikihow.com/images_en/thumb/d/db/Get-the-URL-for-Pictures-Step-2-Version-6.jpg/v4-460px-Get-the-URL-for-Pictures-Step-2-Version-6.jpg',
    });

    expect(userUpdated.id).toBe(user.id);
    expect(userUpdated.fullname.value).toBe('John Doe');
    expect(userUpdated.imageUrl.value).toBe(
      'https://www.wikihow.com/images_en/thumb/d/db/Get-the-URL-for-Pictures-Step-2-Version-6.jpg/v4-460px-Get-the-URL-for-Pictures-Step-2-Version-6.jpg',
    );
  });

  it('should not be able to update an user who does not exists', async () => {
    const userRepository = new InMemoryUserRepository();
    const updateUser = new UpdateUser(userRepository);
    await expect(
      updateUser.execute({
        userId: 'mocked-id',
        fullname: 'John Doe',
        imageUrl:
          'https://www.wikihow.com/images_en/thumb/d/db/Get-the-URL-for-Pictures-Step-2-Version-6.jpg/v4-460px-Get-the-URL-for-Pictures-Step-2-Version-6.jpg',
      }),
    ).rejects.toThrow(new NotFound('user'));
  });
});
