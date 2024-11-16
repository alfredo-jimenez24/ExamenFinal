import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST'://
      try {
        const cliente = await prisma.cliente.create({
          data: req.body,
        });
        res.status(201).json(cliente);
      } catch (error) {
        res.status(500).json({ error: 'Error creando cliente' });
      }
      break;

    case 'GET':
      try {
        const clientes = await prisma.cliente.findMany();
        res.status(200).json(clientes);
      } catch (error) {
        res.status(500).json({ error: 'Error obteniendo clientes' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
