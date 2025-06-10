/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    { id: 1, name: 'Skis', brand: 'Line', price: '1049.00' },
    { id: 2, name: 'Ski Jacket', brand: 'Patagonia', price: '749.99' },
    { id: 3, name: 'Trainers', brand: 'Nike', price: '200.00' },
  ])
}
