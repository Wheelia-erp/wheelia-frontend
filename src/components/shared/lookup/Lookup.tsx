import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import backendApi from '@/lib/backendApi';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '@/components/form/FormInput';

interface LookupProps {
  endpoint: string;  
  placeholder?: string;
  name: string;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onSelect?: (item: any) => void;
}

const Lookup: React.FC<LookupProps> = ({ endpoint, placeholder, name, onSelect }) => {
  const { setValue } = useFormContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchResults = async (query: string) => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await backendApi.get(`${endpoint}?q=${query}`);
      setResults(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error fetching lookup data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) fetchResults(searchTerm);
      else setResults([]);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (item: any) => {
    if(onSelect) 
      onSelect(item) ;
    setSearchTerm(item.name);
    setValue(name, item.id); 
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setValue(name, ''); // Limpa o valor registrado
    setResults([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <FormInput
          placeholder={placeholder || 'Buscar...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className="pr-10"
        />
        {searchTerm && (
          <button className="absolute inset-y-0 right-2 flex items-center" onClick={clearSearch}>
            <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </div>

      {loading && <div className="absolute mt-2">Carregando...</div>}

      {showDropdown && (
        <div className="absolute mt-2 max-h-60 overflow-y-auto w-full border border-gray-300 rounded bg-white z-10">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelect(item)}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">Nenhum resultado encontrado.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Lookup;
