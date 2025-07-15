#  Runner 3D

**Runner 3D** é um jogo 3D desenvolvido com **WebGL** e a biblioteca **Three.js**, onde o jogador controla um personagem que corre por uma rua, desviando de obstáculos em tempo real. O objetivo é sobreviver o maior tempo possível, acumulando pontos enquanto carros aparecem aleatoriamente no cenário.

---

##  Como Jogar

- Use as **setas do teclado** (⬅️ ➡️) para mover o personagem para os lados.
- Desvie dos carros que surgem na rua.
- Cada segundo vivo aumenta sua **pontuação**.
- Ao colidir com um carro, você verá a mensagem **Game Over** e poderá reiniciar a partida clicando em **Jogar Novamente**.

---

## Requisitos da Atividade Atendidos

| Critério | Implementado |
|---------|--------------|
| 3 tipos de geometrias |  `PlaneGeometry`, `Box3`, geometrias dos modelos `.glb` |
| 2 tipos de materiais |  `MeshBasicMaterial`, materiais dos modelos carregados |
| Carregamento de textura |  `sky.jpg` como textura de fundo |
| 2 fontes de luz |  `DirectionalLight` e `AmbientLight` |
| Modelo externo |  `Man.glb`, `CAR.glb`, `Street Straight.glb` |
| Objetos dinâmicos |  Carros gerados dinamicamente em intervalos |
| Interação com o usuário |  Movimento com teclado e botão de reinício |

---

## Tecnologias Utilizadas

- [Three.js](https://threejs.org/)
- WebGL via navegador moderno
- Modelos `.glb` (GLTF) com animações
- Texturas JPG e PNG
- HTML5, CSS e JavaScript moderno (`type="module"`)

---

### Pré-requisitos

Antes de executar o projeto, certifique-se de que você tem:

- [Node.js](https://nodejs.org/) instalado (versão recomendada: 18+)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node)
- Navegador moderno (Chrome, Firefox, Edge...)

> **Importante:** este projeto usa módulos ES6, portanto não funcionará apenas abrindo o HTML diretamente no navegador. É necessário servir os arquivos via servidor local.

---

### Passos para rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/luisfvalentim/Runner-3d.git
   cd Runner-3d
   
2. Instale as dependências do projeto:
   ```bash
   npm install

4. Inicie o servidor de desenvolvimento com Vite:
   ```bash
   npm run dev

6. Abra o navegador e acesse:
   ```bash
   http://localhost:5173

## Estrutura do Projeto

```plaintext
Runner-3D/
├── assets/
│   ├── models/                    # Modelos 3D (.glb)
│   │   ├── CAR Model.glb
│   │   ├── Car.glb
│   │   ├── cartoon banana car.glb
│   │   ├── Man.glb
│   │   ├── Soldier.glb
│   │   └── Street Straight.glb
│   └── textures/                 # Texturas usadas no cenário
│       ├── asphalt_pit_lane_diff_4k.jpg
│       ├── asphalt_pit_lane_disp_4k.png
│       └── sky.jpg
├── node_modules/                 # Dependências instaladas (npm)
├── src/
│   └── main.js                   # Código-fonte principal do jogo
├── index.html                    # Página HTML principal do jogo
├── package.json                  # Configurações do projeto e dependências
├── package-lock.json             # Controle de versões exatas do npm
└── README.md                     # Documentação do projeto
