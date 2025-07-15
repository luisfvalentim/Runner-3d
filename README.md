# 🏃 Runner 3D

**Runner 3D** é um jogo 3D desenvolvido com **WebGL** e a biblioteca **Three.js**, onde o jogador controla um personagem que corre por uma rua, desviando de obstáculos em tempo real. O objetivo é sobreviver o maior tempo possível, acumulando pontos enquanto carros aparecem aleatoriamente no cenário.

---

## 🎮 Como Jogar

- Use as **setas do teclado** (⬅️ ➡️) para mover o personagem para os lados.
- Desvie dos carros que surgem na rua.
- Cada segundo vivo aumenta sua **pontuação**.
- Ao colidir com um carro, você verá a mensagem **Game Over** e poderá reiniciar a partida clicando em **Jogar Novamente**.

---

## ✅ Requisitos da Atividade Atendidos

| Critério | Implementado |
|---------|--------------|
| 3 tipos de geometrias | ✅ `PlaneGeometry`, `Box3`, geometrias dos modelos `.glb` |
| 2 tipos de materiais | ✅ `MeshBasicMaterial`, materiais dos modelos carregados |
| Carregamento de textura | ✅ `sky.jpg` como textura de fundo |
| 2 fontes de luz | ✅ `DirectionalLight` e `AmbientLight` |
| Modelo externo | ✅ `Man.glb`, `CAR.glb`, `Street Straight.glb` |
| Objetos dinâmicos | ✅ Carros gerados dinamicamente em intervalos |
| Interação com o usuário | ✅ Movimento com teclado e botão de reinício |

---

## 🛠 Tecnologias Utilizadas

- [Three.js](https://threejs.org/)
- WebGL via navegador moderno
- Modelos `.glb` (GLTF) com animações
- Texturas JPG
- HTML5, CSS e JavaScript moderno (`type="module"`)

---

## 🗂 Estrutura do Projeto

