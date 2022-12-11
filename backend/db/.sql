

CREATE TABLE IF NOT EXISTS danger (
    danger_uuid UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id varchar(255) NOT NULL,
    made_on TIMESTAMPTZ NOT NULL,
    danger_location GEOGRAPHY NOT NULL
);

CREATE TABLE IF NOT EXISTS safezone (
    safezone_uuid UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id varchar(255) NOT NULL,
    made_on TIMESTAMPTZ NOT NULL,
    safezone_location GEOGRAPHY NOT NULL
);

CREATE TABLE IF NOT EXISTS supplies (
    supplies_uuid UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    supplies_type varchar(255) NOT NULL,
    user_id varchar(255) NOT NULL,
    made_on TIMESTAMPTZ NOT NULL,
    supplies_location GEOGRAPHY NOT NULL
);

