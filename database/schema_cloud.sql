-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 30 sep. 2026 à 18:49
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
-- Base de données : `urgences_centrale`
--

-- --------------------------------------------------------

--
-- Structure de la table `capacite_urgences_live`
--

CREATE TABLE `capacite_urgences_live` (
  `hopital_id` int(11) NOT NULL,
  `lits_reanimation_dispo` int(11) DEFAULT 0,
  `lits_urgences_dispo` int(11) DEFAULT 0,
  `statut_bloc_operatoire` enum('Disponible','Occupé','En maintenance') DEFAULT 'Disponible',
  `derniere_mise_a_jour` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `capacite_urgences_live`
--

INSERT INTO `capacite_urgences_live` (`hopital_id`, `lits_reanimation_dispo`, `lits_urgences_dispo`, `statut_bloc_operatoire`, `derniere_mise_a_jour`) VALUES
(1, 3, 5, 'Disponible', '2026-09-30 15:59:27');

-- --------------------------------------------------------

--
-- Structure de la table `demandes_urgences`
--

CREATE TABLE `demandes_urgences` (
  `id_demande` int(11) NOT NULL,
  `hopital_id` int(11) DEFAULT NULL,
  `description_cas` text NOT NULL,
  `gravite` enum('Faible','Moyenne','Critique') NOT NULL,
  `statut` enum('En attente','Acceptée','En route','Arrivé') DEFAULT 'En attente',
  `date_heure_demande` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hopitaux`
--

CREATE TABLE `hopitaux` (
  `id_hopital` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `telephone_urgence` varchar(20) NOT NULL,
  `statut_connexion` enum('En ligne','Hors ligne') DEFAULT 'En ligne'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `hopitaux`
--

INSERT INTO `hopitaux` (`id_hopital`, `nom`, `latitude`, `longitude`, `telephone_urgence`, `statut_connexion`) VALUES
(1, 'CHUK - Centre Hospitalo-Universitaire de Kamenge', -3.36390000, 29.37390000, '+257 22 22 2424', 'En ligne');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `capacite_urgences_live`
--
ALTER TABLE `capacite_urgences_live`
  ADD PRIMARY KEY (`hopital_id`);

--
-- Index pour la table `demandes_urgences`
--
ALTER TABLE `demandes_urgences`
  ADD PRIMARY KEY (`id_demande`),
  ADD KEY `hopital_id` (`hopital_id`);

--
-- Index pour la table `hopitaux`
--
ALTER TABLE `hopitaux`
  ADD PRIMARY KEY (`id_hopital`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `demandes_urgences`
--
ALTER TABLE `demandes_urgences`
  MODIFY `id_demande` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `hopitaux`
--
ALTER TABLE `hopitaux`
  MODIFY `id_hopital` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `capacite_urgences_live`
--
ALTER TABLE `capacite_urgences_live`
  ADD CONSTRAINT `capacite_urgences_live_ibfk_1` FOREIGN KEY (`hopital_id`) REFERENCES `hopitaux` (`id_hopital`) ON DELETE CASCADE;

--
-- Contraintes pour la table `demandes_urgences`
--
ALTER TABLE `demandes_urgences`
  ADD CONSTRAINT `demandes_urgences_ibfk_1` FOREIGN KEY (`hopital_id`) REFERENCES `hopitaux` (`id_hopital`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
