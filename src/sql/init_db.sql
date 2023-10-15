CREATE TABLE IF NOT EXISTS projects (
    Id          VARCHAR(50)  PRIMARY KEY UNIQUE,
    Title       VARCHAR(50)  NOT NULL,
    Description VARCHAR(255) NOT NULL,
    Contact     VARCHAR(50)  NOT NULL,
    Location    VARCHAR(50)  NOT NULL,
    Date        INTEGER      NOT NULL
);