/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/bestiary-data.js
   RÔLE   : Base de données des créatures aliens du bestiaire
            (pulps originaux 1940-1951 — domaine public USA).
   ══════════════════════════════════════════════════════════════ */

window.CF_BESTIARY = [
  {
    id: 1, nom: "Reptilo-Géant de Vénus", planete: "Vénus",
    danger: 4, taille: "8 m de long", classification: "Grand saurien vénusien",
    image: "../images/characters/venusian_reptile_beast.jpg",
    anatomie: "Écailles dorées-vertes iridescentes, queue préhensile à venin paralysant, mâchoires massives, pattes musclées.",
    comportement: "Herbivore territorial — ne chasse que pour défendre son territoire. Charge tout intrus de grande taille.",
    alimentation: "Feuilles des arbres-cristaux, spores des champignons géants.",
    reproduction: "Pond ses œufs dans les mares de brume dorée, où les petits sont protégés par le mâle.",
    rencontres: ["The Magician of Mars", "Quest Beyond the Stars"],
    scale: "2,5 × humain",
    description: "Le titan de la jungle vénusienne : huit mètres d'écailles iridescentes, un herbivore paisible devenu un mur vivant quand on approche trop près de son territoire. Son venin de queue peut paralyser un homme en quelques secondes.",
    rencontre_detail: "Captain Future le rencontra pour la première fois dans les jungles dorées de Vénus, lors de l'affaire du Sorcier de Mars. Grag, seul, put le tenir tête — la force brute contre la masse."
  },
  {
    id: 2, nom: "Baleine Cosmique", planete: "Espace profond",
    danger: 1, taille: "~500 m de long", classification: "Mammifère spatial migrateur",
    image: "../images/characters/cosmic_whale_space.jpg",
    anatomie: "Corps bioluminescent bleu-violet, nageoires adaptées au vide, œil immense et doux, traînées de plasma.",
    comportement: "Migrateur solitaire — traverse le système en suivant les vents de rayonnement solaire. Curieux et pacifique.",
    alimentation: "Se nourrit du rayonnement solaire et de la poussière stellaire, aspirée en flux lumineux.",
    reproduction: "Inconnue — jamais observée, mais des « petits » furent aperçus près du Soleil.",
    rencontres: ["Quest Beyond the Stars", "The Comet Kings"],
    scale: "60 × humain",
    description: "Le plus grand être vivant jamais rencontré par l'humanité : une baleine de cinq cents mètres qui nage dans le vide. The Comet, à ses côtés, n'était qu'un fretin.",
    rencontre_detail: "Les Futuremen croisèrent sa route au-delà de l'orbite de Neptune. Simon Wright, le premier, comprit qu'elle n'était pas une menace — mais un signe : la vie existait partout où l'énergie circulait."
  },
  {
    id: 3, nom: "Sable-Serp de Mars", planete: "Mars",
    danger: 5, taille: "20 m de long", classification: "Prédateur des dunes",
    image: "../images/characters/martian_sand_serpent.jpg",
    anatomie: "Corps serpentin aux écailles rougeâtres camouflées dans le sable, tête en lame de soc, dents de cristal noir, crête sensorielle.",
    comportement: "Chasseur d'embuscade — détecte les vibrations du sol à travers les dunes et surgit verticalement.",
    alimentation: "Tout ce qui bouge sur la surface : humains, Martiens, petits vaisseaux.",
    reproduction: "Creuse des nids souterrains profonds sous les canyons; les petits restent enfouis 20 ans.",
    rencontres: ["Outlaws of the Moon", "The Magician of Mars"],
    scale: "6,5 × humain",
    description: "Le terreur des dunes rouges : vingt mètres de muscles qui jaillissent du sable sans prévenir. Seul un robot pouvait lui tenir tête — Grag l'a prouvé.",
    rencontre_detail: "Au cours d'une mission dans les plaines martiennes, un Sable-Serp surgit sous les pieds de l'équipe. Grag, d'une seule main, retint sa tête tandis que les autres tiraient — la preuve que la force brute a son utilité."
  },
  {
    id: 4, nom: "Être-de-Nuage Jovien", planete: "Jupiter",
    danger: 2, taille: "~50 m de haut", classification: "Entité de plasma",
    image: "../images/characters/jovian_cloud_entity.jpg",
    anatomie: "Corps de plasma électrique bleu-blanc, forme humanoïde fluide et changeante, éclairs internes de communication.",
    comportement: "Pacifique et curieux — communique par impulsions lumineuses codées. Indifférent aux affaires humaines.",
    alimentation: "Absorbe l'énergie des tempêtes joviennes.",
    reproduction: "Se divise par fission lors des grandes tempêtes.",
    rencontres: ["The Comet Kings", "Planets in Peril"],
    scale: "10 × humain",
    description: "Les êtres-de-nuage sont aux tempêtes de Jupiter ce que les poissons sont aux océans : des habitants naturels de la fureur. Ils parlent en éclairs — et n'ont jamais montré d'hostilité.",
    rencontre_detail: "Lors de la crise des Comet Kings, un Être-de-Nuage guida The Comet à travers une tempête mortelle, ses impulsions lumineuses traçant la route sûre. Simon y vit une preuve : l'intelligence peut prendre toutes les formes."
  },
  {
    id: 5, nom: "Cristaloïde Saturnien", planete: "Saturne",
    danger: 3, taille: "3 à 15 m", classification: "Être minéral semi-conscient",
    image: "../images/characters/cristaloide_saturnien_portrait.jpg",
    anatomie: "Structure cristalline translucide, cœur lumineux interne, croissance lente par accumulation de glace et de minéraux.",
    comportement: "Ancien et contemplatif — se nourrit de l'énergie des anneaux, ignore les visiteurs.",
    alimentation: "Énergie cinétique et électromagnétique des anneaux.",
    reproduction: "Inconnue — les Anneliers les considèrent comme immortels.",
    rencontres: ["The Comet Kings", "Outlaw World"],
    scale: "1 à 5 × humain",
    description: "Les Cristaloïdes sont peut-être les plus anciens habitants du système : des êtres de cristal qui poussent dans les anneaux de Saturne depuis des millénaires, témoins silencieux de l'histoire.",
    rencontre_detail: "Les Anneliers les vénèrent comme des ancêtres. Simon Wright, fasciné, passa des heures à analyser leur structure — et découvrit qu'ils « rêvent » en résonance cristalline."
  },
  {
    id: 6, nom: "Glace-Entité Neptunienne", planete: "Neptune",
    danger: 4, taille: "2 à 8 m", classification: "Être cryogénique",
    image: "../images/characters/glace_entite_neptunienne_portrait.jpg",
    anatomie: "Corps de glace cristalline translucide, intérieur lumineux bleu, membres fins et acérés, pas de bouche visible.",
    comportement: "Silencieux et imprévisible — observe les intrus sans jamais réagir de façon prévisible.",
    alimentation: "Absorbe le froid ambiant; se déplace vers les sources de chaleur par curiosité.",
    reproduction: "Inconnue — jamais observée.",
    rencontres: ["The Face of the Deep", "Star of Dread"],
    scale: "1 à 3 × humain",
    description: "Les Glace-Entités hantent les plaines gelées de Neptune à -200°C. On ne sait rien d'elles — pas même si elles sont conscientes. Leur silence est leur plus grande énigme.",
    rencontre_detail: "Lors de l'affaire du Face of the Deep, une Glace-Entité s'approcha de Captain Future, le fixa longuement… puis s'éloigna. Simon nota que sa structure cristalline portait des marques — peut-être une écriture."
  }
];
