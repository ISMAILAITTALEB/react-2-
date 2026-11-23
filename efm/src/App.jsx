
import { useState } from 'react';

// Liste des stagiaires
const stagiairesDepart = [
  { id: 1, matricule: '1454', nom: 'Alaoui', codepostal: '20400', ville: 'casa', moyenne: 12.56 },
  { id: 2, matricule: '1455', nom: 'Mansouri', codepostal: '20400', ville: 'casa', moyenne: 14.67 },
  { id: 3, matricule: '3454', nom: 'Ramdani', codepostal: '10400', ville: 'rabat', moyenne: 11.45 }
];

function App() {

  const [stagiaires, setStagiaires] = useState(stagiairesDepart);

  const [prochainId, setProchainId] = useState(4);
  const [idModifie, setIdModifie] = useState(null);

  const [matricule, setMatricule] = useState('');
  const [nom, setNom] = useState('');
  const [ville, setVille] = useState('');
  const [codepostal, setCodepostal] = useState('');
  const [moyenne, setMoyenne] = useState('');

  const [rechercheNom, setRechercheNom] = useState('');
  const [rechercheVille, setRechercheVille] = useState('');

  // Ajouter ou modifier un stagiaire
  function enregistrer(event) {
    event.preventDefault();

    if (matricule === '' || nom === '' || ville === '' ||
        codepostal === '' || moyenne === '') {
      alert('Tous les champs sont obligatoires');
      return;
    }

    const note = Number(moyenne);

    if (note < 0 || note > 20 || Number.isNaN(note)) {
      alert('La moyenne doit être entre 0 et 20');
      return;
    }

    const existe = stagiaires.some((s) =>
      s.matricule === matricule && s.id !== idModifie
    );

    if (existe) {
      alert('Ce matricule existe déjà');
      return;
    }

    if (idModifie === null) {

      const nouveauStagiaire = {
        id: prochainId,
        matricule: matricule,
        nom: nom,
        ville: ville,
        codepostal: codepostal,
        moyenne: note
      };

      setStagiaires([...stagiaires, nouveauStagiaire]);
      setProchainId(prochainId + 1);

    } else {

      const nouvelleListe = stagiaires.map((s) => {
        if (s.id === idModifie) {
          return {
            ...s,
            matricule: matricule,
            nom: nom,
            ville: ville,
            codepostal: codepostal,
            moyenne: note
          };
        }

        return s;
      });

      setStagiaires(nouvelleListe);
    }

    vider();
  }

  // Supprimer un stagiaire
  function supprimer(id) {
    setStagiaires(stagiaires.filter((s) => s.id !== id));

    if (id === idModifie) {
      vider();
    }
  }

  // Modifier un stagiaire
  function editer(s) {
    setIdModifie(s.id);
    setMatricule(s.matricule);
    setNom(s.nom);
    setVille(s.ville);
    setCodepostal(s.codepostal);
    setMoyenne(String(s.moyenne));
  }

  // Vider le formulaire
  function vider() {
    setMatricule('');
    setNom('');
    setVille('');
    setCodepostal('');
    setMoyenne('');
    setIdModifie(null);
  }

  // Recherche automatique par nom et ville
  const stagiairesFiltres = stagiaires.filter((s) => {
    const nomExiste = s.nom.toLowerCase().includes(
      rechercheNom.toLowerCase().trim()
    );

    const villeExiste = s.ville.toLowerCase().includes(
      rechercheVille.toLowerCase().trim()
    );

    return nomExiste && villeExiste;
  });

  // Calcul des statistiques
  const moyennes = stagiaires.map((s) => s.moyenne);

  const max = moyennes.length > 0
    ? Math.max(...moyennes)
    : 0;

  const min = moyennes.length > 0
    ? Math.min(...moyennes)
    : 0;

  const moyenneClasse = moyennes.length > 0
    ? moyennes.reduce((somme, m) => somme + m, 0) / moyennes.length
    : 0;

  return (
    <div>

      <h1>Gestion des stagiaires</h1>

      <h2>Rechercher</h2>

      Nom :
      <input
        type="text"
        value={rechercheNom}
        onChange={(e) => setRechercheNom(e.target.value)}
      />

      <br />

      Ville :
      <input
        type="text"
        value={rechercheVille}
        onChange={(e) => setRechercheVille(e.target.value)}
      />

      <br />

      <button onClick={() => {
        setRechercheNom('');
        setRechercheVille('');
      }}>
        Réinitialiser la recherche
      </button>

      <h2>Liste des stagiaires</h2>

      {stagiairesFiltres.length === 0 ? (
        <p>Aucun stagiaire trouvé</p>
      ) : (

        <table border="1" cellPadding="6">

          <thead>
            <tr>
              <th>Id</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Ville</th>
              <th>Code postal</th>
              <th>Moyenne</th>
              <th>Supprimer</th>
              <th>Editer</th>
            </tr>
          </thead>

          <tbody>
            {stagiairesFiltres.map((s) => (
              <tr key={s.id}>

                <td>{s.id}</td>
                <td>{s.matricule}</td>
                <td>{s.nom}</td>
                <td>{s.ville}</td>
                <td>{s.codepostal}</td>
                <td>{s.moyenne}</td>

                <td>
                  <button onClick={() => supprimer(s.id)}>
                    Supprimer
                  </button>
                </td>

                <td>
                  <button onClick={() => editer(s)}>
                    Editer
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

      <h2>
        {idModifie === null
          ? 'Ajouter un stagiaire'
          : 'Modifier un stagiaire'}
      </h2>

      <form onSubmit={enregistrer}>

        ID :
        <input
          type="text"
          value={idModifie === null ? prochainId : idModifie}
          readOnly
        />

        <br />

        Matricule :
        <input
          type="text"
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}
        />

        <br />

        Nom :
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <br />

        Ville :
        <input
          type="text"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />

        <br />

        Code postal :
        <input
          type="text"
          value={codepostal}
          onChange={(e) => setCodepostal(e.target.value)}
        />

        <br />

        Moyenne :
        <input
          type="number"
          min="0"
          max="20"
          step="0.01"
          value={moyenne}
          onChange={(e) => setMoyenne(e.target.value)}
        />

        <br />

        <button type="submit">
          {idModifie === null ? 'Ajouter' : 'Enregistrer'}
        </button>

        <button type="button" onClick={vider}>
          Vider
        </button>

      </form>

      <h2>Statistiques</h2>

      <ul>
        <li>Nombre de stagiaires : {stagiaires.length}</li>
        <li>La moyenne générale la plus élevée : {max}</li>
        <li>La moyenne générale la moins élevée : {min}</li>
        <li>La moyenne de la classe : {moyenneClasse.toFixed(2)}</li>
      </ul>

    </div>
  );
}

export default App;
