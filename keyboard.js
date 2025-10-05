export class Keyboard {
    constructor(element) {
        this.element = element;
        this.keys = [
            'qwertyuiop',
            'asdfghjkl',
            'zxcvbnm'
        ];
    }

    render() {
        const rows = this.keys.map(row => {
            const keys = row.split('').map(key => `<div class="key">${key}</div>`).join('');
            return `<div class="keyboard-row">${keys}</div>`;
        });
        const controlRow = `
            <div class="keyboard-row">
                <div class="key large">Enter</div>
                <div class="key large">⌫</div>
            </div>
        `;
        this.element.innerHTML = rows.join('') + controlRow;
    }
}
