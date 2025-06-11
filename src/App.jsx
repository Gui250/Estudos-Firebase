import { useState } from "react";
import { db } from "./fireBaseConnection";
import { doc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import "./app.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [posts, setPosts] = useState([]);

  async function handleAdd() {
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    //   .then(() => {
    //     console.log("DADOS REGISTRADOS NO BANCO DE DADOS");
    //   })
    //   .catch((error) => {
    //     console.log("Gerou erro" + error);
    //   });

    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        console.log("DADOS REGISTRADOS NO BANCO DE DADOS");
        setAutor("");
        setTitulo("");
      })
      .catch((error) => {
        console.log("Gerou erro" + error);
      });
  }

  async function buscarPosts() {
    // const postRef = doc(db, "posts", "MvEN0YTELg5UskfHqYRH");

    // await getDoc(postRef)
    //   .then((snapshot) => {
    //     setAutor(snapshot.data().autor);
    //     setTitulo(snapshot.data().titulo);
    //   })
    //   .catch((error) => {
    //     console.log("Erro ao buscar dados" + error);
    //   });

    const postRef = collection(db, "posts");
    await getDocs(postRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });
        });

        setPosts(lista);
      })
      .catch((error) => {
        console.log("Erro ao buscar dados" + error);
      });
  }

  return (
    <div>
      <h1>React + Firebase</h1>

      <div className="container">
        <label>Titulo:</label>
        <textarea
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        ></textarea>

        <label>Autor: </label>
        <input
          type="text"
          placeholder="Digite o autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={buscarPosts}>Buscar Posts</button>

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>Titulo: {post.titulo} </span>
                <span>Autor: {post.autor}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
