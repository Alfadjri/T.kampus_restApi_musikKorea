-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: database
-- Generation Time: Jun 09, 2023 at 07:50 PM
-- Server version: 8.0.33
-- PHP Version: 8.1.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Musik`
--

-- --------------------------------------------------------

--
-- Table structure for table `Artis`
--

CREATE TABLE `Artis` (
  `id_artis` bigint NOT NULL,
  `s_name` varchar(255) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `k_name` varchar(255) NOT NULL,
  `k_s_name` varchar(255) NOT NULL,
  `id_negara` bigint NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Company`
--

CREATE TABLE `Company` (
  `id_company` bigint NOT NULL,
  `nama` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Grup`
--

CREATE TABLE `Grup` (
  `id_grup` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  `shot` varchar(255) DEFAULT NULL,
  `k_name` varchar(255) NOT NULL,
  `debut` date NOT NULL,
  `id_company` bigint NOT NULL,
  `member` int NOT NULL,
  `o.member` int NOT NULL,
  `funclub_name` varchar(255) DEFAULT NULL,
  `Active` enum('Yes','No') NOT NULL DEFAULT 'No',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Kota`
--

CREATE TABLE `Kota` (
  `id_kota` bigint NOT NULL,
  `place` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Negara`
--

CREATE TABLE `Negara` (
  `id_negara` bigint NOT NULL,
  `name_negara` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_kota` bigint DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `R_artis`
--

CREATE TABLE `R_artis` (
  `id_r_artis` bigint NOT NULL,
  `id_artis` bigint NOT NULL,
  `id_grup` bigint DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` bigint NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','User','Artis','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'alfadjri28', 'alfadjri28@gmail.com', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `Video`
--

CREATE TABLE `Video` (
  `id_video` bigint NOT NULL,
  `id_artis` bigint NOT NULL,
  `type` enum('Grup','Solo') NOT NULL,
  `S_name` varchar(255) NOT NULL,
  `video` text NOT NULL,
  `id_relase` bigint NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Artis`
--
ALTER TABLE `Artis`
  ADD PRIMARY KEY (`id_artis`),
  ADD KEY `id_negara` (`id_negara`),
  ADD KEY `create_at` (`create_at`);

--
-- Indexes for table `Company`
--
ALTER TABLE `Company`
  ADD PRIMARY KEY (`id_company`),
  ADD KEY `create_at` (`create_at`);

--
-- Indexes for table `Grup`
--
ALTER TABLE `Grup`
  ADD PRIMARY KEY (`id_grup`),
  ADD KEY `id_company` (`id_company`);

--
-- Indexes for table `Kota`
--
ALTER TABLE `Kota`
  ADD PRIMARY KEY (`id_kota`),
  ADD KEY `create_at` (`create_at`);

--
-- Indexes for table `Negara`
--
ALTER TABLE `Negara`
  ADD PRIMARY KEY (`id_negara`),
  ADD KEY `id_kota` (`id_kota`),
  ADD KEY `create_at` (`create_at`);

--
-- Indexes for table `R_artis`
--
ALTER TABLE `R_artis`
  ADD PRIMARY KEY (`id_r_artis`),
  ADD KEY `id_artis` (`id_artis`,`id_grup`),
  ADD KEY `id_grup_fk_grup` (`id_grup`),
  ADD KEY `create_at` (`create_at`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Video`
--
ALTER TABLE `Video`
  ADD PRIMARY KEY (`id_video`),
  ADD KEY `create_at` (`create_at`),
  ADD KEY `id_artis` (`id_artis`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Artis`
--
ALTER TABLE `Artis`
  MODIFY `id_artis` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Company`
--
ALTER TABLE `Company`
  MODIFY `id_company` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Grup`
--
ALTER TABLE `Grup`
  MODIFY `id_grup` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Kota`
--
ALTER TABLE `Kota`
  MODIFY `id_kota` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Negara`
--
ALTER TABLE `Negara`
  MODIFY `id_negara` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `R_artis`
--
ALTER TABLE `R_artis`
  MODIFY `id_r_artis` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Video`
--
ALTER TABLE `Video`
  MODIFY `id_video` bigint NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Artis`
--
ALTER TABLE `Artis`
  ADD CONSTRAINT `Artis_ibfk_1` FOREIGN KEY (`id_negara`) REFERENCES `Negara` (`id_negara`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Grup`
--
ALTER TABLE `Grup`
  ADD CONSTRAINT `id_company_fk_company` FOREIGN KEY (`id_company`) REFERENCES `Company` (`id_company`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Negara`
--
ALTER TABLE `Negara`
  ADD CONSTRAINT `id_kota_fk_kota` FOREIGN KEY (`id_kota`) REFERENCES `Kota` (`id_kota`) ON UPDATE CASCADE;

--
-- Constraints for table `R_artis`
--
ALTER TABLE `R_artis`
  ADD CONSTRAINT `id_artis_fk_artis` FOREIGN KEY (`id_artis`) REFERENCES `Artis` (`id_artis`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `id_grup_fk_grup` FOREIGN KEY (`id_grup`) REFERENCES `Grup` (`id_grup`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `Video`
--
ALTER TABLE `Video`
  ADD CONSTRAINT `Video_ibfk_1` FOREIGN KEY (`id_artis`) REFERENCES `R_artis` (`id_r_artis`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
