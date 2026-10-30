import { pool } from "../config/database.js";
// Cadastro público cria CLIENTE. Funcionários são criados pelo administrador.
export async function buscarPorEmail(email, tipo = "cliente") {
  const tabela = tipo === "equipe" ? "usuarios" : "clientes";
  const [linhas] = await pool.query(`SELECT * FROM ${tabela} WHERE email=?`, [
    email,
  ]);
  return linhas[0] || null;
}
export async function buscarPorId(id, tipo = "cliente") {
  const tabela = tipo === "equipe" ? "usuarios" : "clientes";
  const coluna = tipo === "equipe" ? "id_usuario" : "id_cliente";
  const [linhas] = await pool.query(
    `SELECT * FROM ${tabela} WHERE ${coluna}=?`,
    [id],
  );
  return linhas[0] || null;
}
export async function criar({ nome, email, telefone, senhaHash }) {
  const [r] = await pool.query(
    "INSERT INTO clientes(nome,email,telefone,senha_hash) VALUES(?,?,?,?)",
    [nome, email, telefone, senhaHash],
  );
  return {
    id: r.insertId,
    nome,
    email,
    telefone,
    tipo: "cliente",
    perfil: "cliente",
  };
}
