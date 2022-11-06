
import { getUserByIdHandler,createUserHandler,deleteUserHandler,updateUserHandler} from  '../user/controller/user.controller'
import request from 'request-promise'
 import UserService from "@/modules/user/service/user.service";



test('create method must be called', async () => {
    const input = {
        body: JSON.stringify({
            id:1,
            name: 'Yan',
            lastName: 'Dub',
        })
    };

    const spy=jest
        .spyOn(UserService, 'create')
        .mockImplementation((): Promise<any> => Promise.resolve(input));
    await createUserHandler(input)
    expect(await spy).toHaveBeenCalled()
    spy.mockRestore()
});

 test('test create method', async () => {

        const input = {
            body: JSON.stringify({
                id:1,
                name: 'Yana',
                lastName: 'Dubova',
            })
        };
        const output = await createUserHandler(input);
        //expect(JSON.parse(output.body)).toHaveProperty('data.name','Yana')
        expect(output.statusCode).toBe(200);
    });

test('Test HTTP request and response', async () => {
  request.get("http://localhost:3000/dev/getUser/1 ").then((data) => {

     expect(data).toBe(200);

   }).catch((err) => {
      console.log(err);
      throw new Error(`Test failed due to ${err.name}`)
  });

});
test('user id must be unique', async () => {

    const input = {
        body: JSON.stringify({
            id:1,
            name: 'Yana',
            lastName: 'Dubova',
        })
    };
    const output = await createUserHandler(input);
    expect(output.statusCode).toBe(500);
});



test('you must provide user', async () => {
    const input = {
        body:{}
       }
       try{
         await createUserHandler(input)}
        catch(e){
           expect(e).toBeDefined()
        }
});

    test('error getUserByIdHandler', async () => {
        const input = undefined
        const expectedOutput = {
            body: JSON.stringify({
                code: 404,
                message: 'user not found',
            })
        }
        const output = await getUserByIdHandler(input);
        expect(output.body).toBe(expectedOutput.body);
    });
test('test getUserByIdHandler', async () => {
    const input = {
        pathParameters: {
            userId:1,
        }
    };
    let output =  await getUserByIdHandler(input);
    expect(JSON.parse(output.body)).toHaveProperty('data.id',1)
    expect(output.statusCode).toBe(200);
});
test('test updateUserHandler', async () => {
    const input = {
        body: JSON.stringify({
            id: 1,
            name: 'Lena',
            lastName: 'Barusha',
        })
    };

    const output = await updateUserHandler(input);
    // expect(JSON.parse(output.body)).toHaveProperty('data.name','Lena')
    expect(output.statusCode).toBe(200);
});

    test('test deleteUserHandler', async () => {
        const input = {
            body: JSON.stringify({
              id:1,
                name: 'Lena',
                lastName: 'Barusha',
            })
        };
        const expectedOutput = {
            body: JSON.stringify({
                code: 0,
                message: 'success',
                data: {
                    delete: 1
                }
            })
        }
        const output = await deleteUserHandler(input);
        expect(output).toMatchObject(expectedOutput);
    });


    test('test error in deleteUserHandler', async () => {
        const input = {
            body: JSON.stringify({
                name: 'name',
                lastName: 'lastName',
            })
        };
        try{
            await deleteUserHandler(input)
        }
        catch(e){
            expect(String(e)).toBe('Error: user dont exist')
        }
    });


test('error in updateUserHandler', async () => {
    const input = {
        body: JSON.stringify({
            name: 'name',
            lastName: 'lastName',
        })
    };
try{
    await updateUserHandler(input)
}
catch(e){
    expect(String(e)).toBe('Error: user not exist')
}

});