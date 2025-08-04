-- Add Google authentication fields to users table
ALTER TABLE users 
ADD COLUMN google_id VARCHAR(255) UNIQUE,
ADD COLUMN auth_provider VARCHAR(20) NOT NULL DEFAULT 'LOCAL';

-- Make password nullable for Google users
ALTER TABLE users 
ALTER COLUMN password DROP NOT NULL;

-- Add index on google_id for faster lookups
CREATE INDEX idx_users_google_id ON users(google_id);

-- Add index on auth_provider
CREATE INDEX idx_users_auth_provider ON users(auth_provider);

-- Add constraint to ensure auth_provider is valid
ALTER TABLE users 
ADD CONSTRAINT chk_auth_provider 
CHECK (auth_provider IN ('LOCAL', 'GOOGLE'));

-- Add constraint to ensure Google users have google_id
ALTER TABLE users 
ADD CONSTRAINT chk_google_auth 
CHECK (
    (auth_provider = 'GOOGLE' AND google_id IS NOT NULL) OR 
    (auth_provider = 'LOCAL')
);

-- Add constraint to ensure local users have password
ALTER TABLE users 
ADD CONSTRAINT chk_local_auth 
CHECK (
    (auth_provider = 'LOCAL' AND password IS NOT NULL) OR 
    (auth_provider = 'GOOGLE')
);