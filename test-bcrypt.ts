import * as bcrypt from 'bcryptjs';

async function test() {
  const hashed = await bcrypt.hash('test1234', 10);
  console.log('Hash généré :', hashed);
}

test();