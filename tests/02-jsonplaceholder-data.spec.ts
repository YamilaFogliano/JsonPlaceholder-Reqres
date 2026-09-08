// Suite centrada en validación de estructuras y arreglos

import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - Pruebas de contrato e integridad de Datos (GET)', () => {
    const BASE_URL = 'https://jsonplaceholder.typicode.com';

    test('1. GET - Validar contrato y tipos de datos de una tarea', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/todos/3`);
        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body).toHaveProperty('userId');
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('title');
        expect(body).toHaveProperty('completed');

        expect(typeof body.userId).toBe('number');
        expect(typeof body.id).toBe('number');
        expect(typeof body.title).toBe('string');
        expect(typeof body.completed).toBe('boolean');

        console.log('✅ Datos recolectados: ')
        console.log(`userId: ${body.userId}`)
        console.log(`id: ${body.id}`)
        console.log(`Titulo: ${body.title}`)
        console.log(`Estado (True: Completed | False: Incompleted): ${body.completed}`)
    });

    test('2. GET - Validar volumen de lista y filtrar tareas por estado', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/todos`);
        expect(response.status()).toBe(200);

        const todos = await response.json();

        expect(Array.isArray(todos)).toBeTruthy();
        expect(todos).toHaveLength(200);

        const completadas = todos.filter((todo: { completed: boolean }) => todo.completed === true);
        const incompletas = todos.filter((todo: { completed: boolean }) => todo.completed === false);

        expect(completadas.length).toBeGreaterThan(0);
        expect(incompletas.length).toBeGreaterThan(0);

        console.log(`✅ Tareas completadas: ${completadas.length} | Tareas incompletas: ${incompletas.length}`);
    });

    test('3. GET /todos/99999 - Validar manejo de escenario negativo (recurso inexistente - 404)', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/todos/99999`);

        expect(response.status()).toBe(404);
        console.log('✅ Registro no encontrado.');
    });
});