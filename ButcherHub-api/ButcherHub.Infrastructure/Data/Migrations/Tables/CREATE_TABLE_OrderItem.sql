USE [ButcherHubDB]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[OrderItem](
	[OrderId] [int] NOT NULL,
	[MeatId] [int] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Currency] [char](3) NOT NULL,
 CONSTRAINT [PK_OrderItem] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC,
	[MeatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[OrderItem]  WITH CHECK ADD  CONSTRAINT [FK_OrderItem_Meat] FOREIGN KEY([MeatId])
REFERENCES [dbo].[Meat] ([Id])
GO

ALTER TABLE [dbo].[OrderItem] CHECK CONSTRAINT [FK_OrderItem_Meat]
GO

ALTER TABLE [dbo].[OrderItem]  WITH CHECK ADD  CONSTRAINT [FK_OrderItem_Order] FOREIGN KEY([OrderId])
REFERENCES [dbo].[Order] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[OrderItem] CHECK CONSTRAINT [FK_OrderItem_Order]
GO
