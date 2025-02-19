import { PrismaClient } from '@prisma/client';
import coeficientes from './coeficientes.json' with { "type": "json" }
import localidades from './localidades.json'  with { "type": "json" }

const prisma = new PrismaClient();


const resetDatabase = async () => {
    // Eliminar localidades y zonas
    await prisma.localidad.deleteMany();
    await prisma.zona.deleteMany();
};

const load = async () => {
    try {
        // reset database
        await resetDatabase();

        await prisma.zona.createMany({   data: coeficientes   });
        console.log(`Coeficientes insertados`);

        await prisma.localidad.createMany({   data: localidades   });
        console.log(`Localidades insertadas`);



    } catch (error) {
        console.error("Error al insertar datos:", error);
    } finally {
        await prisma.$disconnect();
    }
};

load();