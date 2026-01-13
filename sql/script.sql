CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  telefone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE veiculos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  placa VARCHAR(10) UNIQUE NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  ano INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_cliente
    FOREIGN KEY (cliente_id)
    REFERENCES clientes(id)
    ON DELETE CASCADE
);

CREATE TABLE vendas (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  veiculo_id INTEGER NOT NULL,
  usuario_id INTEGER NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (veiculo_id) REFERENCES veiculos(id),
  FOREIGN KEY (usuario_id) REFERENCES users(id)
);

CREATE TABLE auditoria (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER,
  acao VARCHAR(100) NOT NULL,
  tabela VARCHAR(50),
  registro_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (usuario_id) REFERENCES users(id)
);

