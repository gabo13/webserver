class CustomUnitInput extends HTMLElement {
    constructor() {
        super();

        this.container = document.createElement('div');

        this.label = document.createElement('label');
        this.input = document.createElement('input');
        this.select = document.createElement('select');

        this.label.textContent = (this.getAttribute('label') || "?") +":";
        this.input.type = 'number';
        this.input.value = this.getAttribute('value') || 0;

        this.units = {
            A: ['A', 'mA', '\u00B5A', 'nA', 'pA'],
            V: ['MV', 'KV', 'V', 'mV', '\u00B5V', 'nV', 'pV'],
            Ohm: ['M\u03A9', 'K\u03A9', '\u03A9', 'm\u03A9','\u00B5\u03A9'],
            F: ['F', 'mF', '\u00B5F', 'nF', 'pF']
        }

        const unitType = this.getAttribute('unit-type') || 'Ohm';
        this.updateUnits(unitType);

        this.appendChild(this.label);
        this.appendChild(this.input);
        this.appendChild(this.select);

    }
    
    updateUnits(unitType) {
        this.select.innerHTML = "";
        const options = this.units[unitType] || [];
        options.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit;
            this.select.appendChild(option);
        });
    }

    get value() {
        const inputValue = parseFloat(this.input.value) || 0;
        const unit = this.select.value[0];
        switch (unit) {
            case 'p':
                return inputValue * 1e-12;
            case 'n':
                return inputValue * 1e-9;
            case '\u00B5':
                return inputValue * 1e-6;
            case 'm':
                return inputValue * 1e-3;
            case 'K':
                return inputValue * 1e+3;
            case 'M':
                return inputValue * 1e+6;
            default:
                return inputValue;
        }
    }
}

customElements.define('custom-unit-input', CustomUnitInput);