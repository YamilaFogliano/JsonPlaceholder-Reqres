// Suite centrada en gestión de usuarios y CRUD

import { test, expect } from '@playwright/test';

test.describe('ReqRes API - Pruebas CRUD de Usuarios', () => {
    const BASE_URL = 'https://reqres.in/api/users';

    test('1. POST - Crear usuario', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            data: {
                email: 'prueba.reqres@gmail.com',
                first_name: 'Yamila',
                last_name: 'Fogliano'
            }
        });

        expect(response.status()).toBe(201);
        const body = await response.json();

        expect(body.first_name).toBe('Yamila');
        expect(body.last_name).toBe('Fogliano');
        expect(body.email).toBe('prueba.reqres@gmail.com');
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('createdAt');

        console.log(`✅ Usuario creado: ${body.id}`);
        console.log(`${body.email}`);
        console.log(`${body.first_name}`);
        console.log(`${body.last_name}`);
    });

    test('2. GET - Consultar usuario específico', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/2`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.data.email).toBeDefined();

        console.log(`✅ Usuario seleccionado: ${body.data.id}`);
        console.log(`${body.data.email}`);
        console.log(`${body.data.first_name}`);
        console.log(`${body.data.last_name}`);
        console.log(`${body.data.avatar}`);
    });

    test('3. PUT - Actualizar datos de usuario', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/2`, {
            data: {
                email: 'prueba.reqres@gmail.com',
                first_name: 'María',
                last_name: 'Fogliano'
            }
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.first_name).toBe('María');

        console.log(`✅ Usuario modificado: ${body.first_name}`);
        console.log(`${body.email}`);
        console.log(`${body.first_name}`);
        console.log(`${body.last_name}`);
    });

    test('4. DELETE - Eliminar usuario', async ({ request }) => {
        const userId = 5;

        const getResponse = await request.get(`${BASE_URL}/${userId}`);
        expect(getResponse.status()).toBe(200);
        const userData = await getResponse.json();

        const deleteResponse = await request.delete(`${BASE_URL}/${userId}`);
        expect(deleteResponse.status()).toBe(204);

        console.log(`✅ Usuario eliminado con éxito:`);
        console.log(JSON.stringify(userData.data, null, 2));
    });
});