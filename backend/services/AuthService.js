import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as UsuarioModel from "../models/UsuarioModel.js";
import { texto, email, telefone, erro, opcao } from "../utils/validacao.js";
export async function registrar(dados = {}) {
  const nome = texto(dados.nome, "Nome", 3, 120),
    mail = email(dados.email),
    fone = telefone(dados.telefone);
  const senha = dados.senha;
  if (
    typeof senha !== "string" ||
    senha.length < 8 ||
    senha.length > 72 ||
    !/[a-z]/.test(senha) ||
    !/[A-Z]/.test(senha) ||
    !/[0-9]/.test(senha) ||
    !/[\W_]/.test(senha)
  )
    throw erro(
      422,
      "Senha de 8 a 72 caracteres, com maiúscula, minúscula, número e símbolo.",
    );
  if (await UsuarioModel.buscarPorEmail(mail))
    throw erro(409, "E-mail já cadastrado. Faça login para continuar.");
  try {
    return await UsuarioModel.criar({
      nome,
      email: mail,
      telefone: fone,
      senhaHash: await bcrypt.hash(senha, 10),
    });
  } catch (e) {
    if (e.code === "ER_DUP_ENTRY") throw erro(409, "E-mail já cadastrado.");
    throw e;
  }
}
export function publico(u, tipo) {
  return {
    id: tipo === "equipe" ? u.id_usuario : u.id_cliente,
    nome: u.nome,
    email: u.email,
    telefone: u.telefone,
    tipo,
    perfil: tipo === "equipe" ? u.perfil : "cliente",
  };
}
export async function login(dados = {}) {
  const mail = email(dados.email),
    tipo = opcao(
      dados.tipo || "cliente",
      ["cliente", "equipe"],
      "Tipo de acesso",
    );
  const senha = texto(dados.senha, "Senha", 1, 72);
  const u = await UsuarioModel.buscarPorEmail(mail, tipo);
  if (
    !u ||
    u.status !== "ativo" ||
    !u.senha_hash ||
    !(await bcrypt.compare(senha, u.senha_hash))
  )
    throw erro(401, "E-mail ou senha inválidos.");
  const usuario = publico(u, tipo);
  const token = jwt.sign(
    { perfil: usuario.perfil, tipo },
    process.env.JWT_SECRET,
    { subject: String(usuario.id), expiresIn: "2h", algorithm: "HS256" },
  );
  return { token, tipo: "Bearer", expiraEm: "2h", usuario };
}
