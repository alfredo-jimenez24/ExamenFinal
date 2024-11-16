import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    // Crear nueva información general
    case 'POST':
      try {
        const { tipo, usuarioCreador, estado, clienteId } = req.body;

        // Validar que los datos requeridos están presentes
        if (!tipo || !usuarioCreador || !estado || !clienteId) {
          return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        const informacion = await prisma.informacionGeneral.create({
          data: {
            tipo,
            usuarioCreador,
            estado,
            cliente: { connect: { id: clienteId } },
          },
        });

        res.status(201).json(informacion);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear información general' });
      }
      break;

    // Obtener toda la información general
    case 'GET':
      try {
        const informacion = await prisma.informacionGeneral.findMany({
          include: { cliente: true }, // Incluimos datos del cliente asociado
        });

        res.status(200).json(informacion);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener la información general' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).json({ error: `Método ${method} no permitido` });
  }
}
