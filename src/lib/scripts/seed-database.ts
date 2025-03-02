import bcrypt from 'bcrypt'

import { prisma } from '@/lib/prisma'

async function seed() {
  console.log('▶  Running seed database script...\n')

  try {
    // IMPORTANT: Change the system initial password.
    const SYSTEM_PASSWORD = 'systemsystem'
    const password = await bcrypt.hash(SYSTEM_PASSWORD, 10)

    await prisma.user.create({
      data: {
        username: 'system',
        name: 'System',
        email: 'system@keep.com',
        password
      }
    })

    console.log(
      '✔  Initial data and system user created, remember to change the system user password.\n'
    )
    console.log('     - Username: system')
    console.log(`     - Password: ${SYSTEM_PASSWORD}\n\n`)
  } catch (error) {
    console.log('✖  An error occurred while creating the data and the initial system user.')
    console.error(error)
  }
}

seed()
  .catch((err) => err)
  .finally(async () => {
    await prisma.$disconnect()
  })
