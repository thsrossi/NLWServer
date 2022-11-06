import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data:{
            name: 'John Doe',
            email: 'john.doe@john.com',
            avatarUrl: 'https://github.com/thsrossi.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'John Pool',
            code: 'JOHN01',
            ownerId: user.id,

            participants:{
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{ 
            date: '2022-11-11T11:28:49.701Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })


    await prisma.game.create({
        data:{ 
            date: '2022-11-12T11:28:49.701Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses:{
                create:{
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant:{
                        connect:{
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()