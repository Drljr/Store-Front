const bcrypt = require('bcryptjs');

const inputPassword = 'storefront';
const storedHash = '$2a$10$nT48VV/pmJizIEviuqvg.ePc3EwYnehITroCyqLQBU8jUwuRCTEca';

bcrypt.compare(inputPassword, storedHash).then(result => {
    console.log('Manual comparison result:', result);
});