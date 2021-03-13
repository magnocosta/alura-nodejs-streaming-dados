const connection = require('../infrastructure/database/connection');
const fileUpload = require('../files/fileUpload');

class Pet {

    add(pet, res) {
        const sql = 'INSERT INTO pets SET ?';

        fileUpload(pet.image, pet.name, (error, targetPath) => {

            if (error) {
                res.status(400).json({ error });
            } else {
                const newPet = { name: pet.name, image: targetPath };
                connection.query(sql, newPet, error => {
                    if (error) {
                        console.error(error);
                        res.status(400).json(error);
                    } else {
                        res.status(201).json(newPet);
                    }
                });
            }
        });
    }
}

module.exports = new Pet();
