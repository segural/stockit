-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 16-08-2023 a las 20:09:38
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `stockit`
--
CREATE DATABASE IF NOT EXISTS `stockit` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `stockit`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `branches`
--

CREATE TABLE `branches` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `branches`
--

INSERT INTO `branches` VALUES(1, 'Billinghurst', NULL, NULL);
INSERT INTO `branches` VALUES(2, 'Mar Del Plata (Guido)', NULL, NULL);
INSERT INTO `branches` VALUES(3, 'Mar Del Plata (San Luis)', NULL, NULL);
INSERT INTO `branches` VALUES(4, 'Mar Del Plata (HPC)', NULL, NULL);
INSERT INTO `branches` VALUES(5, 'DF Cordoba', NULL, NULL);
INSERT INTO `branches` VALUES(6, 'Villa Maria', NULL, NULL);
INSERT INTO `branches` VALUES(7, 'DF La Plata', NULL, NULL);
INSERT INTO `branches` VALUES(8, 'Vidt', NULL, NULL);
INSERT INTO `branches` VALUES(9, 'Hospital Español', NULL, NULL);
INSERT INTO `branches` VALUES(10, 'Hospital Alemán', NULL, NULL);
INSERT INTO `branches` VALUES(11, 'Hospital Austral', NULL, NULL);
INSERT INTO `branches` VALUES(12, 'Hospital Naval', NULL, NULL);
INSERT INTO `branches` VALUES(13, 'Hospital Militar', NULL, NULL);
INSERT INTO `branches` VALUES(14, 'Mendoza', NULL, NULL);
INSERT INTO `branches` VALUES(15, 'Salta', NULL, NULL);
INSERT INTO `branches` VALUES(16, 'Tucuman', NULL, NULL);
INSERT INTO `branches` VALUES(17, 'San Juan', NULL, NULL);
INSERT INTO `branches` VALUES(18, 'CITO', NULL, NULL);
INSERT INTO `branches` VALUES(19, 'CEMIC', NULL, NULL);
INSERT INTO `branches` VALUES(20, 'CIO - Ceditra', NULL, NULL);
INSERT INTO `branches` VALUES(21, 'CIO - Olavarria', NULL, NULL);
INSERT INTO `branches` VALUES(22, 'CIO - La Plata', NULL, NULL);
INSERT INTO `branches` VALUES(23, 'CIO - Tandil', NULL, NULL);
INSERT INTO `branches` VALUES(24, 'CIO - Lomas', NULL, NULL);
INSERT INTO `branches` VALUES(25, 'Susini', NULL, NULL);
INSERT INTO `branches` VALUES(26, 'GO ITR - Rosario', NULL, NULL);
INSERT INTO `branches` VALUES(27, 'Avellaneda', NULL, NULL);
INSERT INTO `branches` VALUES(28, 'Cetro', NULL, NULL);
INSERT INTO `branches` VALUES(29, 'Acevedo', NULL, NULL);
INSERT INTO `branches` VALUES(30, 'Pavon', NULL, NULL);
INSERT INTO `branches` VALUES(31, 'Tucuman - CEMET', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `companyname` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `companies`
--

INSERT INTO `companies` VALUES(1, 'Vidt Centro Médico', NULL, NULL);
INSERT INTO `companies` VALUES(2, 'Ceditrin', NULL, NULL);
INSERT INTO `companies` VALUES(3, 'Siglo XXI', NULL, NULL);
INSERT INTO `companies` VALUES(4, 'Cepror - Villa Maria', NULL, NULL);
INSERT INTO `companies` VALUES(5, 'CITO', NULL, NULL);
INSERT INTO `companies` VALUES(6, 'Dean Funes', NULL, NULL);
INSERT INTO `companies` VALUES(7, 'Cuyo', NULL, NULL);
INSERT INTO `companies` VALUES(8, 'CRC', NULL, NULL);
INSERT INTO `companies` VALUES(9, 'COR', NULL, NULL);
INSERT INTO `companies` VALUES(10, 'Salta', NULL, NULL);
INSERT INTO `companies` VALUES(11, 'San Juan', NULL, NULL);
INSERT INTO `companies` VALUES(12, 'Terapia Radiante', NULL, NULL);
INSERT INTO `companies` VALUES(13, 'EMTEC', NULL, NULL);
INSERT INTO `companies` VALUES(14, 'COS - Tandil', NULL, NULL);
INSERT INTO `companies` VALUES(15, 'EMTRO', NULL, NULL);
INSERT INTO `companies` VALUES(16, 'Ceditra', NULL, NULL);
INSERT INTO `companies` VALUES(17, 'GO ITR', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movements`
--

CREATE TABLE `movements` (
  `id` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `idProduct` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `companyname` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `idOC` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ocs`
--

CREATE TABLE `ocs` (
  `id` int(11) NOT NULL,
  `number` bigint(50) DEFAULT NULL,
  `recibed` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` VALUES(8, 'sistema_administrar', '2021-11-30 21:00:05', '2021-11-30 21:00:38');
INSERT INTO `permissions` VALUES(9, 'ABM_Stock', '2023-08-16 18:49:18', '2023-08-16 18:52:57');
INSERT INTO `permissions` VALUES(10, 'Inventarios', '2023-08-16 18:49:46', '2023-08-16 18:49:46');
INSERT INTO `permissions` VALUES(11, 'ABM_Productos', '2023-08-16 18:50:07', '2023-08-16 18:50:07');
INSERT INTO `permissions` VALUES(12, 'ABM_Categorias', '2023-08-16 18:50:14', '2023-08-16 18:50:14');
INSERT INTO `permissions` VALUES(13, 'Roles_Permisos', '2023-08-16 18:51:09', '2023-08-16 18:53:10');
INSERT INTO `permissions` VALUES(14, 'ABM_Usuarios', '2023-08-16 18:51:17', '2023-08-16 18:53:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permission_roles`
--

CREATE TABLE `permission_roles` (
  `id` int(11) NOT NULL,
  `roleId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Volcado de datos para la tabla `permission_roles`
--

INSERT INTO `permission_roles` VALUES(399, NULL, 9);
INSERT INTO `permission_roles` VALUES(400, NULL, 9);
INSERT INTO `permission_roles` VALUES(401, NULL, 14);
INSERT INTO `permission_roles` VALUES(402, NULL, 13);
INSERT INTO `permission_roles` VALUES(403, 1, 8);
INSERT INTO `permission_roles` VALUES(404, 1, 9);
INSERT INTO `permission_roles` VALUES(405, 1, 10);
INSERT INTO `permission_roles` VALUES(406, 1, 11);
INSERT INTO `permission_roles` VALUES(407, 1, 12);
INSERT INTO `permission_roles` VALUES(408, 1, 13);
INSERT INTO `permission_roles` VALUES(409, 1, 14);
INSERT INTO `permission_roles` VALUES(416, 4, 10);
INSERT INTO `permission_roles` VALUES(418, 3, 9);
INSERT INTO `permission_roles` VALUES(419, 3, 11);
INSERT INTO `permission_roles` VALUES(423, 2, 8);
INSERT INTO `permission_roles` VALUES(424, 2, 11);
INSERT INTO `permission_roles` VALUES(425, 2, 12);
INSERT INTO `permission_roles` VALUES(426, 2, 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `idCategory` int(11) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `enable` tinyint(4) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `providers`
--

CREATE TABLE `providers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `providers`
--

INSERT INTO `providers` VALUES(1, 'Tacco Calpini', NULL, NULL);
INSERT INTO `providers` VALUES(2, 'Datawise', NULL, NULL);
INSERT INTO `providers` VALUES(3, 'Novadata', NULL, NULL);
INSERT INTO `providers` VALUES(4, 'Tecnosophie', NULL, NULL);
INSERT INTO `providers` VALUES(5, 'Digital Consultant', NULL, NULL);
INSERT INTO `providers` VALUES(6, 'Anika', NULL, NULL);
INSERT INTO `providers` VALUES(7, 'Aldax', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` VALUES(1, 'SysAdmin', '2021-11-30 21:00:05', '2021-11-30 21:00:05');
INSERT INTO `roles` VALUES(2, 'Admin', '2023-08-16 19:02:00', '2023-08-16 19:02:00');
INSERT INTO `roles` VALUES(3, 'Sistemas', '2023-08-16 19:02:22', '2023-08-16 19:02:22');
INSERT INTO `roles` VALUES(4, 'Inventarios', '2023-08-16 19:02:33', '2023-08-16 19:02:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `idProduct` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `user` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `resetFlag` tinyint(1) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` VALUES(18, 'Luciano', 'Segura', 'segural', 'luciano.segura@rtp.com.ar', 'default-avatar.jpg', '$2b$10$hO8swcb6if3TLwtnAafzAeldw5G4qRkBDvyYsp4pDAP9ejZHauS6i', 0, 1, '2021-11-08 17:29:16', '2023-07-05 16:35:11');
INSERT INTO `users` VALUES(19, 'Gabriel', 'Yuffre', 'yuffreg', 'gabriel.yuffre@rtp.com.ar', 'default-avatar.jpg', '$2b$10$iFcUOHiQU2gm.D/oNt8VkejmOlodEuIcAdt1SpMCdK2MD36wDPCXy', 0, 1, '2023-08-16 19:05:16', '2023-08-16 19:07:01');
INSERT INTO `users` VALUES(20, 'Santiago', 'Maresco', 'marescos', 'santiago.maresco@rtp.com.ar', 'default-avatar.jpg', '$2b$10$lDlzA15U8cyof2PDsbARoOOIfDO4uEVuNAUEAwYaylqGZyHrHMSSO', 0, 1, '2023-08-16 19:05:43', '2023-08-16 19:10:44');
INSERT INTO `users` VALUES(21, 'Pedro', 'Villamar', 'villamarp', 'pedro.villamar@rtp.com.ar', 'default-avatar.jpg', '$2b$10$ek2Fx3YDuVbiV99Qeer4NeYthhdBOX.MDfcfMQCLsr3rhp5qwmCAi', 1, 1, '2023-08-16 19:06:16', '2023-08-16 19:06:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Volcado de datos para la tabla `user_roles`
--

INSERT INTO `user_roles` VALUES(178, 18, 1);
INSERT INTO `user_roles` VALUES(179, 19, 2);
INSERT INTO `user_roles` VALUES(180, 19, 3);
INSERT INTO `user_roles` VALUES(181, 20, 3);
INSERT INTO `user_roles` VALUES(182, 21, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `movements`
--
ALTER TABLE `movements`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ocs`
--
ALTER TABLE `ocs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `permission_roles`
--
ALTER TABLE `permission_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permissionId_idx` (`permissionId`),
  ADD KEY `role_Id_idx` (`roleId`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId_idx` (`userId`),
  ADD KEY `roleId_idx` (`roleId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `branches`
--
ALTER TABLE `branches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `movements`
--
ALTER TABLE `movements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `ocs`
--
ALTER TABLE `ocs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `permission_roles`
--
ALTER TABLE `permission_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=427;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
