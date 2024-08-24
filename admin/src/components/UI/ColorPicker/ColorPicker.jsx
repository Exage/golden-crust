import React from 'react'

import './ColorPicker.scss'

export const ColorPicker = ({ label = 'placeholder', value, onChange }) => {
    return (
        <div className="colorpicker">
            <label>
                {label}:
            </label>
            <input
                type="color" 
                value={value || '#000000'} 
                onChange={Event => onChange(Event.target.value)}
            />
        </div>
    );
}
