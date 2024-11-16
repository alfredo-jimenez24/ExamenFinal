import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const listado = await prisma.informacionGeneral.findMany({
      orderBy: [{ fechaCreacion: 'desc' }, { cliente: { apellidos: 'asc' } }],
      include: { cliente: true },
    });
    res.status(200).json(listado);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo listado general' });
  }
}
