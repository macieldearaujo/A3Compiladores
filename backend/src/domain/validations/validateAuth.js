import jwt from 'jsonwebtoken';

const JWT_SECRET = "ifSMpRAq50TBF9eg6RAs0wv3ikbfHIhg";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: 'Token ausente' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

export function verifyManager(req, res, next) {
  if (req.user?.role.toLowerCase() !== 'gerente') {
    return res.status(403).json({ erro: 'Apenas gerentes podem executar essa ação.' });
  }
  next();
}

export function verifyCollaborator(req, res, next) {
  if (req.user?.role.toLowerCase() !== 'colaborador') {
    return res.status(403).json({ erro: 'Apenas colaboradores podem executar essa ação.' });
  }
  next();
}