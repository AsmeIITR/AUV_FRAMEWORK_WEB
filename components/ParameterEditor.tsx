'use client';

import React, { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';

interface ParameterEditorProps {
  paramName: string;
  currentValue: number;
  onSetParameter: (name: string, value: number) => void;
}

export const ParameterEditor: React.FC<ParameterEditorProps> = ({
  paramName,
  currentValue,
  onSetParameter,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(String(currentValue));

  const handleSave = () => {
    const value = parseFloat(newValue);
    if (!isNaN(value)) {
      onSetParameter(paramName, value);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewValue(String(currentValue));
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all"
        title="Edit parameter"
      >
        <Edit2 className="w-4 h-4" />
        Edit
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        step="any"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        className="px-3 py-1 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 text-sm"
        autoFocus
      />
      <button
        onClick={handleSave}
        className="p-2 bg-green-500 hover:bg-green-600 rounded-lg transition-all"
        title="Save"
      >
        <Save className="w-4 h-4" />
      </button>
      <button
        onClick={handleCancel}
        className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-all"
        title="Cancel"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
