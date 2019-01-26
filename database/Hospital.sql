-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 26, 2019 at 10:18 PM
-- Server version: 5.7.24-0ubuntu0.18.04.1
-- PHP Version: 7.0.32-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `Medicines`
--

CREATE TABLE `Medicines` (
  `mid` int(10) NOT NULL,
  `drugName` varchar(15) NOT NULL,
  `price` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Medicines`
--

INSERT INTO `Medicines` (`mid`, `drugName`, `price`) VALUES
(1, 'Medicine #1', '16.99'),
(2, 'Medicine #2', '13.45'),
(3, 'Medicine #3', '42.12'),
(4, 'Medicine #4', '58.95'),
(5, 'Medicine #5', '23.99'),
(6, 'Medicine #6', '42.11'),
(16, 'Medicine #7', '32.23');

-- --------------------------------------------------------

--
-- Table structure for table `Patients`
--

CREATE TABLE `Patients` (
  `pid` int(10) NOT NULL,
  `name` varchar(40) NOT NULL,
  `bio` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Patients`
--

INSERT INTO `Patients` (`pid`, `name`, `bio`) VALUES
(1, 'Patient #1', 'Bio 1'),
(6, 'Patient #2', 'Bio 2'),
(7, 'Patient #3', 'Bio 3'),
(8, 'Patient #4', 'Bio 4'),
(9, 'Patient #5', 'Bio 5'),
(13, 'Patient #6', 'Bio 6');

-- --------------------------------------------------------

--
-- Table structure for table `Patient_Medicine`
--

CREATE TABLE `Patient_Medicine` (
  `p-m_id` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `mid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Patient_Medicine`
--

INSERT INTO `Patient_Medicine` (`p-m_id`, `pid`, `mid`) VALUES
(55, 1, 1),
(56, 1, 2),
(58, 6, 2),
(59, 8, 2),
(66, 1, 6),
(70, 1, 16),
(71, 6, 3),
(74, 13, 1),
(75, 13, 3),
(76, 13, 16);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `uid` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`uid`, `username`, `password`, `isAdmin`) VALUES
(6, 'admin2', '$2y$10$/ZRLFQvoNoctXnmFwrev7eAiebxsLz8UkQwnL9.FTtE3A9un8.oEW', '1'),
(7, 'user2', '$2y$10$r.C2xsI8pOYMqlbNV5vJ5.rSpjd9uuCDeItjZyVzlw6Bt1wkqcaq6', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Medicines`
--
ALTER TABLE `Medicines`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `mid` (`mid`);

--
-- Indexes for table `Patients`
--
ALTER TABLE `Patients`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `Patient_Medicine`
--
ALTER TABLE `Patient_Medicine`
  ADD PRIMARY KEY (`p-m_id`),
  ADD KEY `mid` (`mid`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Medicines`
--
ALTER TABLE `Medicines`
  MODIFY `mid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `Patients`
--
ALTER TABLE `Patients`
  MODIFY `pid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `Patient_Medicine`
--
ALTER TABLE `Patient_Medicine`
  MODIFY `p-m_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Patient_Medicine`
--
ALTER TABLE `Patient_Medicine`
  ADD CONSTRAINT `Patient_Medicine_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `Medicines` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
