// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultFormatApiResponse = (response: any): any[] => {
  const data = response.data || response;
  return Array.isArray(data) ? data : [];
};

import backendApi from "@/lib/backendApi";
import React, { useState, useEffect, useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any , no-unused-vars
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
  // eslint-disable-next-line no-unused-vars
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

type ModalField = {
  name: string;
  label: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  onSubmit: (formData: any) => Promise<any>;
  title: string;
  fields: ModalField[];
};

type LookupAutoCompleteProps = {
  apiUrl: string;
  searchParamName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  displayField: string | ((item: any) => string);
  valueField: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValue?: any;
  initialDisplayValue?: string;
  placeholder?: string;
  minSearchChars?: number;
  debounceTimeout?: number;
  noResultsText?: string;
  loadingText?: string;
  allowAddNew?: boolean;
  addNewLabel?: string;
  modalFormFields?: ModalField[];
  modalTitle?: string;
  ModalComponent?: React.ComponentType<ModalProps>;
  onAddNewClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  onSelect: (selectedItem: any | null) => void; // Alterado para passar o item completo ou null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  onModalSubmit?: (formData: any) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  formatApiResponse?: (response: any) => any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  customResultItem?: (item: any, isActive: boolean) => React.ReactNode;
};

const LookupAutoComplete: React.FC<LookupAutoCompleteProps> = ({
  apiUrl,
  searchParamName = "q",
  displayField,
  valueField,
  onSelect,
  initialValue = null,
  initialDisplayValue = "",
  placeholder = "Pesquisar...",
  minSearchChars = 3,
  debounceTimeout = 500,
  noResultsText = "Nenhum resultado encontrado",
  loadingText = "Carregando...",
  allowAddNew = false,
  addNewLabel = "Adicionar Novo",
  onAddNewClick,
  ModalComponent,
  modalTitle = "Adicionar Novo Item",
  onModalSubmit,
  formatApiResponse = defaultFormatApiResponse,
  customResultItem,
  modalFormFields = [],
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialDisplayValue);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  const [selectedValue, setSelectedValue] = useState<any>(initialValue);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  const [showAddNewModal, setShowAddNewModal] = useState<boolean>(false);
  const [justSelected, setJustSelected] = useState<boolean>(false); 

  const wrapperRef = useRef<HTMLDivElement>(null); 
  const inputRef = useRef<HTMLInputElement>(null); 

  const fetchSuggestions = useCallback(
    async (term: string) => {
      if (term.length < minSearchChars || !apiUrl) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      setIsLoading(true);
      try {
        const params = { [searchParamName]: term };
        const response = await backendApi.get(`${apiUrl}/lookup/search`, { params });
        const formattedData = formatApiResponse(response);
        setSuggestions(formattedData);
        setShowSuggestions(true); 
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
        setSuggestions([]);
        setShowSuggestions(true); 
      } finally {
        setIsLoading(false);
      }
    },
    [apiUrl, minSearchChars, searchParamName, formatApiResponse]
  );

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, debounceTimeout),
    [fetchSuggestions, debounceTimeout]
  );

  useEffect(() => {
    if (justSelected) {      
      return; 
    }

    if (searchTerm === initialDisplayValue && initialValue !== null && searchTerm.length > 0) {
      return; 
    }
    if (searchTerm.length >= minSearchChars) {
      debouncedFetchSuggestions(searchTerm);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, debouncedFetchSuggestions, minSearchChars, initialDisplayValue, initialValue, justSelected]);

  useEffect(() => {
    if (initialValue && initialDisplayValue) {
      setSearchTerm(initialDisplayValue);
      setSelectedValue(initialValue); // Aqui initialValue é o ID, mas selectedValue poderia ser o objeto se disponível
    }
  }, [initialValue, initialDisplayValue]);

  useEffect(() => {    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);        
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setJustSelected(false); 
    if (newSearchTerm.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      onSelect(null); // Informa que a seleção foi limpa
      setSelectedValue(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectSuggestion = (suggestion: any) => {
    setJustSelected(true); 
    const display = typeof displayField === "function" ? displayField(suggestion) : suggestion[displayField];
    // const value = suggestion[valueField]; // Não precisamos mais apenas do valueField para o onSelect
    setSearchTerm(display); 
    setSelectedValue(suggestion); // Armazena o objeto completo selecionado internamente
    setSuggestions([]);
    setShowSuggestions(false);
    onSelect(suggestion); // Passa o objeto suggestion COMPLETO
    setActiveSuggestionIndex(-1);
    
    if (inputRef.current) {
      inputRef.current.blur(); 
    }    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);      
      return;
    }

    if (!showSuggestions || suggestions.length === 0) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[activeSuggestionIndex]);
      }
    }
  };

  const handleAddNew = () => {
    if (onAddNewClick) {
      onAddNewClick();
    }
    setShowAddNewModal(true);
  };

  const handleModalClose = () => {
    setShowAddNewModal(false);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleModalFormSubmit = async (formData: any) => {
    if (onModalSubmit) {
      try {
        const newItem = await onModalSubmit(formData);
        setShowAddNewModal(false);
        return newItem;
      } catch (error) {
        console.error("Erro ao submeter modal:", error);
        throw error;
      }
    }
    return Promise.resolve();
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <input
        ref={inputRef} 
        type="text"
        value={searchTerm}
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"        
      />
      {showSuggestions && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {isLoading && <li className="px-3 py-2 text-gray-500">{loadingText}</li>}
          {!isLoading && suggestions.length === 0 && searchTerm.length >= minSearchChars && (
            <li className="px-3 py-2 text-gray-500">{noResultsText}</li>
          )}
          {!isLoading &&
            suggestions.map((suggestion, index) => (
              <li
                key={suggestion[valueField] || index} // valueField ainda é bom para a key
                className={`px-3 py-2 cursor-pointer hover:bg-indigo-50 ${
                  activeSuggestionIndex === index ? "bg-indigo-100" : ""
                }`}
                onMouseDown={() => handleSelectSuggestion(suggestion)} 
              >
                {customResultItem
                  ? customResultItem(suggestion, activeSuggestionIndex === index)
                  : typeof displayField === "function"
                  ? displayField(suggestion)
                  : suggestion[displayField]}
              </li>
            ))}
          {!isLoading && allowAddNew && searchTerm.length >= minSearchChars && (
            <li
              className="px-3 py-2 cursor-pointer text-indigo-600 hover:bg-indigo-50 font-medium"
              onMouseDown={handleAddNew} 
            >
              {addNewLabel}
            </li>
          )}
        </ul>
      )}
      {allowAddNew && ModalComponent && (
        <ModalComponent
          isOpen={showAddNewModal}
          onClose={handleModalClose}
          onSubmit={handleModalFormSubmit}
          title={modalTitle}
          fields={modalFormFields}
        />
      )}
    </div>
  );
};

export default LookupAutoComplete;

