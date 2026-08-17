/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/antagonistes-data.js
   RÔLE   : Base de données des antagonistes des 27 aventures
            (pulps originaux 1940-1951 — domaine public USA).
   ══════════════════════════════════════════════════════════════ */

window.CF_VILLAINS = [
  {
    id: 1, nom: "Ul Quorn", epithete: "Le Grand Vilain de la série",
    origine: "Fils d'Ur Quorn, métis humain-alien au génie scientifique sans égal.",
    capacites: "Génie scientifique, manipulation, survie, patience infinie, réseau de criminels.",
    arc: "Antagoniste récurrent sur plusieurs romans — la seule menace à revenir défier Captain Future.",
    menace: "OMEGA", romans: [5, 9, 18], image: "../images/characters/ul_quorn_villain_portrait_official.jpg",
    scene: "../images/characters/ul_quorn_lair_full_scene.jpg",
    description: "Métis humain-alien aux traits exotiques, Ul Quorn est le cerveau criminel le plus brillant du système. Sa haine des humains — qui méprisèrent son père Ur Quorn — le consume. Il ne frappe jamais deux fois de la même manière, et son génie rivalise avec celui de Captain Future lui-même.",
    citation: "« Le système solaire n'est qu'une île. Et les îles se conquièrent. »",
    roman_principal: "Quest Beyond the Stars"
  },
  {
    id: 2, nom: "Docteur Zarro", epithete: "Chef de la Légion du Péril",
    origine: "Criminel génial, cerveau de la Légion du Péril — l'affaire « Calling Captain Future ».",
    capacites: "Génie de l'ingénierie, commandement d'une armée de mercenaires, audace.",
    arc: "Premier grand complot contre la science du système — il kidnappe les savants de Mars.",
    menace: "ÉLEVÉE", romans: [2], image: "../images/characters/doctor_zarro_villain_portrait.jpg",
    scene: null,
    description: "Zarro est l'archétype du savant fou élégant : obsessionnel, brillant, et convaincu que la science doit servir sa volonté. Sa Légion du Péril, mercenaires sans foi ni loi, sema la terreur dans tout le système.",
    citation: "« La science est un outil. J'en suis le forgeron — et le maître. »",
    roman_principal: "Calling Captain Future"
  },
  {
    id: 3, nom: "L'Empereur de l'Espace", epithete: "Premier grand antagoniste",
    origine: "Tyranné venu de la Ceinture d'Astéroïdes, mi-humain mi-machine, réduisant les mondes en esclavage.",
    capacites: "Armée d'esclaves zombifiés, vaisseau-monde, domination absolue.",
    arc: "Le premier défi de Captain Future — celui qui le fit connaître du système entier.",
    menace: "OMEGA", romans: [1], image: "../images/characters/space_emperor_portrait.jpg",
    scene: "../images/characters/space_emperor_throne_room.jpg",
    description: "Créature colossale dont le corps est un assemblage d'armure et de chair, l'Empereur règne sur un vaisseau-monde peuplé d'esclaves aux esprits brisés. Il exigea la reddition de la Terre — et trouva en Captain Future son premier adversaire.",
    citation: "« La Terre se rendra, ou la Terre périra. »",
    roman_principal: "The Space Emperor"
  },
  {
    id: 4, nom: "Le Sorcier de Mars", epithete: "Maître des illusions",
    origine: "Savant martien en révolte contre la science, cachant une technologie avancée derrière une « magie ».",
    capacites: "Technologie pseudo-magique, contrôle mental subtil, domination d'une cité.",
    arc: "La lutte pour la vieille civilisation martienne — mythe contre science.",
    menace: "ÉLEVÉE", romans: [7], image: "../images/characters/magician_of_mars_portrait.jpg",
    scene: null,
    description: "Sur Mars, un « sorcier » terrorise la fière civilisation martienne avec des pouvoirs défiant la raison. En réalité, sa magie n'est que science avancée — mais la plus dangereuse de toutes : celle qui fait croire à l'irrationnel.",
    citation: "« La peur est la plus ancienne des magies. Je l'ai perfectionnée. »",
    roman_principal: "The Magician of Mars"
  },
  {
    id: 5, nom: "Les Rois des Comètes", epithete: "Seigneurs de lumière",
    origine: "Êtres de pure énergie chevauchant une comète mortelle à travers le système.",
    capacites: "Pouvoirs cosmiques, contrôle des comètes, quasi-immortalité.",
    arc: "La plus grande menace cosmique de la série — la course contre l'apocalypse.",
    menace: "OMEGA", romans: [11], image: "../images/characters/comet_kings_portrait.jpg",
    scene: null,
    description: "D'immenses silhouettes de lumière blanche et or, anciennes comme les étoiles, les Rois des Comètes chevauchent leur comète comme un char de guerre. Leur passage annonce la fin des colonies de Jupiter — et peut-être de tout le système.",
    citation: "« Nous ne sommes ni dieux ni démons. Nous sommes ce qui reste quand les mondes meurent. »",
    roman_principal: "The Comet Kings"
  },
  {
    id: 6, nom: "La Légion du Péril", epithete: "Armée de mercenaires",
    origine: "La force armée du docteur Zarro — les pires criminels du système, soudés par la peur et l'or.",
    capacites: "Force de frappe, infiltration, terreur.",
    arc: "Première armée criminelle organisée du système solaire.",
    menace: "MOYENNE", romans: [2], image: "../images/characters/legion_of_peril_soldier.jpg",
    scene: null,
    description: "Casques à visière rouge, armures sombres frappées du comète écarlate : la Légion du Péril est la première armée de mercenaires de l'espace, prête à servir le plus offrant — tant que cet offrant est Zarro.",
    citation: "« Nous servons celui qui paie. Nous craignons celui qui tue. Zarro fait les deux. »",
    roman_principal: "Calling Captain Future"
  },
  {
    id: 7, nom: "Le Maître du Temps", epithete: "Gardien des paradoxes",
    origine: "Entité hors du temps, piégeant les vaisseaux dans « The Lost World of Time ».",
    capacites: "Manipulation temporelle, création de mondes parallèles.",
    arc: "L'énigme temporelle la plus vertigineuse de la série.",
    menace: "OMEGA", romans: [8], image: "../images/characters/maitre_du_temps_portrait.jpg",
    scene: null,
    description: "Venu d'un passé que le système a oublié, le Maître du Temps détient un secret capable de réécrire l'histoire. Simon Wright, le cerveau vivant, sera son plus redoutable adversaire — deux intelligences hors du commun.",
    citation: "« Le temps n'attend personne. Sauf moi. »",
    roman_principal: "The Lost World of Time"
  },
  {
    id: 8, nom: "Les Hors-la-loi de la Lune", epithete: "Les évadés de Tycho",
    origine: "Les criminels les plus dangereux du système, évadés vers la Lune dans « Outlaws of the Moon ».",
    capacites: "Tir d'élite, survie lunaire, connaissance des cratères.",
    arc: "Un western spatial aux portes de la base de Captain Future.",
    menace: "MOYENNE", romans: [10], image: "../images/characters/hors_la_loi_lune_portrait.jpg",
    scene: null,
    description: "Traqués dans tout le système, les pires hors-la-loi choisirent le dernier refuge possible : la Lune, face cachée, à quelques kilomètres de la base de Tycho. Une guerre de territoires dans le silence des cratères.",
    citation: "« La Lune est à nous. Personne ne vient nous chercher ici. »",
    roman_principal: "Outlaws of the Moon"
  },
  {
    id: 9, nom: "L'Entité Stellaire", epithete: "La voix au-delà des étoiles",
    origine: "Civilisation inconnue au-delà du système solaire, première menace extragalactique de la série.",
    capacites: "Technologie stellaire, pouvoir sur les étoiles elles-mêmes.",
    arc: "Le premier voyage de Captain Future au-delà du système — le cosmos s'ouvre.",
    menace: "OMEGA", romans: [9], image: "../images/characters/entite_stellaire_portrait.jpg",
    scene: null,
    description: "Quand l'appel vint d'au-delà des étoiles, Captain Future quitta pour la première fois le système solaire. Il découvrit un univers plus vaste, plus ancien — et infiniment plus dangereux que tout ce que les mondes habités pouvaient imaginer.",
    citation: "« Vous croyez votre système immense. Vous n'avez pas vu les étoiles. »",
    roman_principal: "Quest Beyond the Stars"
  },
  {
    id: 10, nom: "Le Semeur de Folie", epithete: "Le fléau des mondes",
    origine: "Génie du mal manipulant une épidémie psychique dans « Planets in Peril ».",
    capacites: "Arme psychique, contagion mentale, conquête par la folie.",
    arc: "La menace la plus insidieuse : frapper les esprits plutôt que les corps.",
    menace: "ÉLEVÉE", romans: [12], image: "../images/characters/le_semeur_de_folie_portrait.jpg",
    scene: null,
    description: "Une à une, les populations des mondes sombrent dans la folie. Derrière l'épidémie, un esprit malade manipule la science pour conquérir sans une seule bataille — la guerre la plus sournoise jamais menée dans le système.",
    citation: "« Les murs tombent, les canons se taisent… quand les esprits se brisent. »",
    roman_principal: "Planets in Peril"
  },
  {
    id: 11, nom: "L'Abyssal", epithete: "Le visage des profondeurs",
    origine: "Intelligence antique des océans glacés d'Uranus, « The Face of the Deep ».",
    capacites: "Manipulation des océans, télépathie, savoir immémorial.",
    arc: "Le premier contact avec une intelligence abyssale — et la découverte d'un monde oublié.",
    menace: "ÉLEVÉE", romans: [13], image: "../images/characters/abyssal_uranus_portrait.jpg",
    scene: null,
    description: "Des profondeurs d'Uranus, un visage titanesque émergea des eaux noires. L'Abyssal n'est pas un tyran mais une énigme : une intelligence plus ancienne que la civilisation humaine, gardienne de secrets engloutis.",
    citation: "« Vous cherchez la vie dans les étoiles. Elle était déjà dans les abysses. »",
    roman_principal: "The Face of the Deep"
  },
  {
    id: 12, nom: "Les Envahisseurs Solaires", epithete: "Ceux qui voulaient le Soleil",
    origine: "Flotte venue d'au-delà du système, visant le Soleil dans « The Solar Invasion ».",
    capacites: "Technologie de capture stellaire, flotte de guerre.",
    arc: "La seule invasion extraterrestre de la série signée Manly Wade Wellman.",
    menace: "OMEGA", romans: [20], image: "../images/characters/envahisseurs_solaires_portrait.jpg",
    scene: null,
    description: "Ils ne voulaient ni la Terre ni Mars : ils voulaient le Soleil lui-même. La plus grande bataille jamais livrée pour la source de toute vie du système solaire — et la seule aventure de la série écrite par Manly Wade Wellman.",
    citation: "« Sans votre soleil, vos mondes ne sont que des tombes. »",
    roman_principal: "The Solar Invasion"
  },
  {
    id: 13, nom: "Le Collectionneur", epithete: "Maître des Sept Pierres",
    origine: "Archétype du collectionneur obsessionnel, en quête des « Seven Space-Stones ».",
    capacites: "Richesse immense, réseau d'espions, connaissance des artefacts.",
    arc: "La course aux sept artefacts dispersés sur sept mondes.",
    menace: "MOYENNE", romans: [5], image: "../images/characters/le_collectionneur_portrait.jpg",
    scene: null,
    description: "Sept pierres aux pouvoirs prodigieux, sept mondes, sept épreuves. Le Collectionneur veut toutes les posséder — et Captain Future doit l'en empêcher avant que les pierres réunies ne déclenchent la catastrophe.",
    citation: "« Les artefacts ne sont pas faits pour être adorés. Ils sont faits pour être possédés. »",
    roman_principal: "The Seven Space-Stones"
  },
  {
    id: 14, nom: "Le Roi des Pirates", epithete: "Seigneur d'Outlaw World",
    origine: "Souverain d'un monde caché de pirates de l'espace, « Outlaw World ».",
    capacites: "Flotte pirate, réseau de contrebande, tyrannie locale.",
    arc: "L'infiltration de Captain Future déguisé en hors-la-loi.",
    menace: "ÉLEVÉE", romans: [19], image: "../images/characters/roi_des_pirates_portrait.jpg",
    scene: null,
    description: "Au-delà des routes commerciales, un monde entier vit de la piraterie, gouverné par un roi sans scrupules. Pour l'atteindre, Captain Future dut se faire passer pour l'un des pires criminels du système.",
    citation: "« Ici, la loi est mon vaisseau. Et je suis le seul capitaine. »",
    roman_principal: "Outlaw World"
  },
  {
    id: 15, nom: "Les Manipulateurs de la Création", epithete: "Ceux qui touchèrent aux origines",
    origine: "Forces jouant avec la création de la vie, « Birthplace of Creation » — le final de la série.",
    capacites: "Manipulation du vivant, pouvoir sur les origines.",
    arc: "Le dernier défi : aux sources de la vie, l'équilibre du cosmos en jeu.",
    menace: "OMEGA", romans: [27], image: "../images/characters/manipulateurs_creation_portrait.jpg",
    scene: null,
    description: "Dans le dernier roman de la série, Captain Future atteint le berceau même de la vie du système. Des forces y manipulent la création, menaçant l'ordre naturel de tout ce qui existe — un final cosmique pour le « roi de la SF cosmique ».",
    citation: "« Nous ne créons pas la vie. Nous la dirigeons — comme on dirige une rivière. »",
    roman_principal: "Birthplace of Creation"
  }
];
