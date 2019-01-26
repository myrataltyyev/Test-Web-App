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
-- Database: `Drugstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `Medicines`
--

CREATE TABLE `Medicines` (
  `mid` int(10) NOT NULL,
  `drugName` varchar(15) NOT NULL,
  `price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Medicines`
--

INSERT INTO `Medicines` (`mid`, `drugName`, `price`) VALUES
(1, 'medicine #1', '41'),
(2, 'medicine #2', '19.99'),
(3, 'Medicine #3', '12.34'),
(4, 'Medicine #4', '23.99'),
(5, 'Medicine #5', '58.95'),
(6, 'Medicine #6', '66.45'),
(7, 'Medicine #7', '921.00'),
(75, 'medicine #8', '32.50');

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
(16, 'admin1', '$2y$10$PAMm4DTNtqccCCy3ZSAzkep04KmZbpYeCFTjovx9QvzLhp52MhP9a', '1'),
(17, 'user1', '$2y$10$RIyTCqekSbwfELqiJKvD9.eqCPKCysKt719MrL6/r4gDOAs8QW7M2', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Medicines`
--
ALTER TABLE `Medicines`
  ADD PRIMARY KEY (`mid`);

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
  MODIFY `mid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
