import * as AuthService from "../services/AuthService.js";
export async function registrar(req, res, next) {
  try {
    res
      .status(201)
      .json({ sucesso: true, dados: await AuthService.registrar(req.body) });
  } catch (e) {
    next(e);
  }
}
export async function login(req, res, next) {
  try {
    res.json({ sucesso: true, dados: await AuthService.login(req.body) });
  } catch (e) {
    next(e);
  }
}
export function me(req, res) {
  res.json({
    sucesso: true,
    dados: AuthService.publico(req.usuario.registro, req.usuario.tipo),
  });
}
