interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response>{
    return new Promise(resolve => {

        setTimeout(() => {
            resolve({
                token: 'dfasdojfpeajpf91u3j210feifa3231412',
                user: {
                    name: 'João',
                    email: 'joaovictorv9820@gmail.com'
                }
            })
        }, 2000)

    });
}