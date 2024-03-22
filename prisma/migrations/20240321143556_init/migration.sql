BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Barber_users] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Barber_users_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Barber_users_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Barber_customers] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [lastname] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Barber_customers_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [barber_users_belongsID] INT NOT NULL,
    [sex] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    [birthdate] DATETIME2,
    [email] NVARCHAR(1000),
    [phone] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Barber_customers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Barber_workers] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [lastname] NVARCHAR(1000) NOT NULL,
    [barber_workers_belongsID] INT NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Barber_workers_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[service] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [price] INT NOT NULL,
    [barber_workers_belongsServiceId] INT NOT NULL,
    [barber_services_belongsID] INT NOT NULL,
    CONSTRAINT [service_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Barber_appointments] (
    [id] INT NOT NULL IDENTITY(1,1),
    [appointment_belongs_to_userID] INT NOT NULL,
    [appointment_belongs_to_customerID] INT NOT NULL,
    [appointment_belongs_to_barberID] INT NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Barber_appointments_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [apoointment_date] DATETIME2 NOT NULL,
    [serviceId] INT NOT NULL,
    CONSTRAINT [Barber_appointments_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Availability] (
    [id] INT NOT NULL IDENTITY(1,1),
    [barberId] INT NOT NULL,
    [day] NVARCHAR(1000) NOT NULL,
    [timeSlot] DATETIME2 NOT NULL,
    [duration] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Availability_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Availability_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Barber_customers] ADD CONSTRAINT [Barber_customers_barber_users_belongsID_fkey] FOREIGN KEY ([barber_users_belongsID]) REFERENCES [dbo].[Barber_users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Barber_workers] ADD CONSTRAINT [Barber_workers_barber_workers_belongsID_fkey] FOREIGN KEY ([barber_workers_belongsID]) REFERENCES [dbo].[Barber_users]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[service] ADD CONSTRAINT [service_barber_services_belongsID_fkey] FOREIGN KEY ([barber_services_belongsID]) REFERENCES [dbo].[Barber_users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[service] ADD CONSTRAINT [service_barber_workers_belongsServiceId_fkey] FOREIGN KEY ([barber_workers_belongsServiceId]) REFERENCES [dbo].[Barber_workers]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Barber_appointments] ADD CONSTRAINT [Barber_appointments_appointment_belongs_to_barberID_fkey] FOREIGN KEY ([appointment_belongs_to_barberID]) REFERENCES [dbo].[Barber_workers]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Barber_appointments] ADD CONSTRAINT [Barber_appointments_appointment_belongs_to_customerID_fkey] FOREIGN KEY ([appointment_belongs_to_customerID]) REFERENCES [dbo].[Barber_customers]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Barber_appointments] ADD CONSTRAINT [Barber_appointments_appointment_belongs_to_userID_fkey] FOREIGN KEY ([appointment_belongs_to_userID]) REFERENCES [dbo].[Barber_users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Barber_appointments] ADD CONSTRAINT [Barber_appointments_serviceId_fkey] FOREIGN KEY ([serviceId]) REFERENCES [dbo].[service]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Availability] ADD CONSTRAINT [Availability_barberId_fkey] FOREIGN KEY ([barberId]) REFERENCES [dbo].[Barber_workers]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
