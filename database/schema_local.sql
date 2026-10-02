-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 30 sep. 2026 à 19:07
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `hopital_local_chuk`
--

-- --------------------------------------------------------

--
-- Structure de la table `file_synchronisation`
--

CREATE TABLE `file_synchronisation` (
  `id_sync` int(11) NOT NULL,
  `action` varchar(50) NOT NULL,
  `donnees_json` text NOT NULL,
  `statut` enum('A envoyer','Envoyé') DEFAULT 'A envoyer',
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `file_synchronisation`
--

INSERT INTO `file_synchronisation` (`id_sync`, `action`, `donnees_json`, `statut`, `date_creation`) VALUES
(1, 'INCREMENT_LIT_REA', '{\"hopital_id\": 1, \"service\": \"Réanimation\", \"changement\": +1}', 'A envoyer', '2026-09-30 15:57:35');

-- --------------------------------------------------------

--
-- Structure de la table `hospitalisations`
--

CREATE TABLE `hospitalisations` (
  `id_hospitalisation` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `service` varchar(50) NOT NULL,
  `numero_lit` varchar(10) NOT NULL,
  `date_entree` datetime DEFAULT current_timestamp(),
  `date_sortie` datetime DEFAULT NULL,
  `statut` enum('En cours','Terminée') DEFAULT 'En cours'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hospitalisations`
--

INSERT INTO `hospitalisations` (`id_hospitalisation`, `patient_id`, `service`, `numero_lit`, `date_entree`, `date_sortie`, `statut`) VALUES
(1, 1, 'Réanimation', 'LIT-01', '2026-09-30 17:27:52', '2026-09-30 17:57:35', 'Terminée');

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `id_patient` int(11) NOT NULL,
  `code_patient` varchar(20) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_naissance` date DEFAULT NULL,
  `groupe_sanguin` varchar(5) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`id_patient`, `code_patient`, `nom`, `prenom`, `date_naissance`, `groupe_sanguin`, `telephone`) VALUES
(1, 'PAT-2026-001', 'Nkurunziza', 'Jean', '1995-04-12', 'O+', '+257 79 00 00 01');

-- --------------------------------------------------------

--
-- Structure de la table `registre_laboratoire`
--

CREATE TABLE `registre_laboratoire` (
  `id_examen` int(11) NOT NULL,
  `hospitalisation_id` int(11) DEFAULT NULL,
  `type_examen` varchar(100) NOT NULL,
  `resultat` text DEFAULT NULL,
  `date_demande` datetime DEFAULT current_timestamp(),
  `date_resultat` datetime DEFAULT NULL,
  `statut` enum('En attente','Terminé') DEFAULT 'En attente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `registre_laboratoire`
--

INSERT INTO `registre_laboratoire` (`id_examen`, `hospitalisation_id`, `type_examen`, `resultat`, `date_demande`, `date_resultat`, `statut`) VALUES
(1, 1, 'Goutte Épaisse', 'Positif - Plasmodium falciparum', '2026-09-30 17:27:52', NULL, 'Terminé');

-- --------------------------------------------------------

--
-- Structure de la table `registre_staff`
--

CREATE TABLE `registre_staff` (
  `id_staff` int(11) NOT NULL,
  `hospitalisation_id` int(11) DEFAULT NULL,
  `medecin_responsable` varchar(100) NOT NULL,
  `observations` text NOT NULL,
  `decision` enum('Maintenir traitement','Changer traitement','Autoriser sortie','Transférer') NOT NULL,
  `date_visite` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `registre_staff`
--

INSERT INTO `registre_staff` (`id_staff`, `hospitalisation_id`, `medecin_responsable`, `observations`, `decision`, `date_visite`) VALUES
(1, 1, 'Dr. Ndayishimiye', 'Patient réactif au traitement antipaludéen.', 'Maintenir traitement', '2026-09-30 17:27:52');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `file_synchronisation`
--
ALTER TABLE `file_synchronisation`
  ADD PRIMARY KEY (`id_sync`);

--
-- Index pour la table `hospitalisations`
--
ALTER TABLE `hospitalisations`
  ADD PRIMARY KEY (`id_hospitalisation`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Index pour la table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id_patient`),
  ADD UNIQUE KEY `code_patient` (`code_patient`);

--
-- Index pour la table `registre_laboratoire`
--
ALTER TABLE `registre_laboratoire`
  ADD PRIMARY KEY (`id_examen`),
  ADD KEY `hospitalisation_id` (`hospitalisation_id`);

--
-- Index pour la table `registre_staff`
--
ALTER TABLE `registre_staff`
  ADD PRIMARY KEY (`id_staff`),
  ADD KEY `hospitalisation_id` (`hospitalisation_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `file_synchronisation`
--
ALTER TABLE `file_synchronisation`
  MODIFY `id_sync` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `hospitalisations`
--
ALTER TABLE `hospitalisations`
  MODIFY `id_hospitalisation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `patients`
--
ALTER TABLE `patients`
  MODIFY `id_patient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `registre_laboratoire`
--
ALTER TABLE `registre_laboratoire`
  MODIFY `id_examen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `registre_staff`
--
ALTER TABLE `registre_staff`
  MODIFY `id_staff` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `hospitalisations`
--
ALTER TABLE `hospitalisations`
  ADD CONSTRAINT `hospitalisations_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id_patient`) ON DELETE CASCADE;

--
-- Contraintes pour la table `registre_laboratoire`
--
ALTER TABLE `registre_laboratoire`
  ADD CONSTRAINT `registre_laboratoire_ibfk_1` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id_hospitalisation`) ON DELETE CASCADE;

--
-- Contraintes pour la table `registre_staff`
--
ALTER TABLE `registre_staff`
  ADD CONSTRAINT `registre_staff_ibfk_1` FOREIGN KEY (`hospitalisation_id`) REFERENCES `hospitalisations` (`id_hospitalisation`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
