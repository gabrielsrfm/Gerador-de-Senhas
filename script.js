function gerarSenha() {
  const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const minusculas = 'abcdefghijklmnopqrstuvwxyz';
  const numeros = '0123456789';
  const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let caracteres = '';

  if (document.getElementById('maiusculas').checked) caracteres += maiusculas;
  if (document.getElementById('minusculas').checked) caracteres += minusculas;
  if (document.getElementById('numeros').checked)    caracteres += numeros;
  if (document.getElementById('simbolos').checked)   caracteres += simbolos;

  if (caracteres === '') {
    document.getElementById('password').textContent = 'Selecione ao menos uma opção!';
    return;
  }

  const tamanho = parseInt(document.getElementById('lengthSlider').value);
  let senha = '';

  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    senha += caracteres[indice];
  }

  document.getElementById('password').textContent = senha;

  const copyBtn = document.getElementById('copyBtn');
  copyBtn.textContent = 'Copiar';
  copyBtn.classList.remove('copiado');

  verificarForca(senha);
}

function verificarForca(senha) {
  let pontos = 0;

  if (senha.length >= 8)  pontos++;
  if (senha.length >= 14) pontos++;
  if (/[A-Z]/.test(senha)) pontos++;
  if (/[0-9]/.test(senha)) pontos++;
  if (/[^A-Za-z0-9]/.test(senha)) pontos++;

  const niveis = [
    { porcentagem: '20%', cor: '#e63946', texto: 'Força: Muito fraca' },
    { porcentagem: '40%', cor: '#f4a261', texto: 'Força: Fraca' },
    { porcentagem: '60%', cor: '#e9c46a', texto: 'Força: Média' },
    { porcentagem: '80%', cor: '#2a9d8f', texto: 'Força: Forte' },
    { porcentagem: '100%', cor: '#2d6a4f', texto: 'Força: Muito forte' },
  ];

  const nivel = niveis[Math.min(pontos - 1, 4)] || niveis[0];

  const fill = document.getElementById('forcaFill');
  fill.style.width = nivel.porcentagem;
  fill.style.backgroundColor = nivel.cor;

  document.getElementById('forcaLabel').textContent = nivel.texto;
}

function copiarSenha() {
  const senha = document.getElementById('password').textContent;

  if (senha === 'Clique em "Gerar Senha"' || senha === 'Selecione ao menos uma opção!') {
    return;
  }

  navigator.clipboard.writeText(senha).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = 'Copiado!';
    btn.classList.add('copiado');
  });
}
