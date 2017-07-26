USE [master]
GO
/****** Object:  Database [control_vehiculos]    Script Date: 26/07/2017 1:51:27 ******/
CREATE DATABASE [control_vehiculos]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'control_vehiculos', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\control_vehiculos.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'control_vehiculos_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\control_vehiculos_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [control_vehiculos] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [control_vehiculos].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [control_vehiculos] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [control_vehiculos] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [control_vehiculos] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [control_vehiculos] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [control_vehiculos] SET ARITHABORT OFF 
GO
ALTER DATABASE [control_vehiculos] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [control_vehiculos] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [control_vehiculos] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [control_vehiculos] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [control_vehiculos] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [control_vehiculos] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [control_vehiculos] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [control_vehiculos] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [control_vehiculos] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [control_vehiculos] SET  DISABLE_BROKER 
GO
ALTER DATABASE [control_vehiculos] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [control_vehiculos] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [control_vehiculos] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [control_vehiculos] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [control_vehiculos] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [control_vehiculos] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [control_vehiculos] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [control_vehiculos] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [control_vehiculos] SET  MULTI_USER 
GO
ALTER DATABASE [control_vehiculos] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [control_vehiculos] SET DB_CHAINING OFF 
GO
ALTER DATABASE [control_vehiculos] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [control_vehiculos] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [control_vehiculos] SET DELAYED_DURABILITY = DISABLED 
GO
USE [control_vehiculos]
GO
/****** Object:  Table [dbo].[Mantenimiento]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mantenimiento](
	[id_m] [int] IDENTITY(1,1) NOT NULL,
	[idServicio] [int] NULL,
	[detalle] [text] NULL,
	[precio] [decimal](5, 2) NULL,
	[fechaRealizado] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_m] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Marca]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Marca](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Notificacion]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notificacion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idServicio] [int] NULL,
	[cuandoRealizar] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Publicidad]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Publicidad](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](20) NOT NULL,
	[region] [int] NULL,
	[url] [varchar](255) NULL,
	[fechaAgregada] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Region]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Region](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_Region] UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Servicio]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Servicio](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idTipo] [int] NULL,
	[idTipoIntervalo] [int] NULL,
	[idVehiculo] [int] NULL,
	[nombre] [varchar](1) NULL,
	[intervalo] [int] NULL,
	[ultimoRealizado] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Servicios_Predeterminados]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Servicios_Predeterminados](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](40) NULL,
	[tipo_intervalo] [int] NOT NULL,
	[intervalo] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tipo_Intervalo]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tipo_Intervalo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tipo_Servicio]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tipo_Servicio](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Tipo_Vehiculo]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Tipo_Vehiculo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Vehiculo]    Script Date: 26/07/2017 1:51:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Vehiculo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[idTipo] [int] NOT NULL,
	[idMarca] [int] NOT NULL,
	[color] [varchar](10) NULL,
	[placa] [varchar](10) NULL,
	[marca] [varchar](20) NULL,
	[alias] [varchar](20) NULL,
	[año] [int] NULL,
	[kilometraje] [int] NOT NULL,
	[imagen] [text] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[placa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Publicidad] ADD  DEFAULT (getdate()) FOR [fechaAgregada]
GO
ALTER TABLE [dbo].[Mantenimiento]  WITH CHECK ADD FOREIGN KEY([idServicio])
REFERENCES [dbo].[Servicio] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Notificacion]  WITH CHECK ADD FOREIGN KEY([idServicio])
REFERENCES [dbo].[Servicio] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Publicidad]  WITH CHECK ADD  CONSTRAINT [FK_Publicidad_Region] FOREIGN KEY([region])
REFERENCES [dbo].[Region] ([id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Publicidad] CHECK CONSTRAINT [FK_Publicidad_Region]
GO
ALTER TABLE [dbo].[Servicio]  WITH CHECK ADD FOREIGN KEY([idTipo])
REFERENCES [dbo].[Tipo_Servicio] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Servicio]  WITH CHECK ADD FOREIGN KEY([idTipoIntervalo])
REFERENCES [dbo].[Tipo_Intervalo] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Servicio]  WITH CHECK ADD FOREIGN KEY([idVehiculo])
REFERENCES [dbo].[Vehiculo] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Servicios_Predeterminados]  WITH CHECK ADD FOREIGN KEY([tipo_intervalo])
REFERENCES [dbo].[Tipo_Vehiculo] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Vehiculo]  WITH CHECK ADD FOREIGN KEY([idMarca])
REFERENCES [dbo].[Marca] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Vehiculo]  WITH CHECK ADD FOREIGN KEY([idTipo])
REFERENCES [dbo].[Tipo_Vehiculo] ([id])
ON DELETE CASCADE
GO
USE [master]
GO
ALTER DATABASE [control_vehiculos] SET  READ_WRITE 
GO
