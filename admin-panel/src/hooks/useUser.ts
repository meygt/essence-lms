import { useContext } from 'react';
import { UserContext } from '../context/UserContextDefinition';
import type { UserContextType } from '../types/user';

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};