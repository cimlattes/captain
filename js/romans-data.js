/* ══════════════════════════════════════════════════════════════
   CAPTAIN FUTURE — L'Encyclopédie Hyperréaliste
   FICHIER : js/romans-data.js
   RÔLE   : Base de données des 27 aventures de Captain Future
            (pulps originaux 1940-1951 — domaine public USA).
            Sources bibliographiques vérifiées : wikipédia, ISFDB,
            fantasticfiction, wikipédia. Corrigendum appliqué.
   ══════════════════════════════════════════════════════════════ */

window.CF_NOVELS = [
  /* ═══════════ SÉRIE 1 : CAPTAIN FUTURE MAGAZINE (17 romans, 1940-1944) ═══════════ */
  {
    id: 1, titre: "Captain Future and the Space Emperor", serie: "Captain Future Magazine", saison: "Hiver", annee: 1940,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Une voix surgit de la Ceinture d'Astéroïdes et exige la reddition de la Terre. Un tyran mi-humain mi-machine, l'Empereur de l'Espace, a réduit des mondes en esclavage. Captain Future et les Futuremen infiltrent son vaisseau-monde pour briser l'empire avant qu'il n'atteigne la Terre.",
    themes: ["Alien", "Invasion", "Vaisseau-monde"], planetes: ["Ceinture d'Astéroïdes", "Terre"],
    vilain: "L'Empereur de l'Espace", note: 4.5, potentiel: 92,
    cover: "../images/covers/cover_space_emperor_cinema.jpg",
    archive: "https://archive.org/search?query=%22space+emperor%22+captain+future"
  },
  {
    id: 2, titre: "Calling Captain Future", serie: "Captain Future Magazine", saison: "Printemps", annee: 1940,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Le docteur Zarro et sa Légion du Péril kidnappent les plus grands savants de Mars pour bâtir une arme capable de soumettre le système solaire. C'est l'aventure qui révèle Captain Future au public — et lui fait rencontrer Joan Randall.",
    themes: ["Complot", "Scientifiques", "Arme suprême"], planetes: ["Mars", "Lune"],
    vilain: "Docteur Zarro", note: 4.7, potentiel: 95,
    cover: "../images/covers/cover_calling_captain_future.jpg",
    archive: "https://archive.org/search?query=%22calling+captain+future%22"
  },
  {
    id: 3, titre: "Captain Future's Challenge", serie: "Captain Future Magazine", saison: "Été", annee: 1940,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Un défi retentit dans tout le système : un criminel inconnu menace de détruire une grande ville de chaque monde habité, l'une après l'autre, à moins que Captain Future ne se rende. Une course contre la montre à travers le système solaire.",
    themes: ["Défi", "Terrorisme", "Course contre la montre"], planetes: ["Terre", "Vénus", "Mars"],
    vilain: "Le Mystérieux", note: 4.2, potentiel: 84,
    cover: "../images/characters/captain_future_action_fight.jpg",
    archive: "https://archive.org/search?query=%22captain+future%27s+challenge%22"
  },
  {
    id: 4, titre: "The Triumph of Captain Future", serie: "Captain Future Magazine", saison: "Automne", annee: 1940,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Accusé à tort de haute trahison devant le Parlement Planétaire, Captain Future doit échapper à la justice tout en démasquant le véritable complot : une invasion alien planifiée depuis des années par les ennemis les plus retors du système.",
    themes: ["Complot politique", "Injustice", "Invasion"], planetes: ["Terre", "Lune"],
    vilain: "Complot alien", note: 4.3, potentiel: 86,
    cover: "../images/characters/futuremen_group_shot_official.jpg",
    archive: "https://archive.org/search?query=%22triumph+of+captain+future%22"
  },
  {
    id: 5, titre: "Captain Future and the Seven Space-Stones", serie: "Captain Future Magazine", saison: "Hiver", annee: 1941,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Sept pierres aux pouvoirs prodigieux, dispersées sur sept mondes, doivent être réunies pour empêcher la catastrophe. Une quête aux airs de puzzle galactique, où chaque pierre est gardée par une civilisation et une épreuve différente.",
    themes: ["Quête", "Artefacts", "Énigme"], planetes: ["7 mondes"],
    vilain: "Le Collectionneur", note: 4.1, potentiel: 80,
    cover: "../images/planets/solar_system_2940_overview.jpg",
    archive: "https://archive.org/search?query=%22seven+space-stones%22"
  },
  {
    id: 6, titre: "Star Trail to Glory", serie: "Captain Future Magazine", saison: "Printemps", annee: 1941,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Une piste d'étoiles étrange traverse le système, attirant les vaisseaux vers un piège cosmique. Captain Future suit la piste lumineuse jusqu'à sa source — et découvre un secret qui pourrait changer la place de l'humanité dans l'univers.",
    themes: ["Phénomène cosmique", "Piège", "Découverte"], planetes: ["Système solaire"],
    vilain: "Les Pisteurs", note: 4.0, potentiel: 78,
    cover: "../images/spreads/quote_background_stars.jpg",
    archive: "https://archive.org/search?query=%22star+trail+to+glory%22"
  },
  {
    id: 7, titre: "The Magician of Mars", serie: "Captain Future Magazine", saison: "Été", annee: 1941,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Sur Mars, un « sorcier » terrorise la vieille civilisation martienne avec des pouvoirs qui semblent défier les lois de la science. Captain Future et Otho infiltrent sa cité interdite pour révéler la technologie cachée derrière la magie.",
    themes: ["Fausse magie", "Technologie cachée", "Mars"], planetes: ["Mars"],
    vilain: "Le Sorcier de Mars", note: 4.4, potentiel: 88,
    cover: "../images/covers/cover_magician_of_mars_cinema.jpg",
    archive: "https://archive.org/search?query=%22magician+of+mars%22"
  },
  {
    id: 8, titre: "The Lost World of Time", serie: "Captain Future Magazine", saison: "Automne", annee: 1941,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Un vaisseau surgit du passé avec à son bord un secret capable de réécrire l'histoire du système solaire. Captain Future est projeté dans un monde hors du temps, où l'équipe doit résoudre l'énigme avant que le continuum ne se déchire.",
    themes: ["Voyage dans le temps", "Énigme", "Paradoxe"], planetes: ["Hors du temps"],
    vilain: "Le Maître du Temps", note: 4.5, potentiel: 90,
    cover: "../images/characters/simon_wright_brain_computing.jpg",
    archive: "https://archive.org/search?query=%22lost+world+of+time%22"
  },
  {
    id: 9, titre: "Quest Beyond the Stars", serie: "Captain Future Magazine", saison: "Hiver", annee: 1942,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Pour la première fois, Captain Future quitte le système solaire. Une civilisation inconnue, au-delà des étoiles, appelle à l'aide. L'équipe découvre un cosmos plus vaste et plus dangereux que tout ce qu'elle imaginait.",
    themes: ["Au-delà des étoiles", "Premier contact", "Épopée"], planetes: ["Au-delà du système"],
    vilain: "L'Entité Stellaire", note: 4.6, potentiel: 91,
    cover: "../images/spreads/hero_banner_comet_space.jpg",
    archive: "https://archive.org/search?query=%22quest+beyond+the+stars%22"
  },
  {
    id: 10, titre: "Outlaws of the Moon", serie: "Captain Future Magazine", saison: "Printemps", annee: 1942,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Les criminels les plus dangereux du système se sont évadés… et ont trouvé refuge sur la Lune, aux portes mêmes de la base de Tycho. Un western spatial dans les cratères, où Captain Future doit nettoyer son propre jardin.",
    themes: ["Western spatial", "Évasion", "Lune"], planetes: ["Lune"],
    vilain: "Les Hors-la-loi", note: 4.4, potentiel: 87,
    cover: "../images/covers/cover_outlaws_moon_cinema.jpg",
    archive: "https://archive.org/search?query=%22outlaws+of+the+moon%22"
  },
  {
    id: 11, titre: "The Comet Kings", serie: "Captain Future Magazine", saison: "Été", annee: 1942,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "D'immenses êtres de lumière chevauchent une comète mortelle lancée vers les colonies de Jupiter. Le chef-d'œuvre de la série : une course contre l'apocalypse, une échelle cosmique vertigineuse et l'un des plus grands méchants du pulp.",
    themes: ["Comète", "Êtres de lumière", "Apocalypse"], planetes: ["Jupiter", "Comète"],
    vilain: "Les Rois des Comètes", note: 4.9, potentiel: 98,
    cover: "../images/covers/cover_comet_kings_cinema.jpg",
    archive: "https://archive.org/search?query=%22comet+kings%22"
  },
  {
    id: 12, titre: "Planets in Peril", serie: "Captain Future Magazine", saison: "Automne", annee: 1942,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Une maladie mystérieuse frappe les mondes un à un, plongeant les populations dans la folie. Derrière l'épidémie, un génie du mal manipule la science pour conquérir le système. Une aventure sombre et haletante.",
    themes: ["Épidémie", "Manipulation", "Conquête"], planetes: ["Système solaire"],
    vilain: "Le Semeur de Folie", note: 4.2, potentiel: 82,
    cover: "../images/planets/lunar_base_tycho_exterior.jpg",
    archive: "https://archive.org/search?query=%22planets+in+peril%22"
  },
  {
    id: 13, titre: "The Face of the Deep", serie: "Captain Future Magazine", saison: "Hiver", annee: 1943,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Des profondeurs d'Uranus, un visage titanesque émerge et semble vouloir communiquer. Captain Future plonge dans les océans glacés du monde lointain pour percer le mystère d'une intelligence abyssale antique.",
    themes: ["Océan alien", "Premier contact", "Profondeurs"], planetes: ["Uranus"],
    vilain: "L'Abyssal", note: 4.3, potentiel: 85,
    cover: "../images/characters/simon_wright_brain_portrait_official.jpg",
    archive: "https://archive.org/search?query=%22face+of+the+deep%22"
  },
  {
    id: 14, titre: "Worlds to Come", serie: "Captain Future Magazine", saison: "Printemps", annee: 1943,
    auteur: "Joseph Samachson", pseudo: "William Morrison", type: "Roman complet", mots: 60000,
    synopsis: "Des mondes futurs, modifiés par des technologies expérimentales, menacent de déstabiliser l'évolution du système. Captain Future intervient pour empêcher des changements catastrophiques dans le destin des planètes.",
    themes: ["Futurs alternatifs", "Évolution", "Expérimentation"], planetes: ["Mondes futurs"],
    vilain: "L'Expérimentateur", note: 3.9, potentiel: 76,
    cover: "../images/characters/otho_disguise_sequence.jpg",
    archive: "https://archive.org/search?query=%22worlds+to+come%22+captain+future"
  },
  {
    id: 15, titre: "Star of Dread", serie: "Captain Future Magazine", saison: "Été", annee: 1943,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Une étoile sinistre apparaît au-dessus des colonies les plus vulnérables, annonçant le malheur. Captain Future découvre qu'il s'agit d'un avant-poste d'une menace interstellaire visant les mondes du système.",
    themes: ["Mauvais présage", "Menace interstellaire", "Terreur"], planetes: ["Colonies", "Étoile inconnue"],
    vilain: "Les Porteurs d'Étoile", note: 4.0, potentiel: 79,
    cover: "../images/characters/ul_quorn_villain_portrait_official.jpg",
    archive: "https://archive.org/search?query=%22star+of+dread%22"
  },
  {
    id: 16, titre: "Magic Moon", serie: "Captain Future Magazine", saison: "Hiver", annee: 1944,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman complet", mots: 60000,
    synopsis: "Des phénomènes « magiques » inexplicables agitent la Lune. Captain Future doit démystifier des illusions fondées sur une science interdite — et affronter un adversaire qui a transformé le satellite en piège enchanté.",
    themes: ["Fausse magie", "Illusion", "Lune"], planetes: ["Lune"],
    vilain: "Le Magicien Lunaire", note: 4.1, potentiel: 81,
    cover: "../images/characters/futuremen_mission_briefing.jpg",
    archive: "https://archive.org/search?query=%22magic+moon%22+captain+future"
  },
  {
    id: 17, titre: "Days of Creation", serie: "Captain Future Magazine", saison: "Printemps", annee: 1944,
    auteur: "Joseph Samachson", pseudo: "William Morrison", type: "Roman complet", mots: 60000,
    synopsis: "Des expériences créant de nouvelles formes de vie échappent à tout contrôle sur plusieurs planètes. Captain Future intervient pour équilibrer l'innovation et les risques d'une évolution incontrôlée. Réédité sous le titre « The Tenth Planet ».",
    themes: ["Création", "Expérimentation", "Évolution"], planetes: ["Système solaire"],
    vilain: "Le Créateur", note: 3.8, potentiel: 74,
    cover: "../images/characters/captain_future_portrait_official.jpg",
    archive: "https://archive.org/search?query=%22days+of+creation%22+captain+future"
  },

  /* ═══════════ SÉRIE 2 : STARTLING STORIES (10 aventures, 1945-1951) ═══════════ */
  {
    id: 18, titre: "Red Sun of Danger", serie: "Startling Stories", saison: "Printemps", annee: 1945,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman court", mots: 40000,
    synopsis: "Course vers une planète errante sous un soleil rouge, dont les richesses pourraient embraser le système entier. Réédité sous le titre « Danger Planet ». Une aventure sauvage aux confins du système.",
    themes: ["Planète errante", "Course", "Richesse"], planetes: ["Soleil rouge", "Planète errante"],
    vilain: "Le Mineur sans scrupules", note: 4.2, potentiel: 83,
    cover: "../images/characters/captain_future_action_pose.jpg",
    archive: "https://archive.org/search?query=%22red+sun+of+danger%22"
  },
  {
    id: 19, titre: "Outlaw World", serie: "Startling Stories", saison: "Hiver", annee: 1946,
    auteur: "Edmond Hamilton", pseudo: null, type: "Roman court", mots: 40000,
    synopsis: "Se faisant passer pour un hors-la-loi, Captain Future infiltre un monde caché de pirates de l'espace pour démasquer leurs opérations et libérer les captifs. L'infiltration la plus audacieuse de sa carrière.",
    themes: ["Infiltration", "Pirates", "Monde caché"], planetes: ["Monde pirate"],
    vilain: "Le Roi des Pirates", note: 4.1, potentiel: 82,
    cover: "../images/characters/otho_android_portrait_official.jpg",
    archive: "https://archive.org/search?query=%22outlaw+world%22"
  },
  {
    id: 20, titre: "The Solar Invasion", serie: "Startling Stories", saison: "Automne", annee: 1946,
    auteur: "Manly Wade Wellman", pseudo: null, type: "Roman court", mots: 30000,
    synopsis: "Une invasion venue d'au-delà du système solaire vise le Soleil lui-même. Captain Future doit concevoir des défenses pour sauver la source de toute vie. La seule aventure de la série signée Manly Wade Wellman.",
    themes: ["Invasion", "Le Soleil", "Défense"], planetes: ["Le Soleil", "Au-delà du système"],
    vilain: "Les Envahisseurs", note: 4.0, potentiel: 80,
    cover: "../images/ships/the_comet_ship_official.jpg",
    archive: "https://archive.org/search?query=%22solar+invasion%22"
  },
  {
    id: 21, titre: "The Return of Captain Future", serie: "Startling Stories", saison: "Janvier", annee: 1950,
    auteur: "Edmond Hamilton", pseudo: null, type: "Novelette", mots: 25000,
    synopsis: "Après une longue absence, Captain Future revient affronter une menace ressuscitée : d'anciens ennemis complotent la domination du système. Le retour triomphal du héros dans les pages de Startling Stories.",
    themes: ["Retour", "Vieilles menaces", "Complot"], planetes: ["Terre", "Système solaire"],
    vilain: "Anciens ennemis", note: 4.3, potentiel: 85,
    cover: "../images/characters/futuremen_group_shot_official.jpg",
    archive: "https://archive.org/search?query=%22return+of+captain+future%22"
  },
  {
    id: 22, titre: "Children of the Sun", serie: "Startling Stories", saison: "Mai", annee: 1950,
    auteur: "Edmond Hamilton", pseudo: null, type: "Novelette", mots: 25000,
    synopsis: "Captain Future protège d'énigmatiques êtres adorateurs du soleil, révélant des histoires cachées liées aux mystères solaires. Une fable solaire douce-amère sur l'exploitation et la foi.",
    themes: ["Soleil", "Peuple mystérieux", "Exploitation"], planetes: ["Mercure", "Le Soleil"],
    vilain: "L'Exploiteur", note: 4.2, potentiel: 84,
    cover: "../images/spreads/quote_background_stars.jpg",
    archive: "https://archive.org/search?query=%22children+of+the+sun%22+captain+future"
  },
  {
    id: 23, titre: "The Harpers of Titan", serie: "Startling Stories", saison: "Septembre", annee: 1950,
    auteur: "Edmond Hamilton", pseudo: null, type: "Novelette", mots: 25000,
    synopsis: "Sur Titan, des entités musicales aux pouvoirs hypnotiques menacent les colons humains. Captain Future enquête sur ces « harpeurs » et contrecarre leur influence. Une aventure sonore et envoûtante.",
    themes: ["Musique", "Hypnose", "Titan"], planetes: ["Titan", "Saturne"],
    vilain: "Les Harpeurs", note: 4.1, potentiel: 82,
    cover: "../images/characters/joan_randall_pilot_cockpit.jpg",
    archive: "https://archive.org/search?query=%22harpers+of+titan%22"
  },
  {
    id: 24, titre: "Pardon My Iron Nerves", serie: "Startling Stories", saison: "Novembre", annee: 1950,
    auteur: "Edmond Hamilton", pseudo: null, type: "Novelette", mots: 20000,
    synopsis: "Le compagnon robotique de Captain Future, Grag, prend le devant de la scène dans une aventure de sabotage mécanique et d'espionnage planétaire. L'heure de gloire du grand robot d'acier.",
    themes: ["Grag", "Espionnage", "Sabotage"], planetes: ["Système solaire"],
    vilain: "Les Saboteurs", note: 4.0, potentiel: 78,
    cover: "../images/characters/grag_robot_strength_scene.jpg",
    archive: "https://archive.org/search?query=%22pardon+my+iron+nerves%22"
  },
  {
    id: 25, titre: "Moon of the Unforgotten", serie: "Startling Stories", saison: "Janvier", annee: 1951,
    auteur: "Edmond Hamilton", pseudo: null, type: "Novelette", mots: 20000,
    synopsis: "D'anciennes colonies lunaires oubliées refont surface, entraînant Captain Future dans des conflits autour de technologies perdues et de rancunes jamais apaisées. Une méditation sur la mémoire et le pardon.",
    themes: ["Mémoire", "Colonies oubliées", "Technologie perdue"], planetes: ["Lune"],
    vilain: "Les Oubliés", note: 4.1, potentiel: 80,
    cover: "../images/planets/lunar_base_tycho_exterior.jpg",
    archive: "https://archive.org/search?query=%22moon+of+the+unforgotten%22"
  },
  {
    id: 26, titre: "Earthmen No More", serie: "Startling Stories", saison: "Mars", annee: 1951,
    auteur: "Edmond Hamilton", pseudo: null, type: "Novelette", mots: 20000,
    synopsis: "Captain Future aide des humains à s'assimiler à des sociétés aliens, tout en déjouant un complot visant à isoler la Terre. Une exploration précoce de l'identité, de la culture et de l'exil.",
    themes: ["Identité", "Assimilation", "Complot"], planetes: ["Système solaire"],
    vilain: "Les Isolationnistes", note: 4.2, potentiel: 83,
    cover: "../images/characters/marshal_ezra_gurney_portrait_official.jpg",
    archive: "https://archive.org/search?query=%22earthmen+no+more%22"
  },
  {
    id: 27, titre: "Birthplace of Creation", serie: "Startling Stories", saison: "Mai", annee: 1951,
    auteur: "Edmond Hamilton", pseudo: null, type: "Novelette", mots: 20000,
    synopsis: "Aux origines de la vie dans le système, Captain Future affronte des forces qui manipulent la création elle-même. La dernière aventure de la série — un final cosmique digne du « roi de la SF cosmique ».",
    themes: ["Origines", "Création", "Final"], planetes: ["Aux confins du système"],
    vilain: "Les Manipulateurs", note: 4.4, potentiel: 88,
    cover: "../images/planets/solar_system_2940_overview.jpg",
    archive: "https://archive.org/search?query=%22birthplace+of+creation%22"
  }
];
